#!/usr/bin/env node
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCES = path.join(ROOT, 'scripts', 'image-sources.json');
const CACHE = path.join(ROOT, 'scripts', '.cache');
const PUBLIC = path.join(ROOT, 'public');
const CREDITS = path.join(ROOT, 'src', 'data', 'image-credits.json');
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'BolyarinImageCuration/1.0 (https://bolyarin.bg; editorial image pipeline)';

const AUTHOR_OVERRIDES = {
  'File:A briefcase manufactured by Veljekset Åström Oy 1939 (JOKAKAL3B-5158).tif':
    'Museovirasto (Finnish Heritage Agency)'
};

const TARGETS = {
  hero: { width: 2560, height: 1440, position: 'centre' },
  inline: { width: 2400, height: 1600, position: 'centre' },
  club: { width: 2000, height: 1500, position: 'centre' }
};

const args = new Set(process.argv.slice(2));
const only = [...args].find((arg) => arg.startsWith('--only='))?.split('=')[1];
const checkOnly = args.has('--check');
const force = args.has('--force');

const decodeEntities = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

const cleanText = (value = '') =>
  decodeEntities(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const cleanAuthor = (value = '') => {
  const text = cleanText(value)
    .replace(/^User:\s*/i, '')
    .replace(/\(\s*talk\s*·\s*contribs\s*\)/gi, '')
    .replace(/\s*\(talk\)/gi, '')
    .trim();
  if (!text || /^https?:\/\//i.test(text)) return 'Wikimedia Commons';
  return text;
};

const licenseFallback = (license) => {
  const key = license.toLowerCase();
  if (key.startsWith('cc0')) return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (key.startsWith('cc by-sa')) {
    const version = license.match(/(\d\.\d)/)?.[1] ?? '4.0';
    return `https://creativecommons.org/licenses/by-sa/${version}/`;
  }
  if (key.startsWith('cc by')) {
    const version = license.match(/(\d\.\d)/)?.[1] ?? '4.0';
    return `https://creativecommons.org/licenses/by/${version}/`;
  }
  if (key.includes('public domain') || key === 'pd') return 'https://creativecommons.org/publicdomain/mark/1.0/';
  return 'https://commons.wikimedia.org/';
};

async function requestJson(params) {
  const url = new URL(API);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  url.searchParams.set('format', 'json');
  const response = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!response.ok) throw new Error(`Commons API ${response.status} for ${url}`);
  return response.json();
}

async function loadMetadata(titles) {
  await fs.mkdir(CACHE, { recursive: true });
  const cacheFile = path.join(CACHE, 'metadata.json');
  let cache = {};
  try {
    cache = JSON.parse(await fs.readFile(cacheFile, 'utf8'));
  } catch {
    cache = {};
  }

  const missing = titles.filter((title) => !cache[title]);
  for (let index = 0; index < missing.length; index += 40) {
    const batch = missing.slice(index, index + 40);
    const data = await requestJson({
      action: 'query',
      titles: batch.join('|'),
      prop: 'imageinfo',
      iiprop: 'url|size|mime|extmetadata',
      iiurlwidth: '3200'
    });
    for (const page of Object.values(data.query?.pages ?? {})) {
      if (!page.imageinfo) {
        console.warn(`! Missing on Commons: ${page.title}`);
        continue;
      }
      const info = page.imageinfo[0];
      const meta = info.extmetadata ?? {};
      cache[page.title] = {
        title: page.title,
        originalUrl: info.url,
        thumbUrl: info.thumburl ?? info.url,
        width: info.width,
        height: info.height,
        license: cleanText(meta.LicenseShortName?.value) || 'Unknown',
        licenseUrl: meta.LicenseUrl?.value || '',
        author:
          AUTHOR_OVERRIDES[page.title] || cleanAuthor(meta.Artist?.value || meta.Credit?.value || ''),
        description: cleanText(meta.ImageDescription?.value || '').slice(0, 300),
        sourceUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`
      };
    }
    if (missing.length > 40) await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2));
  return cache;
}

async function download(url, title) {
  const hash = createHash('sha1').update(url).digest('hex');
  const extension = url.split('.').pop()?.split('?')[0]?.slice(0, 5) || 'img';
  const file = path.join(CACHE, 'originals', `${hash}.${extension}`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  if (!force) {
    try {
      const stat = await fs.stat(file);
      if (stat.size > 1024) return file;
    } catch {
      // download below
    }
  }
  const response = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!response.ok) throw new Error(`Image download ${response.status}: ${title}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(file, buffer);
  return file;
}

function outputSpec(slug, slot) {
  if (slug === 'club') {
    return {
      file: path.join(PUBLIC, 'images', 'club', 'issues.jpg'),
      publicPath: '/images/club/issues.jpg',
      ...TARGETS.club
    };
  }
  return {
    file: path.join(PUBLIC, 'images', 'articles', slug, `${slot}.jpg`),
    publicPath: `/images/articles/${slug}/${slot}.jpg`,
    ...(slot === 'hero' ? TARGETS.hero : TARGETS.inline)
  };
}

async function main() {
  const sources = JSON.parse(await fs.readFile(SOURCES, 'utf8'));
  const entries = [];
  for (const [slug, slots] of Object.entries(sources)) {
    if (only && slug !== only) continue;
    for (const [slot, title] of Object.entries(slots)) entries.push({ slug, slot, title });
  }

  const metadata = await loadMetadata([...new Set(entries.map((entry) => entry.title))]);
  if (checkOnly) {
    for (const entry of entries) {
      const meta = metadata[entry.title];
      console.log(`${meta ? 'OK ' : 'MISS'} ${entry.slug}/${entry.slot} — ${entry.title}`);
    }
    return;
  }

  const credits = {};
  if (only) {
    try {
      Object.assign(credits, JSON.parse(await fs.readFile(CREDITS, 'utf8')));
    } catch {
      // first run
    }
  }

  for (const entry of entries) {
    const meta = metadata[entry.title];
    if (!meta) {
      console.warn(`Skipping ${entry.slug}/${entry.slot}: no metadata`);
      continue;
    }
    const spec = outputSpec(entry.slug, entry.slot);
    const input = await download(meta.thumbUrl || meta.originalUrl, entry.title);

    await fs.mkdir(path.dirname(spec.file), { recursive: true });
    await sharp(input)
      .rotate()
      .resize(spec.width, spec.height, {
        fit: 'cover',
        position: spec.position,
        withoutEnlargement: false
      })
      .jpeg({ quality: 86, mozjpeg: true, progressive: true })
      .toFile(spec.file);

    credits[spec.publicPath] = {
      title: meta.title,
      author: meta.author,
      license: meta.license,
      licenseUrl: meta.licenseUrl || licenseFallback(meta.license),
      sourceUrl: meta.sourceUrl,
      description: meta.description
    };
    console.log(`✓ ${spec.publicPath} ← ${meta.title}`);
  }

  const sorted = Object.fromEntries(Object.entries(credits).sort(([a], [b]) => a.localeCompare(b)));
  await fs.mkdir(path.dirname(CREDITS), { recursive: true });
  await fs.writeFile(CREDITS, JSON.stringify(sorted, null, 2));
  console.log(`\nCredits written to ${path.relative(ROOT, CREDITS)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

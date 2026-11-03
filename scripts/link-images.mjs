#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCES = path.join(ROOT, 'scripts', 'image-sources.json');
const ALTS = path.join(ROOT, 'scripts', 'image-alts.json');
const ARTICLES = path.join(ROOT, 'src', 'content', 'articles');
const KLUB = path.join(ROOT, 'src', 'pages', 'klub.astro');

const sources = JSON.parse(await fs.readFile(SOURCES, 'utf8'));
const alts = JSON.parse(await fs.readFile(ALTS, 'utf8'));
const files = (await fs.readdir(ARTICLES)).filter((file) => file.endsWith('.mdx'));

for (const file of files) {
  const slug = file.replace(/\.mdx$/, '');
  const entry = sources[slug];
  if (!entry) {
    console.warn(`No image source for ${file}`);
    continue;
  }

  const fullPath = path.join(ARTICLES, file);
  let source = await fs.readFile(fullPath, 'utf8');
  let changed = false;

  if (alts[entry.hero]) {
    source = source.replace(/^heroAlt:.*$/m, `heroAlt: ${JSON.stringify(alts[entry.hero])}`);
    changed = true;
  }

  if (!/^heroSrc:/m.test(source)) {
    const heroSrc = `/images/articles/${slug}/hero.jpg`;
    source = source.replace(/^(heroAlt:.*)$/m, `$1\nheroSrc: "${heroSrc}"`);
    changed = true;
    console.log(`hero ${slug} → ${heroSrc}`);
  }

  const inlineKeys = Object.keys(entry)
    .filter((key) => key.startsWith('inline-'))
    .sort();
  let index = 0;
  source = source.replace(/<Placeholder\b[\s\S]*?\/>/g, (match) => {
    const key = inlineKeys[index++];
    if (!key) return match;
    const title = entry[key];
    const alt = alts[title];
    if (alt) {
      match = match.replace(/\balt="[^"]*"/, `alt="${alt.replaceAll('"', '&quot;')}"`);
      changed = true;
    }
    if (/\bsrc=/.test(match)) return match;
    const src = `/images/articles/${slug}/${key}.jpg`;
    changed = true;
    return match.replace(/\n\s*\/>\s*$/, `\n  src="${src}"\n/>`).replace(/ \/>\s*$/, ` src="${src}" />`);
  });

  if (changed) {
    await fs.writeFile(fullPath, source);
    console.log(`linked ${file}`);
  }
}

const klub = sources.club;
if (klub) {
  let source = await fs.readFile(KLUB, 'utf8');
  if (!source.includes('/images/club/issues.jpg')) {
    source = source.replace(
      /(<Placeholder\b[\s\S]*?)(\n\s*\/>)/,
      `$1\n          src="/images/club/issues.jpg"$2`
    );
    await fs.writeFile(KLUB, source);
    console.log('linked klub/issues');
  }
}

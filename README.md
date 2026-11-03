# Болярин

A slow-luxury men's magazine built with Astro. The design is a refined version of the approved v6 mockup: white paper, black type, Oswald for the masthead and section labels, Noto Serif Display for reading, Golos Text for UI. No client-side framework, no build-time API, no database.

## Stack

- **Astro 7** with static output
- **MDX content collections** for articles
- **Vanilla CSS** with design tokens and the reusable `.lab`, `.meta`, `.btn`, `.sec`, `.c-col`, `.c-row`, `.c-split`, `.c-over`, `.quote`, `.promo`, `.chip`, `.field`, `.ph` elements
- **@astrojs/sitemap** for `sitemap-index.xml`
- **Wikimedia Commons + Sharp** for a reproducible, openly licensed image set with built-in credits
- Zero runtime dependencies on the client. The only scripts are the theme toggle, newsletter demo handler, and search filter.

Astro was chosen because the site is editorial and mostly static. It ships no JS by default, supports MDX for rich article bodies, and gives file-based routing and content collections without a CMS. A new article is one file.

## Commands

Requires Node **22.23.4** or newer (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # preview the production build
npm run check      # Astro + TypeScript diagnostics
npm run images     # download/crop the licensed image set from Wikimedia Commons
npm run images:check # verify every source file still exists on Commons
npm run images:link  # attach image paths to articles and the club page
```

## Structure

```
src/
  content.config.ts           # article schema
  content/articles/*.mdx      # one file per article
  data/site.ts                # site name, categories, navigation
  lib/articles.ts             # sorting, dates, reading time, related
  data/image-credits.json     # generated credits: author, license, source per image
  data/image-credits.ts       # typed lookup used by <Placeholder /> and /krediti/
  layouts/Base.astro          # head, SEO, theme, scripts
  components/
    Header.astro              # masthead, nav, mega menu
    Footer.astro
    ArticleCard.astro         # col / row / split / over
    Placeholder.astro         # image with a photographer's note
    SectionHeader.astro
    PullQuote.astro
    Promo.astro
    Chips.astro
    Breadcrumbs.astro
    Newsletter.astro
  pages/
    index.astro               # home
    krediti.astro             # full image credits with licenses and sources
    latest/index.astro        # archive
    category/[slug].astro     # category pages
    article/[slug].astro      # article template
    klub.astro                # membership page
    search.astro              # client-side search
    komponenti.astro          # design-system sheet
    404.astro
  styles/global.css
public/
  images/                     # photography and licensed images
  favicon.svg
scripts/
  image-sources.json          # curated Wikimedia Commons file for every slot
  fetch-images.mjs            # downloads metadata, resizes/crops, writes credits
  link-images.mjs             # inserts src/heroSrc into the MDX files
docs/
  README.md                   # index of design and research docs
  design/bolyarin-mockup-v6.html
  research/                   # Gentleman's Journal reference material
IMAGE-INSTRUCTIONS.md         # full photography brief for all 64 images
```

## Documentation

| File | Purpose |
|---|---|
| `IMAGE-INSTRUCTIONS.md` | Production brief for all 64 photographs: files, sizes, placement, lighting, alt text, captions |
| `/krediti/` | Live credits page generated from `src/data/image-credits.json` |
| `docs/design/bolyarin-mockup-v6.html` | Approved v6 mockup |
| `docs/research/` | Gentleman's Journal structural research |
| `docs/README.md` | Documentation index |

## Images and credits

The current build uses openly licensed photographs from Wikimedia Commons so the site does not ship grey placeholders. Every downloaded file is cropped to the ratio in `IMAGE-INSTRUCTIONS.md`, saved under `public/images/`, and recorded in `src/data/image-credits.json` with its author, license, license URL, and source page.

```bash
npm run images:check   # confirm the curated Commons files still resolve
npm run images          # download, crop, and write image-credits.json
npm run images:link     # add src / heroSrc to the MDX articles and klub.astro
```

The credit under each image and the `/krediti/` page are generated automatically. If you replace a file with commissioned photography, overwrite the JPEG and delete its entry from `src/data/image-credits.json` so the old attribution is no longer shown. To use a different Commons file, edit `scripts/image-sources.json` and rerun the two commands.

CC BY and CC BY-SA images are cropped and resized for the site; those derivative versions remain under the same license as the originals. CC0 and public-domain images do not require attribution, but they are credited anyway. The credit line is shown on article and club pages; cards and the mega menu link back to the same images and the site-wide credits page in the footer.

## Adding an article

1. Create `src/content/articles/<slug>.mdx`. The filename becomes the URL: `/article/<slug>/`.
2. Add the frontmatter:

```yaml
---
title: "Заглавие"
standfirst: "Едно-две изречения, които служат и за meta description."
category: "stil"                 # slug from src/data/site.ts
publishedAt: 2026-10-27
author: "Име"
authorRole: "Редактор на рубрика „Стил“"
readingTime: 7                   # optional; omitted = calculated from body
badge: "Водещо"                  # optional label above the headline
featured: false
lead: false
tags: ["обувки", "занаят"]
heroNote: "Пълен brief за снимката на фотографа."
heroAlt: "Alt текст за достъпност."
heroCaption: "Текст под снимката." # optional
heroSrc: "/images/articles/<slug>/hero.jpg" # optional; omit for placeholder
paywalled: false
draft: false
---
```

3. Import the components you need and write the body:

```mdx
import Placeholder from '../../components/Placeholder.astro';
import PullQuote from '../../components/PullQuote.astro';

Първият абзац. Той получава drop cap автоматично.

## Подзаглавие

Още текст.

<Placeholder
  note="Пълен brief за снимката."
  alt="Alt текст."
  ratio="3 / 2"
  caption="Текст под снимката."
/>

<PullQuote source="Име, професия">
  „Цитат.“
</PullQuote>
```

4. Run `npm run dev`. The article appears in the archive, its category page, and search automatically. The curated home page uses explicit article IDs in `src/pages/index.astro`; add it there if you want it on the front page.

### Images

Every `<Placeholder />` renders the grey `.ph` block with the shoot note. To replace it with a photo, add `src`:

```astro
<Placeholder src="/images/articles/<slug>/inline-01.jpg" note="..." alt="..." ratio="3 / 2" />
```

For the hero, set `heroSrc` in the frontmatter. The same hero is used for the article, cards, category pages, search results, and the mega menu.

`IMAGE-INSTRUCTIONS.md` contains the production brief, file names, aspect ratios, placement, alt text, and captions for all 64 images in the current build.

## Adding a category

Edit `src/data/site.ts`:

```ts
{
  slug: 'vino',
  label: 'Вино',
  short: 'Вино',
  dek: 'Кратка линия за рубриката.',
  description: 'По-дълго описание за страницата на рубриката.',
  inNav: false
}
```

The category page, chips, archive filter, and `getStaticPaths` update automatically. If you want it in the header or footer, add a link in `src/data/site.ts` and `src/components/Footer.astro`.

## Pages

- `/` — home with hero, editor's pick, latest, heritage, season, culture, newsletter
- `/latest/` — all articles
- `/category/<slug>/` — category archive
- `/article/<slug>/` — article template with breadcrumbs, byline, related reading, JSON-LD
- `/klub/` — membership page with pricing, perks, FAQ
- `/search/` — instant client-side filter by text and category
- `/komponenti/` — the living design-system sheet referenced in the footer
- `/krediti/` — authors, licenses, and sources for every image
- `/poveritelnost/` — privacy note (noindex)
- `/404` — not found

## Theme

The site starts light. The toggle stores the choice in `localStorage` under `bolyarin-theme` and applies it before paint. Dark mode is a reader preference, not the default. Tokens live in `src/styles/global.css`.

## Newsletter and membership

Both forms are front-end only in this template:

- Newsletter shows a thank-you state after a valid email.
- Membership CTAs are `mailto:` links to `klub@bolyarin.bg`.

Connect them to your provider (Mailchimp, Buttondown, Resend, Stripe Checkout, etc.) when the commercial side is ready.

## Deployment

The output is fully static. Deploy `dist/` to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any static host. Set the build command to `npm run build`. Update `site` in `astro.config.mjs` to the production domain before launch; it is used for canonical URLs, Open Graph, JSON-LD, and the sitemap.

## Editorial notes

- Dates are formatted in Bulgarian (`27 октомври 2026`).
- Reading time is calculated from the body unless `readingTime` is set.
- The first paragraph of every article gets a drop cap.
- Drafts (`draft: true`) are excluded from all lists and routes.
- Search is local: it never sends the query anywhere.
- The article schema validates frontmatter at build time, so a missing `heroNote`, `heroAlt`, `title`, or `standfirst` fails the build instead of shipping a broken card.

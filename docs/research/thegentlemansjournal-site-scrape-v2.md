# The Gentleman's Journal — Full Site Scrape (Structure, Menus, Content & Design)

**URL:** https://www.thegentlemansjournal.com/
**Scraped:** 17 August 2026
**Platform:** Next.js (React front-end) · Sanity.io headless CMS (`cdn.sanity.io`) · publisher entity "By G Studio Limited," built by Byass Group

---

## 1. Site Identity

| | |
|---|---|
| Tagline (meta description) | "The men's luxury lifestyle magazine covering style & grooming, food & drink, business, lifestyle, gear, women and travel, for you." |
| Locale | en_GB (British English, £ pricing) |
| Positioning | Modern men's lifestyle/luxury magazine — self-described as **"British in outlook, global in appetite"** |
| Founded / legacy | Copyright line runs 2012–2026; currently on **Issue No. 50** of the print magazine |
| Revenue model | Editorial + affiliate links (Amazon) + display/brand partnerships + paid membership ("Clubhouse") + e-commerce shop |

---

## 2. Full Navigation / Menu Architecture

The site uses a **six-pillar mega-menu**, identical in the header dropdown and the footer sitemap. Each pillar has a landing page plus sub-category pages:

### Style
- Style (hub)
- Grooming
- Watches
- Style Icons
- The Pick (style guides)
- *(also surfaced separately)* **Best Of** — a cross-category "buying guide" vertical (e.g. best cologne, best hoodies, best slippers)

### Business
- Business (hub)
- Business Advice
- Start Ups
- Power

### Lifestyle
- Lifestyle (hub)
- Food & Drink
- Travel
- Fitness
- Property
- People
  - Interview
  - The Diary
- Politics

### Gear
- Gear (hub)
- Cars
- Technology
- Yachts

### Etiquette
- Etiquette (hub)
- Etiquette Advice
- How To

### Culture
- Culture (hub)
- Art
- Books & Music
- Film

### Utility / Non-editorial pages (footer)
- Contact Us
- Meet the Team (`/in-the-office/`)
- Competitions
- GJ Live (events arm)
- Gentleman's Club
- Clubhouse (membership portal)
- Careers
- Privacy Policy
- Terms & Conditions

### Header-only utility icons
- Search
- Clubhouse shortcut
- **Subscribe** (primary CTA button, top right, routes to `/club/`)

### Recurring content "franchises" (not menu items, but consistent named series used across categories)
These act as informal sub-brands that repeat weekly/regularly:
- **The Friday Five** (a themed top-5 list published Fridays — wine, dishes, pub gardens, etc.)
- **Editor's Picks** (weekly product round-up, usually 4 items: watch, fashion piece, fragrance, drink/car)
- **[X] of the Week** (Yacht of the Week, Watch of the Week, Wine of the Week, Property of the Week)
- **Cover Interviews** (flagship celebrity/notable-person profile, tied to print cover stars)
- **The Diary** (social/event diary column)
- **GJ Live / Podcasts / Videos** (multimedia arms with their own playlists)
- **Best Of** (SEO-driven, evergreen buying guides)
- **Gift Guide** (seasonal, e-commerce-linked)

---

## 3. Content Topics & Article Types (by category)

| Category | Typical article types / topics observed |
|---|---|
| **Style** | Buying guides ("Best Hoodies," "Best Slippers," "Best Wax Jackets"), seasonal edits ("29 Holiday style picks"), designer profiles, loafer/shoe history features |
| **Grooming** | Product round-ups (shampoo, cologne, hair products), weekly "best new grooming products," fragrance guides with FAQ sections |
| **Watches** | "Watch of the Week" reviews, brand/heritage stories (Breitling x Aston Martin tie-ins) |
| **Lifestyle / Food & Drink** | "Wine of the Week," cigar lounge city guides (NYC, Vegas, Dallas), restaurant/bar features |
| **Travel / Hotels** | Spa hotel round-ups, "what mattresses do luxury hotels use," destination features |
| **Property** | "Property of the Week" — single luxury home features (e.g. Mallorca villa) |
| **People / Interviews / Cover Interviews** | Long-form celebrity profiles (Jon Batiste), "Out to Lunch With…" interview column |
| **The Diary** | Social-scene event recaps (summer lunches, festivals like Wilderness) |
| **Gear / Cars / Yachts / Technology** | Car launches, yacht reviews, gaming/tech accessory guides |
| **Business / Power** | Business advice, start-up features, profiles of powerful figures |
| **Etiquette** | "How to" guides, etiquette advice columns |
| **Culture** | Art, book & music coverage, film features, magazine issue launches |
| **Podcasts** | Interview-style episodes (restaurateurs, watch experts, car journalists) with guest name as byline |
| **Videos** | Branded content / campaign films (e.g. "The Mallorca Summer Campaign"), talking-head Q&As |
| **Gift Guide** | Seasonal, heavily affiliate-linked gift lists by category (golf, "for men who have everything") |

---

## 4. Anatomy of a Standard Article Page

Using a full article fetch (*"The Best Cologne for Men | The 2026 Fragrance Guide"*) as a template, the article template consistently follows this structure:

1. **Full-width hero image** (Sanity CDN, cropped/focal-point optimised)
2. **Breadcrumb-style category tags** (multiple, e.g. Grooming / Lifestyle / Best Of) as small pill links above the headline
3. **H1 headline**
4. **Dek/standfirst** — one to two sentence summary, often includes "(Updated [date])" and author initials
5. **Byline** — "Words by: [Author Name]" linking to an author page (`/author/[name]/`)
6. **Intro paragraphs** — distinctive editorial voice: witty, dry-British-humour, conversational, first-person anecdotes woven in
7. **"How We Picked" methodology section** — establishes editorial credibility/testing process (common in all buying guides)
8. **Product summary strip** — small thumbnail + brand + product name + price + retailer link (Amazon affiliate), shown as a quick-scan row before the full list
9. **"Who is The Gentleman's Journal" boilerplate section** — brand explainer, appears in guide-style articles for SEO/E-E-A-T purposes
10. **Numbered/segmented product reviews** — each with:
    - Product photo
    - Superlative sub-heading (e.g. "Best Winter Cologne")
    - Price + multiple retailer links (UK/US)
    - Narrative review paragraph in a witty, anecdotal, quote-driven style ("Someone once said I smelled like a scandal in cashmere")
    - Internal links to related articles woven into copy
11. **Educational/explainer section** (e.g. "How Colognes Work With Our Skin") — deeper editorial value-add
12. **FAQ section** — numbered Q&A, SEO-structured, each answer loops back to a recommended product
13. **"Further reading"** — 3 related article cards (image, category, date, title)
14. **Newsletter signup module** (repeated)
15. **Full footer** (as documented in section 6)

**Tone/voice notes:** Consistently witty, self-aware, upper-middle-class British humor with pop-culture and class-signifier references (Chelsea galleries, St James's clubs, Amex Black, Pret a Manger). Reviews use short punchy sentences, em-dashes, rhetorical contrasts ("It doesn't transform, it translates"), and invented dialogue/quotes for color.

---

## 5. Category Landing Page Template

(Based on the "Best Of" category page fetch)

1. Hero-less header — just category **H1 title**
2. One-line **category description/intro** (curatorial framing copy)
3. Paginated **grid/list of article cards**: thumbnail, category tag, headline, one-line dek, publish date
4. **Pagination control** ("Previous / You are on page 1 / Next")
5. Newsletter module (x2, one mid-page, one pre-footer)
6. Standard footer

---

## 6. The "Clubhouse" Membership Product — Deep Dive

The Clubhouse is the site's core monetisation product beyond advertising, positioned as a **private members' club**, not just a subscription:

- **Pricing on homepage:** ~~£59.99~~ **£39.99/year** (≈ £3.33/month)
- **Core deliverables:**
  - Two print "bookazine" issues per year (Summer/Winter), starting at Issue No. 50
  - Physical membership card, mailed in branded packaging
  - Full access to paywalled long-read content (described as covering topics like a Shah of Persia's lavish party, London's gangster clubs, and F1 driver profiles)
  - Password-protected member portal with member-only online features
  - A weekly "Clubhouse Newsletter" (released Sundays) with member-only offers
  - Ongoing brand partner discounts (bars, restaurants, hotels, gyms, grooming/wellness brands — e.g. Mandrake, The Stafford, Rosewood, Core Collective, Form Nutrition), refreshed monthly
  - 15% off on the Gentleman's Journal Shop (1,000+ products) and early access to shop collaborations
  - Invitations to exclusive in-person events (drinks, seasonal parties, panel talks, brand launches)
- **Design language of the Clubhouse specifically** (per the brand's own description of its 2023 relaunch): a deliberate move away from the original **"pared-down, black-and-white, austere"** portal design toward a **"more vibrant aesthetic anchored around pastel tones (blue, lilac and peach)"**, with **"handsome, flowing sans-serif typography"**, "understated smart touches," and a **"feel-good preppy spirit"** intended to evoke a members'-club community feeling. The membership card/mailer uses **Pantone blue** packaging.

This is a notably different visual language from the main editorial site (which is white-background, photo-led, and more restrained/masthead-driven) — the Clubhouse is treated as its own sub-brand with a softer, pastel, "preppy" identity.

---

## 7. Design System — Deep Dive

*Compiled from page metadata, structural/markup patterns, and the brand's own stated design description for the Clubhouse relaunch. Exact hex codes and font families are not independently measurable from a text/markup fetch — the notes below combine confirmed metadata with strong structural inference.*

### 7.1 Confirmed from metadata
- `theme-color: white` — light/white base UI across the whole site
- `og:locale: en_GB`
- Images centrally served via **Sanity CDN** with on-the-fly transforms: `?auto=format&crop=focalpoint&fit=crop&fp-x=&fp-y=&q=&w=&h=` — meaning every image is art-directed with a focal point per placement (hero crops differently than card thumbnail differently than social share image)
- Standard OG/Twitter image ratio: 1200×627 (landscape, `summary_large_image` card type) for articles; plain `summary` card type for the homepage
- Responsive width variants generated per breakpoint (e.g. thumbnails at w=170, cards at w=425–730, hero at w=1440–1920)

### 7.2 Structural / layout patterns (inferred from consistent markup)
- **Grid/card-based editorial layout** throughout — no single template deviates from: image → category tag(s) → title → dek → date
- **Full-bleed hero treatment** on both homepage and article pages — the photography is the dominant visual element, headlines overlay or sit directly beneath
- **Carousel/rail components** for Podcasts and Videos — horizontally scrollable, distinct from the vertical article feed
- **Small circular/square avatar-style thumbnails** (170×170) used specifically in the "quick pick" product strip within buying-guide articles, contrasted with large rectangular (860px wide) images for the full in-depth product reviews — a deliberate visual hierarchy between "at a glance" and "read the review"
- **Pull-quote module ("Musings")** — a dedicated, editorially curated typographic break in the homepage feed, using a famous quotation (e.g. Abraham Lincoln) set apart from article cards, suggesting a large serif/italic display treatment typical of magazine pull-quotes
- **Repeated conversion modules** — the newsletter sign-up form and Clubhouse membership promo are not confined to header/footer but are deliberately interspersed 2–3 times down the page, indicating a growth/CRO-driven layout strategy layered onto the editorial one
- **Consistent iconography row** for social channels in the footer (Facebook, Twitter/X, TikTok, Instagram, YouTube, LinkedIn) — six platforms, presented as plain icon links
- **"Back to top"** utility link — signals a long, scroll-heavy page designed for continuous browsing rather than tight above-the-fold hierarchy

### 7.3 Typography & color (brand's own words, from Clubhouse relaunch description)
While specific to the Clubhouse sub-brand rather than confirmed for the whole main site, the brand explicitly describes its design philosophy as:
- A shift toward **pastel tones — specifically blue, lilac and peach**
- **"Handsome, flowing sans-serif typography"**
- A **"feel-good preppy spirit"** referencing 20th-century members'-clubs aesthetics
- Contrasted explicitly against their older **black-and-white, austere** look

For the core editorial site (thegentlemansjournal.com), the visual tone by contrast reads as more classic/masthead-driven editorial: white background, black text, large serif-leaning wordmark treatment for "The Gentleman's Journal" masthead, photography-forward layout — a fairly traditional glossy-magazine-online formula (comparable to GQ/Esquire-style digital editorial sites) rather than the softer pastel Clubhouse identity.

### 7.4 UX/conversion patterns
- Newsletter form fields collect **Email, Phone, First Name, Last Name** plus a Privacy Policy consent checkbox — a relatively data-rich capture form for a media newsletter (suggests use for both email and SMS/phone marketing)
- Membership pricing uses classic **strikethrough original price + discounted price + monthly-equivalent framing** (£59.99 → £39.99/yr, "equivalent to £3.33/month") — standard subscription-marketing psychology
- Affiliate commerce is deeply embedded in editorial: every product recommendation links out to Amazon (UK and US variants shown separately with local pricing), marked with `amzn.to` shortlinks
- Internal linking is heavy and contextual — product review paragraphs link out mid-sentence to other related guides (e.g. a cologne review links to "how to apply cologne" and "best luxury beds")

---

## 8. Sample of Real Article Titles by Franchise (for tone/content reference)

**Best Of / Buying Guides:**
- The Best Cologne for Men | The 2026 Fragrance Guide
- The Best Hoodies For Men
- The Best Slippers for Men for Comfort, Support and Style
- The Best Wax Jacket Brands To Wear In 2026
- Men's Best Shampoo Guide | What Actually Works
- Best Magnesium Supplements For Men
- The Best Gaming Laptop Accessories
- Top Winter Boot Brands in the UK

**City/Venue Guides:**
- Top Cigar Lounges in Dallas
- The Best Cigar Lounges in Las Vegas
- The Most Popular Cigar Lounges in NYC
- The 24 Best Spa Hotels in the UK

**Weekly "of the Week":**
- Yacht of the Week: Galileo G
- Watch of the Week: Breitling's Top Time B01 Chronograph
- Wine of the Week: Billecart-Salmon Le Blanc de Blancs
- Property of the Week: Sa Solana

**Cover Interviews / People:**
- "Music gives us order in a world of chaos" — The inevitable joy of Jon Batiste
- Speed, scent and the fight for the title
- Out to Lunch With Matthew Friend

**The Friday Five:**
- The five wines you should actually be investing in now
- The Five greatest pub gardens in London
- Anthony Bourdain's Five Favourite Dishes on the Planet

**Editor's Picks (multi-brand roundups):**
- Editor's Picks: Jaeger-LeCoultre watch, Purdey coat, Cheaney loafers and Globe-Trotter trunk
- Editor's Picks: Certina watch, L.G.R sunglasses, Monte Carlo Beer and Range Rover prototype

---

## 9. Editorial Voice Guide (for anyone replicating tone)

- **Persona:** Well-off, well-travelled, self-deprecating British gentleman — knowing rather than earnest
- **Techniques used repeatedly:**
  - Invented overheard quotes/dialogue used as color ("You smell like someone with an Amex Black")
  - Class/lifestyle signifiers as shorthand (St James's clubs, Chelsea galleries, Pret a Manger as a bathetic contrast to luxury)
  - Short declarative sentence used as a paragraph-ending punchline
  - Antithesis/contrast construction: "It doesn't transform you, it translates you"
  - Product reviews personified/gendered as characters ("the politician," "the permanent secretary")
  - Consistent use of em-dashes and semicolons for rhythm
- **Structural SEO habits:** every guide includes a "How We Picked" trust section, a "Who is GJ" brand section, and a 10–12 question FAQ block targeting long-tail search queries

---

*This is a text/structural scrape compiled from live page fetches and site/brand self-descriptions found in search results — not a pixel-measured design audit. Colors and fonts for the main editorial site are inferred from structural patterns and general genre conventions; the Clubhouse color/type description is directly sourced from the brand's own published description of its redesign.*

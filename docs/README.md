# Документация

Тук е събрано всичко, което не е код: фотографските инструкции, оригиналният макет и изследването на Gentleman's Journal.

## Файлове

| Файл | Какво съдържа |
|---|---|
| [`../IMAGE-INSTRUCTIONS.md`](../IMAGE-INSTRUCTIONS.md) | Пълни инструкции за всички 64 снимки: формат, позиция, brief, alt текст, текст под снимката |
| `/krediti/` | Автори, лицензи и източници на всички използвани снимки |
| [`../scripts/image-sources.json`](../scripts/image-sources.json) | Кюриран списък с файловете от Wikimedia Commons за всеки слот |
| [`design/bolyarin-mockup-v6.html`](design/bolyarin-mockup-v6.html) | Одобреният HTML макет v6, от който е изграден Astro сайтът |
| [`research/gentlemans-journal-teardown.md`](research/gentlemans-journal-teardown.md) | Reverse-engineering анализ на Gentleman's Journal: структура, CMS, дизайн, монетизация |
| [`research/thegentlemansjournal-site-scrape-v2.md`](research/thegentlemansjournal-site-scrape-v2.md) | По-ранен scrape на сайта: навигация, съдържание, глас, дизайн система |

## Как да използвате

- За дизайн и структура: започнете от макета и `src/styles/global.css`.
- За нови статии: вижте `README.md` в корена.
- За снимки: отворете `IMAGE-INSTRUCTIONS.md` и следвайте секцията на съответната статия.
- За реализацията: `src/` е единственият код, който се билдва. `docs/` не влиза в `dist/`.

## Важно

Файловете в `docs/research/` са референтни. Те описват чужд сайт и не са част от публичното съдържание на Болярин. Не копирайте текстове или изображения от тях.

export const site = {
  name: 'Болярин',
  tagline: 'Списание за мъже, които не бързат',
  description:
    'Болярин е списание за стил, часовници, автомобили, пътувания, интериор и гастрономия. За мъже, които предпочитат вещта, която остава.',
  url: 'https://bolyarin.bg',
  email: 'redakcia@bolyarin.bg',
  clubEmail: 'klub@bolyarin.bg',
  issue: 'Есен и зима 2026',
  issueNumber: 'Брой 07'
} as const;

export type Category = {
  slug: string;
  label: string;
  short: string;
  dek: string;
  description: string;
  inNav?: boolean;
};

export const categories: Category[] = [
  {
    slug: 'stil',
    label: 'Стил',
    short: 'Стил',
    dek: 'Кройки, материи и вещи, които издържат повече от един сезон.',
    description:
      'За обувките, които се поправят, саката, които остаряват добре, и правилата, които си струва да нарушиш. Стил без шум.',
    inNav: true
  },
  {
    slug: 'chasovnitsi',
    label: 'Часовници',
    short: 'Часовници',
    dek: 'Механика, история и търпението да носиш нещо цял живот.',
    description:
      'Механични часовници, независими ателиета и наследството на една от малкото останали индустрии, в които бързането е недостатък.',
    inNav: true
  },
  {
    slug: 'avtomobili',
    label: 'Автомобили',
    short: 'Автомобили',
    dek: 'Линии, двигатели и шофирането като форма на внимание.',
    description:
      'Класически пропорции, съвременни технологии и пътища, на които автомобилът все още има значение.',
    inNav: true
  },
  {
    slug: 'patuvania',
    label: 'Пътувания',
    short: 'Пътувания',
    dek: 'Места, до които си струва да стигнеш бавно.',
    description:
      'Хотели, маршрути и градове, избрани заради тишината, детайла и хората, които ги правят.',
    inNav: true
  },
  {
    slug: 'interier',
    label: 'Интериор',
    short: 'Интериор',
    dek: 'Домове с памет, материал и правилен размер.',
    description:
      'Реставрация, мебели с произход и идеята, че една стая може да бъде завършена, без да бъде нова.',
    inNav: true
  },
  {
    slug: 'gastronomia',
    label: 'Гастрономия',
    short: 'Гастрономия',
    dek: 'Вино, ракия и храна, направени с време.',
    description:
      'Майстори, маси и бутилки, които не се обясняват с рекламни думи, а с произход и търпение.',
    inNav: true
  },
  {
    slug: 'nasledstvo',
    label: 'Наследство',
    short: 'Наследство',
    dek: 'Занаяти, сгради и хора, които пазят това, което остава.',
    description:
      'Ателиета, фасади и семейни истории. Паметта като материал, с който се работи.',
    inNav: false
  },
  {
    slug: 'kultura',
    label: 'Култура',
    short: 'Култура',
    dek: 'Книги, изкуство и идеи, които си заслужават тишината.',
    description:
      'Изложби, книги и разговори, които не се стремят към новината, а към смисъла.',
    inNav: false
  },
  {
    slug: 'etiket',
    label: 'Етикет',
    short: 'Етикет',
    dek: 'Правилата, които правят свободата възможна.',
    description:
      'Не за поучителност, а за улеснение. Как се държи човек, когато никой не го гледа.',
    inNav: false
  },
  {
    slug: 'hora',
    label: 'Хора',
    short: 'Хора',
    dek: 'Портрети на хора, които работят с ръцете си.',
    description:
      'Разговори с майстори, търговци и колекционери: хора, чиято професия изисква време.',
    inNav: false
  }
];

export const nav = [
  { label: 'Последни', href: '/latest/' },
  { label: 'Стил', href: '/category/stil/' },
  { label: 'Часовници', href: '/category/chasovnitsi/' },
  { label: 'Автомобили', href: '/category/avtomobili/' },
  { label: 'Пътувания', href: '/category/patuvania/' },
  { label: 'Интериор', href: '/category/interier/' },
  { label: 'Гастрономия', href: '/category/gastronomia/' },
  {
    label: 'Живот и култура',
    href: '/category/kultura/',
    children: ['kultura', 'etiket', 'hora', 'nasledstvo']
  },
  { label: 'Клуб', href: '/klub/' }
] as const;

export function getCategory(slug: string): Category {
  return (
    categories.find((category) => category.slug === slug) ?? {
      slug,
      label: 'Материали',
      short: 'Материали',
      dek: '',
      description: ''
    }
  );
}

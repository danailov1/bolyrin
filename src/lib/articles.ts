import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

const months = [
  'януари',
  'февруари',
  'март',
  'април',
  'май',
  'юни',
  'юли',
  'август',
  'септември',
  'октомври',
  'ноември',
  'декември'
];

const weekdays = [
  'неделя',
  'понеделник',
  'вторник',
  'сряда',
  'четвъртък',
  'петък',
  'събота'
];

export function formatDate(date: Date): string {
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatLongDate(date: Date): string {
  return `${weekdays[date.getUTCDay()]}, ${formatDate(date)}`;
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function articleUrl(article: Article): string {
  return `/article/${article.id}/`;
}

export function readingMinutes(article: Article): number {
  if (article.data.readingTime) return article.data.readingTime;
  const text = (article.body ?? '')
    .replace(/^import .*$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|{}[\]]/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function isPublished(article: Article): boolean {
  return !article.data.draft;
}

export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', isPublished);
  return articles.sort((a, b) => {
    const diff = b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
    return diff !== 0 ? diff : a.data.title.localeCompare(b.data.title, 'bg');
  });
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.data.category === category);
}

export function relatedArticles(all: Article[], current: Article, limit = 3): Article[] {
  const pool = all.filter((article) => article.id !== current.id);
  const same = pool.filter((article) => article.data.category === current.data.category);
  const rest = pool.filter((article) => article.data.category !== current.data.category);
  return [...same, ...rest].slice(0, limit);
}

export function excludeArticles(all: Article[], excluded: Article[]): Article[] {
  const ids = new Set(excluded.map((article) => article.id));
  return all.filter((article) => !ids.has(article.id));
}

export function findArticle(all: Article[], id: string): Article | undefined {
  return all.find((article) => article.id === id);
}

export function pickArticle(all: Article[], id: string): Article {
  const article = findArticle(all, id);
  if (!article) throw new Error(`Липсва материал: ${id}`);
  return article;
}

export function materialsLabel(count: number): string {
  return `${count} ${count === 1 ? 'материал' : 'материала'}`;
}

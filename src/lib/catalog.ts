import { getCollection, type CollectionEntry } from 'astro:content';

export type Category = CollectionEntry<'categories'>;
export type Product = CollectionEntry<'products'>;

export async function getCategories(): Promise<Category[]> {
  const cats = await getCollection('categories');
  return cats.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export async function getProducts(): Promise<Product[]> {
  const products = await getCollection('products');
  return products.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export const categoryUrl = (slug: string) => `/machines/${slug}/`;
export const productUrl = (p: Product) => `/machines/${p.data.category.id}/${p.id}/`;
export const productSpec = (p: Product) => [p.data.capacity, p.data.power].filter(Boolean).join(' · ');

/** Lookup map: category slug -> category entry. */
export async function getCategoryMap() {
  const cats = await getCategories();
  return new Map(cats.map(c => [c.id, c]));
}

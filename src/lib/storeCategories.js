export const storeCategories = [
  {
    slug: 'all',
    name: 'All',
    matches: [],
  },
  {
    slug: 'beauty-wellness',
    name: 'Beauty',
    matches: ['beauty', 'skin-care', 'fragrances'],
  },
  {
    slug: 'tech',
    name: 'Tech',
    matches: ['smartphones', 'laptops', 'tablets', 'mobile-accessories'],
  },
  {
    slug: 'fashion',
    name: 'Fashion',
    matches: [
      'tops',
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'womens-dresses',
      'womens-shoes',
      'womens-bags',
      'womens-jewellery',
      'womens-watches',
      'sunglasses',
    ],
  },
  {
    slug: 'home-living',
    name: 'Home',
    matches: ['furniture', 'home-decoration', 'kitchen-accessories', 'groceries'],
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    matches: ['sports-accessories', 'motorcycle', 'vehicle'],
  },
]

export function getStoreCategoryLabel(categorySlug) {
  return storeCategories.find((category) => category.slug === categorySlug)?.name ?? 'All'
}

export function matchesStoreCategory(product, categorySlug) {
  if (categorySlug === 'all') {
    return true
  }

  const category = storeCategories.find((item) => item.slug === categorySlug)
  return category ? category.matches.includes(product.category) : true
}

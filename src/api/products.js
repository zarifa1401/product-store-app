const API_BASE_URL = 'https://dummyjson.com'

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchCategories() {
  return fetchJson('/products/categories')
}

export async function fetchProducts(category = 'all') {
  const path =
    category === 'all'
      ? '/products?limit=0'
      : `/products/category/${encodeURIComponent(category)}?limit=0`

  const data = await fetchJson(path)
  return data.products
}

export async function fetchProductById(productId) {
  return fetchJson(`/products/${productId}`)
}

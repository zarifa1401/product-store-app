const API_BASE_URL = 'https://dummyjson.com'

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchProducts() {
  const data = await fetchJson('/products?limit=0')
  return data.products
}

export async function fetchProductById(productId) {
  return fetchJson(`/products/${productId}`)
}

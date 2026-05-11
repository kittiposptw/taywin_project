import { useState, useEffect } from 'react'
import { SHEET_CSV_URL } from '../config/sheetConfig'

// Fallback data shown while the sheet loads or if URL isn't set yet
const FALLBACK_PRODUCTS = [
  {
    sku: 'HO-TAN-42',
    name: 'The Heritage Oxford',
    series: 'The Foundation Series',
    price: 425,
    description:
      'A definitive statement in traditional shoemaking. Crafted from single-batch full-grain calfskin, the Heritage Oxford features a traditional Goodyear welt construction that ensures decades of wear and the ability to be resoled indefinitely.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-99_M2DW3ANBKgyxsiXdYwhQLzT2Yca8xzuBWPOMZner5yZ0in8ZlS5hCVaNiuUYXl1TbioKaClxIwE6D17EqaraUxk2hZkgCCa41_E--S7CQpZT8paPMGdlGd5oA_U-qp3NIvxH8-ZMstbpuwBKg4o9pABRluOo-DhQYG1wo08U6eYJaCN67NtBcaOqHiQAq3A2EJU9CqmDSUy_FarVwR93sGCYxyrOGX-F8V2PxDuzXgILOXfT02qm-QAfaYycOYNR07kpq5vY',
    sizes: ['7', '8', '9', '10', '11'],
    visible: true,
  },
]

function parseCSV(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))

  return lines
    .slice(1)
    .map((line) => {
      // Handle quoted fields that may contain commas
      const values = []
      let current = ''
      let inQuotes = false
      for (const char of line) {
        if (char === '"') { inQuotes = !inQuotes }
        else if (char === ',' && !inQuotes) { values.push(current.trim()); current = '' }
        else { current += char }
      }
      values.push(current.trim())

      const row = {}
      headers.forEach((h, i) => { row[h] = values[i] ?? '' })

      return {
        sku: row['SKU'] || '',
        name: row['Name'] || '',
        series: row['Series'] || '',
        price: parseFloat((row['Price'] || '').replace(/[^0-9.]/g, '')) || 0,
        description: row['Description'] || '',
        imageUrl: row['ImageURL'] || '',
        sizes: (row['Sizes'] || '').split(',').map((s) => s.trim()).filter(Boolean),
        visible: row['Visible']?.trim().toUpperCase() !== 'FALSE',
      }
    })
    .filter((p) => p.visible && p.sku)
}

export function useProducts() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS)
  const [loading, setLoading] = useState(!!SHEET_CSV_URL)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!SHEET_CSV_URL) return

    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const parsed = parseCSV(text)
        if (parsed.length > 0) setProducts(parsed)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

export function useProduct(sku) {
  const { products, loading, error } = useProducts()
  return {
    product: products.find((p) => p.sku === sku) ?? products[0] ?? null,
    loading,
    error,
  }
}

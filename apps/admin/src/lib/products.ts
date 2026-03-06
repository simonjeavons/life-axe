import { supabase } from './supabase'

export interface Product {
  id: string
  title: string
  slug: string
  subtitle: string | null
  category: string | null
  audience: string | null
  tone: string | null
  difficulty: string | null
  short_description: string | null
  long_description: string | null
  content_json: Record<string, unknown> | null
  pdf_url: string | null
  cover_image_url: string | null
  status: 'DRAFT' | 'CONTENT_GENERATED' | 'PDF_GENERATED' | 'ARCHIVED'
  created_at: string
  updated_at: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getProduct(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createProduct(
  input: Omit<Product, 'id' | 'slug' | 'content_json' | 'pdf_url' | 'cover_image_url' | 'status' | 'created_at' | 'updated_at'>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      ...input,
      slug: slugify(input.title),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduct(
  id: string,
  input: Partial<Product>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getDashboardStats() {
  const { count: total } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: pdfsGenerated } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PDF_GENERATED')

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { count: recentlyUpdated } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .gte('updated_at', weekAgo)

  return {
    total: total ?? 0,
    pdfsGenerated: pdfsGenerated ?? 0,
    recentlyUpdated: recentlyUpdated ?? 0,
  }
}

export async function uploadPdfToStorage(
  productId: string,
  blob: Blob
): Promise<string> {
  const path = `guides/${productId}.pdf`

  const { error } = await supabase.storage
    .from('guide-pdfs')
    .upload(path, blob, { upsert: true })

  if (error) throw error

  const { data } = supabase.storage.from('guide-pdfs').getPublicUrl(path)
  return data.publicUrl
}

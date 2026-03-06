import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import { Button, StatusBadge } from '@life-axe/ui'
import { Save, Sparkles, AlertCircle } from 'lucide-react'
import { getProduct, updateProduct, uploadPdfToStorage } from '~/lib/products'
import { generateGuideContent } from '~/lib/content'
import { ProductForm } from '~/components/products/ProductForm'
import { ContentEditor } from '~/components/products/ContentEditor'
import { PdfPreviewPanel } from '~/components/products/PdfPreviewPanel'
import type { GuideContent } from '@life-axe/services'

export const Route = createFileRoute('/_authed/products/$productId/edit')({
  loader: ({ params }) => getProduct(params.productId),
  component: ProductEditorPage,
})

function ProductEditorPage() {
  const product = Route.useLoaderData()
  const { productId } = Route.useParams()

  const [form, setForm] = useState({
    title: product.title,
    subtitle: product.subtitle || '',
    category: product.category || '',
    audience: product.audience || '',
    tone: product.tone || 'professional',
    difficulty: product.difficulty || 'intermediate',
    shortDescription: product.short_description || '',
  })

  const [content, setContent] = useState<GuideContent | null>(
    (product.content_json as GuideContent) || null
  )
  const [status, setStatus] = useState(product.status)
  const [pdfUrl, setPdfUrl] = useState(product.pdf_url)
  const [error, setError] = useState<string | null>(null)

  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError(null)
    try {
      await updateProduct(productId, {
        title: form.title,
        subtitle: form.subtitle || null,
        category: form.category || null,
        audience: form.audience || null,
        tone: form.tone,
        difficulty: form.difficulty,
        short_description: form.shortDescription || null,
        content_json: content as Record<string, unknown> | null,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }, [productId, form, content])

  const handleGenerateContent = useCallback(async () => {
    setGenerating(true)
    setError(null)
    try {
      // Save metadata first
      await updateProduct(productId, {
        title: form.title,
        subtitle: form.subtitle || null,
        category: form.category || null,
        audience: form.audience || null,
        tone: form.tone,
        difficulty: form.difficulty,
        short_description: form.shortDescription || null,
      })

      const result = await generateGuideContent({
        title: form.title,
        subtitle: form.subtitle || undefined,
        category: form.category || undefined,
        audience: form.audience || undefined,
        tone: form.tone || undefined,
        difficulty: form.difficulty || undefined,
        shortDescription: form.shortDescription || undefined,
      })

      setContent(result)
      setStatus('CONTENT_GENERATED')

      // Save generated content
      await updateProduct(productId, {
        content_json: result as unknown as Record<string, unknown>,
        status: 'CONTENT_GENERATED',
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Content generation failed'
      setError(message)
      console.error('Generate content error:', err)
    } finally {
      setGenerating(false)
    }
  }, [productId, form])

  const handleGeneratePdf = useCallback(async () => {
    if (!content) return
    setGeneratingPdf(true)
    setError(null)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { LifeAxeClassicPDF } = await import('@life-axe/ui/src/pdf/LifeAxeClassicPDF')

      const blob = await pdf(
        LifeAxeClassicPDF({ product: { title: form.title, subtitle: form.subtitle }, content })
      ).toBlob()

      const url = await uploadPdfToStorage(productId, blob)
      setPdfUrl(url)
      setStatus('PDF_GENERATED')

      await updateProduct(productId, {
        pdf_url: url,
        status: 'PDF_GENERATED',
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'PDF generation failed'
      setError(message)
      console.error('Generate PDF error:', err)
    } finally {
      setGeneratingPdf(false)
    }
  }, [content, productId, form.title, form.subtitle])

  return (
    <div className="h-full flex flex-col">
      <div className="h-12 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground truncate max-w-[200px]">
            {form.title || 'Untitled Guide'}
          </h1>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            state={generating ? 'loading' : 'idle'}
            onClick={handleGenerateContent}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            {content ? 'Regenerate' : 'Generate Content'}
          </Button>
          <Button
            size="sm"
            state={saving ? 'loading' : 'idle'}
            onClick={handleSave}
            icon={<Save className="w-3.5 h-3.5" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 bg-error/10 border-b border-error/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-error shrink-0" />
          <p className="text-sm text-error">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-xs text-error/60 hover:text-error cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex-1 grid grid-cols-[280px_1fr_280px] overflow-hidden">
        <div className="border-r border-[rgba(255,255,255,0.08)] overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-3">
            Guide Details
          </h2>
          <ProductForm data={form} onChange={setForm} />
        </div>

        <div className="overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-3">
            Content
          </h2>
          <ContentEditor
            content={content}
            onChange={setContent}
            onRequestGenerate={handleGenerateContent}
          />
        </div>

        <div className="border-l border-[rgba(255,255,255,0.08)] overflow-y-auto p-4">
          <PdfPreviewPanel
            pdfUrl={pdfUrl}
            status={status}
            isGenerating={generatingPdf}
            onGenerate={handleGeneratePdf}
          />
        </div>
      </div>
    </div>
  )
}

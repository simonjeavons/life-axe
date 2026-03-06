import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, StatusBadge, Button } from '@life-axe/ui'
import { Pencil, Download } from 'lucide-react'
import { getProduct } from '~/lib/products'

export const Route = createFileRoute('/_authed/products/$productId')({
  loader: ({ params }) => getProduct(params.productId),
  component: ProductViewPage,
})

function ProductViewPage() {
  const product = Route.useLoaderData()

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{product.title}</h1>
          {product.subtitle && (
            <p className="text-sm text-foreground-muted mt-0.5">{product.subtitle}</p>
          )}
        </div>
        <div className="flex gap-2">
          {product.pdf_url && (
            <a href={product.pdf_url} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" icon={<Download className="w-4 h-4" />}>Download PDF</Button>
            </a>
          )}
          <Link to="/products/$productId/edit" params={{ productId: product.id }}>
            <Button icon={<Pencil className="w-4 h-4" />}>Edit Guide</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground-muted">Status</p>
              <StatusBadge status={product.status} />
            </div>
            <div>
              <p className="text-xs text-foreground-muted">Category</p>
              <p className="text-sm text-foreground">{product.category || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-foreground-muted">Audience</p>
              <p className="text-sm text-foreground">{product.audience || '—'}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-foreground-muted">Tone</p>
              <p className="text-sm text-foreground capitalize">{product.tone || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-foreground-muted">Difficulty</p>
              <p className="text-sm text-foreground capitalize">{product.difficulty || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-foreground-muted">Created</p>
              <p className="text-sm text-foreground">{new Date(product.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {product.short_description && (
        <Card>
          <p className="text-xs text-foreground-muted mb-1">Description</p>
          <p className="text-sm text-foreground-secondary">{product.short_description}</p>
        </Card>
      )}
    </div>
  )
}

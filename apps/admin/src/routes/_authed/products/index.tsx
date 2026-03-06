import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, StatusBadge, EmptyState } from '@life-axe/ui'
import { Plus, Pencil, Eye } from 'lucide-react'
import { getProducts, type Product } from '~/lib/products'

export const Route = createFileRoute('/_authed/products/')({
  loader: () => getProducts(),
  component: ProductsPage,
})

function ProductsPage() {
  const products = Route.useLoaderData()

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Products</h1>
          <p className="text-sm text-foreground-muted mt-0.5">
            Manage your digital guides
          </p>
        </div>
        <Link to="/products/new">
          <Button icon={<Plus className="w-4 h-4" />}>Create Guide</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-panel border border-[rgba(255,255,255,0.08)] rounded-xl">
          <EmptyState
            title="No guides yet"
            description="Create your first guide to start building your library."
            actionLabel="Create Guide"
            onAction={() => { window.location.href = '/products/new' }}
          />
        </div>
      ) : (
        <div className="bg-panel border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-foreground-muted border-b border-[rgba(255,255,255,0.08)]">
                <th className="text-left font-medium px-4 py-3">Title</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3">Updated</th>
                <th className="text-right font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr
                  key={product.id}
                  className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{product.title}</span>
                    {product.subtitle && (
                      <span className="block text-xs text-foreground-muted mt-0.5">{product.subtitle}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground-muted">
                    {new Date(product.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link to="/products/$productId" params={{ productId: product.id }}>
                        <Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /></Button>
                      </Link>
                      <Link to="/products/$productId/edit" params={{ productId: product.id }}>
                        <Button variant="ghost" size="sm"><Pencil className="w-3.5 h-3.5" /></Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

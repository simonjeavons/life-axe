import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, StatusBadge, Button } from '@life-axe/ui'
import { Plus, FileText, RefreshCw, Download } from 'lucide-react'
import { getDashboardStats, getProducts, type Product } from '~/lib/products'

export const Route = createFileRoute('/_authed/dashboard')({
  loader: async () => {
    const [stats, products] = await Promise.all([
      getDashboardStats(),
      getProducts(),
    ])
    return { stats, recentProducts: products.slice(0, 5) }
  },
  component: DashboardPage,
})

function DashboardPage() {
  const { stats, recentProducts } = Route.useLoaderData()

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-foreground-muted mt-0.5">
            Overview of your guide library
          </p>
        </div>
        <Link to="/products/new">
          <Button icon={<Plus className="w-4 h-4" />}>Create Guide</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
              <p className="text-xs text-foreground-muted">Total Guides</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-accent-secondary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.recentlyUpdated}</p>
              <p className="text-xs text-foreground-muted">Recently Updated</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
              <Download className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stats.pdfsGenerated}</p>
              <p className="text-xs text-foreground-muted">PDFs Generated</p>
            </div>
          </div>
        </Card>
      </div>

      <Card padding="sm">
        <div className="px-3 py-2 border-b border-[rgba(255,255,255,0.08)]">
          <h2 className="text-sm font-medium text-foreground">Recent Guides</h2>
        </div>
        {recentProducts.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-foreground-muted">
              No guides yet. Create your first guide to get started.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-xs text-foreground-muted border-b border-[rgba(255,255,255,0.06)]">
                <th className="text-left font-medium px-3 py-2">Title</th>
                <th className="text-left font-medium px-3 py-2">Status</th>
                <th className="text-left font-medium px-3 py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product: Product) => (
                <tr
                  key={product.id}
                  className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td className="px-3 py-2.5">
                    <Link
                      to="/products/$productId/edit"
                      params={{ productId: product.id }}
                      className="text-sm text-foreground hover:text-accent transition-colors"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-3 py-2.5 text-xs text-foreground-muted">
                    {new Date(product.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

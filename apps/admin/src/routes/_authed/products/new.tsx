import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input, Select, Textarea, Card } from '@life-axe/ui'
import { createProduct } from '~/lib/products'

export const Route = createFileRoute('/_authed/products/new')({
  component: NewProductPage,
})

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'academic', label: 'Academic' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'authoritative', label: 'Authoritative' },
]

const difficultyOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

function NewProductPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    category: '',
    audience: '',
    tone: 'professional',
    difficulty: 'intermediate',
    short_description: '',
  })

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setLoading(true)

    try {
      const product = await createProduct(form)
      navigate({
        to: '/products/$productId/edit',
        params: { productId: product.id },
      })
    } catch (err) {
      console.error('Failed to create product:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Create Guide</h1>
        <p className="text-sm text-foreground-muted mt-0.5">
          Set up your guide details, then generate content with AI
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            placeholder="e.g., The Complete Guide to Remote Work"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
            autoFocus
          />
          <Input
            label="Subtitle"
            placeholder="A brief subtitle for the cover"
            value={form.subtitle}
            onChange={(e) => updateField('subtitle', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Category"
              placeholder="e.g., Productivity"
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
            />
            <Input
              label="Target Audience"
              placeholder="e.g., Freelancers"
              value={form.audience}
              onChange={(e) => updateField('audience', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Tone" options={toneOptions} value={form.tone} onChange={(e) => updateField('tone', e.target.value)} />
            <Select label="Difficulty" options={difficultyOptions} value={form.difficulty} onChange={(e) => updateField('difficulty', e.target.value)} />
          </div>
          <Textarea
            label="Short Description"
            placeholder="Describe what this guide covers..."
            value={form.short_description}
            onChange={(e) => updateField('short_description', e.target.value)}
            rows={3}
          />
          <div className="flex justify-end pt-2">
            <Button type="submit" state={loading ? 'loading' : 'idle'}>Create Guide</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

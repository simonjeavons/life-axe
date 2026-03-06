import { Input, Select, Textarea } from '@life-axe/ui'

interface ProductFormData {
  title: string
  subtitle: string
  category: string
  audience: string
  tone: string
  difficulty: string
  shortDescription: string
}

interface ProductFormProps {
  data: ProductFormData
  onChange: (data: ProductFormData) => void
}

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

export function ProductForm({ data, onChange }: ProductFormProps) {
  function update(field: keyof ProductFormData, value: string) {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-3">
      <Input
        label="Title"
        value={data.title}
        onChange={(e) => update('title', e.target.value)}
        placeholder="Guide title"
      />
      <Input
        label="Subtitle"
        value={data.subtitle}
        onChange={(e) => update('subtitle', e.target.value)}
        placeholder="Brief subtitle"
      />
      <Input
        label="Category"
        value={data.category}
        onChange={(e) => update('category', e.target.value)}
        placeholder="e.g., Marketing"
      />
      <Input
        label="Audience"
        value={data.audience}
        onChange={(e) => update('audience', e.target.value)}
        placeholder="e.g., Freelancers"
      />
      <Select
        label="Tone"
        options={toneOptions}
        value={data.tone}
        onChange={(e) => update('tone', e.target.value)}
      />
      <Select
        label="Difficulty"
        options={difficultyOptions}
        value={data.difficulty}
        onChange={(e) => update('difficulty', e.target.value)}
      />
      <Textarea
        label="Description"
        value={data.shortDescription}
        onChange={(e) => update('shortDescription', e.target.value)}
        placeholder="What does this guide cover?"
        rows={3}
      />
    </div>
  )
}

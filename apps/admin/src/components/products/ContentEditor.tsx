import type { GuideContent } from '@life-axe/services'
import { ContentSection } from './ContentSection'
import { EmptyState } from '@life-axe/ui'
import { Sparkles } from 'lucide-react'

interface ContentEditorProps {
  content: GuideContent | null
  onChange: (content: GuideContent) => void
  onRequestGenerate: () => void
}

const sectionOrder = [
  'intro',
  'key_takeaways',
  'chapter_1',
  'chapter_2',
  'chapter_3',
  'checklist',
  'cheat_sheet',
  'next_steps',
] as const

export function ContentEditor({
  content,
  onChange,
  onRequestGenerate,
}: ContentEditorProps) {
  if (!content) {
    return (
      <EmptyState
        icon={<Sparkles className="w-6 h-6 text-accent" />}
        title="No content yet"
        description="Generate guide content with AI to start editing."
        actionLabel="Generate Content"
        onAction={onRequestGenerate}
      />
    )
  }

  function handleSectionChange(key: string, value: unknown) {
    if (!content) return
    onChange({ ...content, [key]: value })
  }

  return (
    <div className="space-y-3">
      {sectionOrder.map((key) => (
        <ContentSection
          key={key}
          label={key}
          sectionKey={key}
          value={(content as Record<string, unknown>)[key]}
          onChange={handleSectionChange}
        />
      ))}
    </div>
  )
}

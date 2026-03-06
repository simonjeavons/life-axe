import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface ContentSectionProps {
  label: string
  sectionKey: string
  value: unknown
  onChange: (key: string, value: unknown) => void
}

const sectionLabels: Record<string, string> = {
  intro: 'Introduction',
  key_takeaways: 'Key Takeaways',
  chapter_1: 'Chapter 1',
  chapter_2: 'Chapter 2',
  chapter_3: 'Chapter 3',
  checklist: 'Checklist',
  cheat_sheet: 'Cheat Sheet',
  next_steps: 'Next Steps',
}

export function ContentSection({
  label,
  sectionKey,
  value,
  onChange,
}: ContentSectionProps) {
  const [expanded, setExpanded] = useState(true)
  const section = value as Record<string, unknown> | undefined

  if (!section) return null

  const title = (section.title as string) || ''
  const body = (section.body as string) || ''
  const items = (section.items as unknown[]) || []

  function updateField(field: string, newValue: unknown) {
    onChange(sectionKey, { ...section, [field]: newValue })
  }

  return (
    <div className="border border-[rgba(255,255,255,0.06)] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-2.5 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors text-left cursor-pointer"
      >
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-foreground-muted" />
        )}
        <span className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider">
          {sectionLabels[sectionKey] || label}
        </span>
      </button>

      {expanded && (
        <div className="p-4 space-y-3">
          {/* Title field */}
          <input
            type="text"
            value={title}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-3 py-1.5 rounded-md bg-input border border-input-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
            placeholder="Section title"
          />

          {/* Body field (for sections with body) */}
          {typeof body === 'string' && sectionKey !== 'key_takeaways' && sectionKey !== 'checklist' && sectionKey !== 'cheat_sheet' && (
            <textarea
              value={body}
              onChange={(e) => updateField('body', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 rounded-md bg-input border border-input-border text-sm text-foreground-secondary focus:outline-none focus:ring-1 focus:ring-accent/50 resize-y"
              placeholder="Section content..."
            />
          )}

          {/* Items list (for takeaways, checklist) */}
          {Array.isArray(items) && items.length > 0 && typeof items[0] === 'string' && (
            <div className="space-y-1.5">
              {(items as string[]).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-xs text-foreground-muted mt-2 w-5 text-right shrink-0">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...items] as string[]
                      newItems[idx] = e.target.value
                      updateField('items', newItems)
                    }}
                    className="flex-1 px-3 py-1.5 rounded-md bg-input border border-input-border text-sm text-foreground-secondary focus:outline-none focus:ring-1 focus:ring-accent/50"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Cheat sheet items (term/definition pairs) */}
          {Array.isArray(items) && items.length > 0 && typeof items[0] === 'object' && items[0] !== null && 'term' in (items[0] as object) && (
            <div className="space-y-2">
              {(items as { term: string; definition: string }[]).map(
                (item, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_2fr] gap-2">
                    <input
                      type="text"
                      value={item.term}
                      onChange={(e) => {
                        const newItems = [...items] as { term: string; definition: string }[]
                        newItems[idx] = { ...newItems[idx], term: e.target.value }
                        updateField('items', newItems)
                      }}
                      className="px-3 py-1.5 rounded-md bg-input border border-input-border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
                      placeholder="Term"
                    />
                    <input
                      type="text"
                      value={item.definition}
                      onChange={(e) => {
                        const newItems = [...items] as { term: string; definition: string }[]
                        newItems[idx] = { ...newItems[idx], definition: e.target.value }
                        updateField('items', newItems)
                      }}
                      className="px-3 py-1.5 rounded-md bg-input border border-input-border text-sm text-foreground-secondary focus:outline-none focus:ring-1 focus:ring-accent/50"
                      placeholder="Definition"
                    />
                  </div>
                )
              )}
            </div>
          )}

          {/* Highlights (for chapters) */}
          {section.highlights && Array.isArray(section.highlights) && (
            <div className="space-y-1.5 pt-2 border-t border-[rgba(255,255,255,0.06)]">
              <p className="text-xs text-foreground-muted font-medium">
                Highlights
              </p>
              {(section.highlights as string[]).map((h, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={h}
                  onChange={(e) => {
                    const newHighlights = [...(section.highlights as string[])]
                    newHighlights[idx] = e.target.value
                    updateField('highlights', newHighlights)
                  }}
                  className="w-full px-3 py-1.5 rounded-md bg-input border border-input-border text-sm text-foreground-secondary focus:outline-none focus:ring-1 focus:ring-accent/50"
                />
              ))}
            </div>
          )}

          {/* CTA for next_steps */}
          {sectionKey === 'next_steps' && section.cta && (
            <input
              type="text"
              value={section.cta as string}
              onChange={(e) => updateField('cta', e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-accent/5 border border-accent/20 text-sm text-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
              placeholder="Call to action text"
            />
          )}
        </div>
      )}
    </div>
  )
}

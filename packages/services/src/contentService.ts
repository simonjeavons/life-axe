import type { LLMProvider } from '@life-axe/providers'
import type { GuideContent, GenerateContentInput } from './types'

export class ContentService {
  constructor(private llm: LLMProvider) {}

  async generateGuideContent(
    input: GenerateContentInput
  ): Promise<GuideContent> {
    const prompt = this.buildPrompt(input)
    const systemPrompt = this.getSystemPrompt()
    const response = await this.llm.generateStructuredContent(
      prompt,
      systemPrompt
    )
    return this.validateContent(response.content)
  }

  private getSystemPrompt(): string {
    return `You are a professional digital guide content creator. You produce high-quality, actionable, well-structured educational content.

You must respond with ONLY valid JSON — no markdown, no code blocks, no explanation. Just the raw JSON object.

The JSON must match this exact structure:
{
  "cover_title": "string",
  "cover_subtitle": "string",
  "intro": { "title": "string", "body": "string (2-3 paragraphs)" },
  "key_takeaways": { "title": "string", "items": ["string (5-7 items)"] },
  "chapter_1": { "title": "string", "body": "string (3-4 paragraphs)", "highlights": ["string (2-3 items)"] },
  "chapter_2": { "title": "string", "body": "string (3-4 paragraphs)", "highlights": ["string (2-3 items)"] },
  "chapter_3": { "title": "string", "body": "string (3-4 paragraphs)", "highlights": ["string (2-3 items)"] },
  "checklist": { "title": "string", "items": ["string (8-12 items)"] },
  "cheat_sheet": { "title": "string", "items": [{ "term": "string", "definition": "string" }] },
  "next_steps": { "title": "string", "body": "string (1-2 paragraphs)", "cta": "string" }
}

Make the content practical, specific, and actionable. Avoid filler content. Write as if the reader paid for this guide.`
  }

  private buildPrompt(input: GenerateContentInput): string {
    const parts = [
      `Create a complete digital guide about: "${input.title}"`,
    ]

    if (input.subtitle) parts.push(`Subtitle: ${input.subtitle}`)
    if (input.audience) parts.push(`Target audience: ${input.audience}`)
    if (input.tone) parts.push(`Tone: ${input.tone}`)
    if (input.difficulty) parts.push(`Difficulty level: ${input.difficulty}`)
    if (input.category) parts.push(`Category: ${input.category}`)
    if (input.shortDescription)
      parts.push(`Description: ${input.shortDescription}`)

    parts.push(
      '\nGenerate the full guide content as a JSON object matching the required structure.'
    )

    return parts.join('\n')
  }

  private validateContent(content: unknown): GuideContent {
    const c = content as Record<string, unknown>

    // Basic structure validation
    const requiredKeys = [
      'cover_title',
      'cover_subtitle',
      'intro',
      'key_takeaways',
      'chapter_1',
      'chapter_2',
      'chapter_3',
      'checklist',
      'cheat_sheet',
      'next_steps',
    ]

    for (const key of requiredKeys) {
      if (!(key in c)) {
        throw new Error(`Missing required key in guide content: ${key}`)
      }
    }

    return content as GuideContent
  }
}

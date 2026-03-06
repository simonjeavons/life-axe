import Anthropic from '@anthropic-ai/sdk'
import type { LLMProvider, LLMResponse, LLMConfig } from './types'

export class ClaudeProvider implements LLMProvider {
  private client: Anthropic
  private model: string
  private maxTokens: number

  constructor(config: LLMConfig) {
    this.client = new Anthropic({ apiKey: config.apiKey })
    this.model = config.model
    this.maxTokens = config.maxTokens ?? 8192
  }

  async generateStructuredContent(
    prompt: string,
    systemPrompt?: string
  ): Promise<LLMResponse> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text response from Claude')
    }

    // Extract JSON from the response (handle markdown code blocks)
    let jsonStr = textBlock.text
    const jsonMatch = jsonStr.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
    if (jsonMatch) {
      jsonStr = jsonMatch[1]
    }

    const parsed = JSON.parse(jsonStr)

    return {
      content: parsed,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
      model: response.model,
    }
  }
}

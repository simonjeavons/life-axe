export interface LLMProvider {
  generateStructuredContent(
    prompt: string,
    systemPrompt?: string
  ): Promise<LLMResponse>
}

export interface LLMResponse {
  content: unknown
  usage: { inputTokens: number; outputTokens: number }
  model: string
}

export interface LLMConfig {
  provider: 'claude'
  apiKey: string
  model: string
  maxTokens?: number
  temperature?: number
}

import type { LLMConfig, LLMProvider } from './types'
import { ClaudeProvider } from './claudeProvider'

export function createLLMProvider(config: LLMConfig): LLMProvider {
  switch (config.provider) {
    case 'claude':
      return new ClaudeProvider(config)
    default:
      throw new Error(`Unknown LLM provider: ${config.provider}`)
  }
}

export type { LLMProvider, LLMResponse, LLMConfig } from './types'

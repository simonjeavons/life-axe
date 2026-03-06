import { supabase } from './supabase'
import type { GuideContent, GenerateContentInput } from '@life-axe/services'

export async function generateGuideContent(
  input: GenerateContentInput
): Promise<GuideContent> {
  const { data, error } = await supabase.functions.invoke('generate-content', {
    body: input,
  })

  if (error) throw new Error(error.message || 'Content generation failed')
  return data as GuideContent
}

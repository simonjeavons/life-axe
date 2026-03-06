export interface GuideContent {
  cover_title: string
  cover_subtitle: string
  intro: {
    title: string
    body: string
  }
  key_takeaways: {
    title: string
    items: string[]
  }
  chapter_1: {
    title: string
    body: string
    highlights?: string[]
  }
  chapter_2: {
    title: string
    body: string
    highlights?: string[]
  }
  chapter_3: {
    title: string
    body: string
    highlights?: string[]
  }
  checklist: {
    title: string
    items: string[]
  }
  cheat_sheet: {
    title: string
    items: { term: string; definition: string }[]
  }
  next_steps: {
    title: string
    body: string
    cta?: string
  }
}

export interface GenerateContentInput {
  title: string
  subtitle?: string
  category?: string
  audience?: string
  tone?: string
  difficulty?: string
  shortDescription?: string
}

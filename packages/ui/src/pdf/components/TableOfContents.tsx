import { Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from '../styles'
import type { GuideContent } from '@life-axe/services'

interface TableOfContentsProps {
  content: GuideContent
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const items = [
    content.intro.title,
    'Key Takeaways',
    content.chapter_1.title,
    content.chapter_2.title,
    content.chapter_3.title,
    content.checklist.title,
    content.cheat_sheet.title,
    content.next_steps.title,
  ]

  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.sectionTitle}>Table of Contents</Text>
      <View style={{ marginTop: 12 }}>
        {items.map((item, idx) => (
          <View key={idx} style={pdfStyles.tocItem}>
            <Text style={pdfStyles.tocText}>{item}</Text>
            <Text style={{ ...pdfStyles.tocText, color: '#999999' }}>
              {idx + 2}
            </Text>
          </View>
        ))}
      </View>
      <Text style={pdfStyles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
    </Page>
  )
}

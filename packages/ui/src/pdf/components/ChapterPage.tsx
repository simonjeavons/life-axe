import { Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from '../styles'

interface ChapterPageProps {
  title: string
  body: string
  highlights?: string[]
}

export function ChapterPage({ title, body, highlights }: ChapterPageProps) {
  const paragraphs = body.split('\n\n').filter(Boolean)

  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.chapterTitle}>{title}</Text>
      {paragraphs.map((p, idx) => (
        <Text key={idx} style={pdfStyles.body}>
          {p}
        </Text>
      ))}
      {highlights && highlights.length > 0 && (
        <View style={pdfStyles.highlightBox}>
          {highlights.map((h, idx) => (
            <View key={idx} style={pdfStyles.listItem}>
              <Text style={pdfStyles.listBullet}>•</Text>
              <Text style={pdfStyles.highlightText}>{h}</Text>
            </View>
          ))}
        </View>
      )}
      <Text style={pdfStyles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
    </Page>
  )
}

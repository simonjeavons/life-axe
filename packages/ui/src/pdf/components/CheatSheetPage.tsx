import { Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from '../styles'

interface CheatSheetPageProps {
  title: string
  items: { term: string; definition: string }[]
}

export function CheatSheetPage({ title, items }: CheatSheetPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <View style={{ marginTop: 8 }}>
        {items.map((item, idx) => (
          <View key={idx} style={pdfStyles.termRow}>
            <Text style={pdfStyles.term}>{item.term}</Text>
            <Text style={pdfStyles.definition}>{item.definition}</Text>
          </View>
        ))}
      </View>
      <Text style={pdfStyles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
    </Page>
  )
}

import { Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from '../styles'

interface ChecklistPageProps {
  title: string
  items: string[]
}

export function ChecklistPage({ title, items }: ChecklistPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <View style={{ marginTop: 8 }}>
        {items.map((item, idx) => (
          <View key={idx} style={pdfStyles.checkItem}>
            <View style={pdfStyles.checkBox} />
            <Text style={pdfStyles.checkText}>{item}</Text>
          </View>
        ))}
      </View>
      <Text style={pdfStyles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
    </Page>
  )
}

import { Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from '../styles'

interface CTAPageProps {
  title: string
  body: string
  cta?: string
}

export function CTAPage({ title, body, cta }: CTAPageProps) {
  return (
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <Text style={pdfStyles.body}>{body}</Text>
      {cta && (
        <View style={pdfStyles.ctaBox}>
          <Text style={pdfStyles.ctaTitle}>Ready to Take Action?</Text>
          <Text style={pdfStyles.ctaText}>{cta}</Text>
          <View style={pdfStyles.ctaButton}>
            <Text style={pdfStyles.ctaButtonText}>Get Started</Text>
          </View>
        </View>
      )}
      <Text style={pdfStyles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
    </Page>
  )
}

import { Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles, colors } from '../styles'

interface CoverPageProps {
  title: string
  subtitle?: string
}

export function CoverPage({ title, subtitle }: CoverPageProps) {
  return (
    <Page size="A4" style={pdfStyles.coverPage}>
      <View style={{ alignItems: 'center', padding: 60 }}>
        <Text style={pdfStyles.coverBrand}>LIFEAXE</Text>
        <View
          style={{
            width: 40,
            height: 3,
            backgroundColor: colors.accent,
            marginVertical: 24,
          }}
        />
        <Text style={pdfStyles.coverTitle}>{title}</Text>
        {subtitle && <Text style={pdfStyles.coverSubtitle}>{subtitle}</Text>}
      </View>
    </Page>
  )
}

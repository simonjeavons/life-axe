import { Document, Page, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from './styles'
import { CoverPage } from './components/CoverPage'
import { TableOfContents } from './components/TableOfContents'
import { ChapterPage } from './components/ChapterPage'
import { ChecklistPage } from './components/ChecklistPage'
import { CheatSheetPage } from './components/CheatSheetPage'
import { CTAPage } from './components/CTAPage'
import type { GuideContent } from '@life-axe/services'

interface LifeAxeClassicPDFProps {
  product: {
    title: string
    subtitle?: string
  }
  content: GuideContent
}

export function LifeAxeClassicPDF({
  product,
  content,
}: LifeAxeClassicPDFProps) {
  return (
    <Document title={product.title} author="LifeAxe">
      {/* Cover */}
      <CoverPage
        title={content.cover_title || product.title}
        subtitle={content.cover_subtitle || product.subtitle}
      />

      {/* Table of Contents */}
      <TableOfContents content={content} />

      {/* Introduction */}
      <ChapterPage title={content.intro.title} body={content.intro.body} />

      {/* Key Takeaways */}
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.sectionTitle}>
          {content.key_takeaways.title}
        </Text>
        <View style={{ marginTop: 8 }}>
          {content.key_takeaways.items.map((item, idx) => (
            <View key={idx} style={pdfStyles.listItem}>
              <Text style={pdfStyles.listBullet}>•</Text>
              <Text style={pdfStyles.listText}>{item}</Text>
            </View>
          ))}
        </View>
        <Text
          style={pdfStyles.pageNumber}
          render={({ pageNumber }) => `${pageNumber}`}
          fixed
        />
      </Page>

      {/* Chapters */}
      <ChapterPage
        title={content.chapter_1.title}
        body={content.chapter_1.body}
        highlights={content.chapter_1.highlights}
      />
      <ChapterPage
        title={content.chapter_2.title}
        body={content.chapter_2.body}
        highlights={content.chapter_2.highlights}
      />
      <ChapterPage
        title={content.chapter_3.title}
        body={content.chapter_3.body}
        highlights={content.chapter_3.highlights}
      />

      {/* Checklist */}
      <ChecklistPage
        title={content.checklist.title}
        items={content.checklist.items}
      />

      {/* Cheat Sheet */}
      <CheatSheetPage
        title={content.cheat_sheet.title}
        items={content.cheat_sheet.items}
      />

      {/* Next Steps + CTA */}
      <CTAPage
        title={content.next_steps.title}
        body={content.next_steps.body}
        cta={content.next_steps.cta}
      />
    </Document>
  )
}

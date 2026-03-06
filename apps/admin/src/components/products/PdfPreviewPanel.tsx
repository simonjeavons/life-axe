import { Button, Card } from '@life-axe/ui'
import { Download, FileDown, FileText, Check } from 'lucide-react'

interface PdfPreviewPanelProps {
  pdfUrl: string | null
  status: string
  isGenerating: boolean
  onGenerate: () => void
}

export function PdfPreviewPanel({
  pdfUrl,
  status,
  isGenerating,
  onGenerate,
}: PdfPreviewPanelProps) {
  const hasPdf = !!pdfUrl
  const hasContent =
    status === 'CONTENT_GENERATED' || status === 'PDF_GENERATED'

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider mb-3">
          PDF Output
        </h3>
      </div>

      {/* Status Card */}
      <Card padding="sm">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              hasPdf
                ? 'bg-success/10'
                : hasContent
                  ? 'bg-accent/10'
                  : 'bg-[rgba(255,255,255,0.06)]'
            }`}
          >
            {hasPdf ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <FileText className="w-4 h-4 text-foreground-muted" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {hasPdf
                ? 'PDF Ready'
                : hasContent
                  ? 'Ready to Generate'
                  : 'Generate content first'}
            </p>
            <p className="text-xs text-foreground-muted">
              {hasPdf
                ? 'Your branded PDF is available'
                : hasContent
                  ? 'Content is ready for PDF generation'
                  : 'Content must be generated before creating a PDF'}
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-2">
        {hasContent && (
          <Button
            variant={hasPdf ? 'secondary' : 'primary'}
            className="w-full"
            state={isGenerating ? 'loading' : 'idle'}
            onClick={onGenerate}
            icon={<FileDown className="w-4 h-4" />}
          >
            {hasPdf ? 'Regenerate PDF' : 'Generate PDF'}
          </Button>
        )}

        {hasPdf && (
          <a
            href={pdfUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="primary"
              className="w-full"
              icon={<Download className="w-4 h-4" />}
            >
              Download PDF
            </Button>
          </a>
        )}
      </div>

      {/* Preview placeholder */}
      {hasPdf && (
        <Card padding="sm">
          <div className="aspect-[3/4] bg-[rgba(255,255,255,0.03)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-8 h-8 text-foreground-muted mx-auto mb-2" />
              <p className="text-xs text-foreground-muted">PDF Preview</p>
              <p className="text-[10px] text-foreground-muted/60 mt-0.5">
                Open to view full document
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

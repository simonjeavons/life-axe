import React from 'react'

type BadgeVariant = 'default' | 'draft' | 'content_generated' | 'pdf_generated' | 'archived'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[rgba(255,255,255,0.08)] text-foreground-secondary',
  draft: 'bg-[rgba(255,255,255,0.08)] text-foreground-muted',
  content_generated: 'bg-accent/15 text-accent',
  pdf_generated: 'bg-success/15 text-success',
  archived: 'bg-error/10 text-foreground-muted',
}

const labels: Record<string, string> = {
  DRAFT: 'Draft',
  CONTENT_GENERATED: 'Content Ready',
  PDF_GENERATED: 'PDF Ready',
  ARCHIVED: 'Archived',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const variant = status.toLowerCase() as BadgeVariant
  return <Badge variant={variant}>{labels[status] || status}</Badge>
}

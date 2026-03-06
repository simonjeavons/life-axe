import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  return (
    <div
      className={`bg-panel border border-[rgba(255,255,255,0.08)] rounded-xl ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  )
}

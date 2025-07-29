import { ReactNode } from 'react'

interface HighlightedTextProps {
  children: ReactNode
  variant?: 'blue' | 'green' | 'yellow' | 'purple' | 'pink'
  className?: string
}

export default function HighlightedText({
  children,
  variant = 'blue',
  className = '',
}: HighlightedTextProps) {
  const variantStyles = {
    blue: 'bg-blue-400/20 text-blue-900 dark:text-blue-100',
    green: 'bg-green-400/20 text-green-900 dark:text-green-100',
    yellow: 'bg-yellow-400/20 text-yellow-900 dark:text-yellow-100',
    purple: 'bg-purple-400/20 text-purple-900 dark:text-purple-100',
    pink: 'bg-pink-400/20 text-pink-900 dark:text-pink-100',
  }

  return (
    <span className={`rounded-xs px-[1px] ${variantStyles[variant]} ${className}`}>{children}</span>
  )
}

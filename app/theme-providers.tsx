'use client'

import { ThemeProvider } from 'next-themes' // 这是next-themes的组件
import siteMetadata from '@/data/siteMetadata' // 这是网站的元数据

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}

import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk } from 'next/font/google' // 谷歌字体
import { Analytics, AnalyticsConfig } from 'pliny/analytics' // 这是pliny的分析
import { SearchProvider, SearchConfig } from 'pliny/search' // 这是pliny的搜索
import Header from '@/components/Header' // 这是头部的组件
import SectionContainer from '@/components/SectionContainer' // 这是section的组件
import Footer from '@/components/Footer' // 这是底部的组件
import siteMetadata from '@/data/siteMetadata' // 这是网站的元数据
import { ThemeProviders } from './theme-providers' // 这是主题的组件
import { Metadata } from 'next' // 这是next的元数据

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />

      {/* Zed 风格双模式设计：浅色和深色模式的精确背景色 */}
      <body className="bg-[#e8eaf6] pl-[calc(100vw-100%)] text-black antialiased dark:bg-neutral-950 dark:text-white">
        <div
          className="relative min-h-screen bg-inherit dark:bg-neutral-950"
          style={{
            backgroundColor: 'inherit', // 浅色模式继承
          }}
        >
          {/* Zed 风格装饰线 - 减少边距，位于卡片和边界中间 */}
          <div
            className="fixed inset-y-0 left-3 z-30 w-0.5 lg:left-4"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
              opacity: 0.5,
            }}
          />
          <div
            className="fixed inset-y-0 right-3 z-30 w-0.5 lg:right-4"
            style={{
              background: 'linear-gradient(to bottom, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
              opacity: 0.5,
            }}
          />

          {/* 深色模式装饰线 - 减少边距，位于卡片和边界中间 */}
          <div
            className="fixed inset-y-0 left-3 z-30 hidden w-0.5 lg:left-4 dark:block"
            style={{
              background: 'linear-gradient(to bottom, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
              opacity: 0.6,
            }}
          />
          <div
            className="fixed inset-y-0 right-3 z-30 hidden w-0.5 lg:right-4 dark:block"
            style={{
              background: 'linear-gradient(to bottom, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
              opacity: 0.6,
            }}
          />

          {/* 内容区域边界 - 双模式支持 */}
          <div
            className="fixed inset-y-0 left-4 z-20 hidden w-px lg:block dark:hidden"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.25)',
            }}
          />
          <div
            className="fixed inset-y-0 right-4 z-20 hidden w-px lg:block dark:hidden"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.25)',
            }}
          />

          {/* 深色模式内容边界 */}
          <div
            className="fixed inset-y-0 left-4 z-20 hidden w-px dark:lg:block"
            style={{
              backgroundColor: 'rgba(96, 165, 250, 0.3)',
            }}
          />
          <div
            className="fixed inset-y-0 right-4 z-20 hidden w-px dark:lg:block"
            style={{
              backgroundColor: 'rgba(96, 165, 250, 0.3)',
            }}
          />

          <ThemeProviders>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            {/* 由于导航栏现在总是固定的，需要固定的顶部间距 */}
            <div className="pt-16">
              <SectionContainer>
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                  <Header />
                  <main className="mb-auto">{children}</main>
                </SearchProvider>
                <Footer />
              </SectionContainer>
            </div>
          </ThemeProviders>
        </div>
      </body>
    </html>
  )
}

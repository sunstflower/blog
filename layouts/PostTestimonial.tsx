import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostTestimonial({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="mx-auto max-w-5xl">
        {/* Main Testimonial Card - Zed Style */}
        <div className="relative mb-8 flex w-full flex-col rounded-sm border border-gray-200/50 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-6 pb-6 pt-6 shadow-lg dark:border-gray-600/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
          {/* Brand/Logo Section */}
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                <span className="text-xl font-bold text-white">{siteMetadata.title.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {siteMetadata.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(date, siteMetadata.locale)}
                </p>
              </div>
            </div>
          </div>

          {/* Main Quote Content */}
          <blockquote className="relative mb-6 text-[0.9375rem] tracking-tight text-gray-900 dark:text-white">
            <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 dark:text-white md:text-3xl">
              {title}
            </h1>
            {content.summary && (
              <p className="mb-0 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {content.summary}{' '}
                <span className="ml-1 rounded-xs bg-blue-400/20 px-[1px]">
                  高质量的内容和深刻的见解。
                </span>
              </p>
            )}
          </blockquote>

          {/* Author Section */}
          <div className="mt-auto flex items-center gap-4">
            {authorDetails.map((author) => (
              <div key={author.name} className="flex items-center gap-4">
                <div className="flex size-[36px] shrink-0 items-center justify-center rounded-sm bg-blue-100 p-0.5 outline-1 outline-blue-300 dark:bg-blue-100/20 dark:outline-blue-300/50">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={`${author.name}'s picture`}
                      width={32}
                      height={32}
                      className="size-[32px] rounded-xs"
                    />
                  ) : (
                    <div className="flex size-[32px] items-center justify-center rounded-xs bg-blue-600 text-sm font-semibold text-white">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="-ml-[1.3px] text-sm font-medium tracking-tight text-black dark:text-gray-100">
                    {author.name}
                  </p>
                  <p className="text-[0.6875rem] text-gray-700 dark:text-gray-300">
                    {author.occupation || 'Author'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Geometric Pattern Background */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full opacity-20 dark:opacity-10"
            style={{ zIndex: -1 }}
          >
            <defs>
              <pattern
                id="zed-pattern"
                width="13"
                height="13"
                patternUnits="userSpaceOnUse"
                x="-1"
                y="-1"
              >
                <path
                  d="M.5 13V.5H13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="0"
                  className="stroke-blue-500/50 dark:stroke-gray-400/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#zed-pattern)" />
          </svg>
        </div>

        {/* Main Content Area */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Article Content */}
          <div className="lg:col-span-4">
            <div className="prose prose-lg max-w-none rounded-lg border border-gray-200/50 bg-white p-8 shadow-sm dark:prose-invert dark:border-gray-700/50 dark:bg-gray-900 lg:p-12">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="rounded-lg border border-gray-200/50 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="rounded-lg border border-gray-200/50 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  导航
                </h3>
                <div className="space-y-3">
                  {prev && prev.path && (
                    <div>
                      <Link
                        href={`/${prev.path}`}
                        className="text-sm text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        ← {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div>
                      <Link
                        href={`/${next.path}`}
                        className="text-sm text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {next.title} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Share Section */}
              <div className="rounded-lg border border-gray-200/50 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-900">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  分享与讨论
                </h3>
                <div className="space-y-2">
                  <Link
                    href={discussUrl(path)}
                    rel="nofollow"
                    className="block text-sm text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    在 Twitter 上讨论
                  </Link>
                  {siteMetadata.siteRepo && (
                    <Link
                      href={editUrl(filePath)}
                      className="block text-sm text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      在 GitHub 上编辑
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200/50 py-8 text-center dark:border-gray-700/50">
          <Link
            href={`/${basePath}`}
            className="inline-flex items-center font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            aria-label="Back to the blog"
          >
            ← 返回博客
          </Link>
        </div>

        {/* Comments */}
        <div className="pb-6 pt-6">
          <Comments slug={slug} />
        </div>
      </article>
    </SectionContainer>
  )
}

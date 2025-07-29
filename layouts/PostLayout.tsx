import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
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

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-neutral-200/30 xl:dark:divide-neutral-700/30">
          {/* Header Section */}
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-neutral-500 dark:text-neutral-500">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid-rows-[auto_1fr] divide-y divide-neutral-200/30 pb-8 dark:divide-neutral-700/30 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            {/* Sidebar */}
            <div className="divide-y divide-neutral-200/30 dark:divide-neutral-700/30 xl:col-span-1 xl:row-span-2 xl:pb-0">
              <div className="sticky top-20 rounded-xl border border-neutral-200/50 p-6 shadow-sm dark:border-neutral-700/50">
                <div className="relative">
                  {/* 浅色模式背景 */}
                  <div
                    className="absolute inset-0 rounded-xl dark:hidden"
                    style={{
                      backgroundColor: '#fafbfc',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    }}
                  />

                  {/* 深色模式背景 */}
                  <div
                    className="absolute inset-0 hidden rounded-xl dark:block"
                    style={{
                      backgroundColor: '#171717',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                    }}
                  />

                  <div className="relative z-10">
                    {/* Author Info */}
                    {authorDetails.length === 1 ? (
                      <dl>
                        <dt className="sr-only">Author</dt>
                        <dd>
                          <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-6">
                            {authorDetails.map((author) => (
                              <li className="flex items-center space-x-2" key={author.name}>
                                {author.avatar && (
                                  <Image
                                    src={author.avatar}
                                    width={38}
                                    height={38}
                                    alt="avatar"
                                    className="h-10 w-10 rounded-full"
                                  />
                                )}
                                <dl className="whitespace-nowrap text-sm font-medium leading-5">
                                  <dt className="sr-only">Name</dt>
                                  <dd className="text-neutral-900 dark:text-neutral-100">
                                    {author.name}
                                  </dd>
                                  {author.twitter && <dt className="sr-only">Twitter</dt>}
                                  {author.twitter && (
                                    <dd>
                                      <Link
                                        href={author.twitter}
                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                      >
                                        {author.twitter.replace('https://twitter.com/', '@')}
                                      </Link>
                                    </dd>
                                  )}
                                </dl>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </dl>
                    ) : (
                      <dl>
                        <dt className="sr-only">Authors</dt>
                        <dd>
                          <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-6">
                            {authorDetails.map((author) => (
                              <li className="flex items-center space-x-2" key={author.name}>
                                {author.avatar && (
                                  <Image
                                    src={author.avatar}
                                    width={38}
                                    height={38}
                                    alt="avatar"
                                    className="h-10 w-10 rounded-full"
                                  />
                                )}
                                <dl className="whitespace-nowrap text-sm font-medium leading-5">
                                  <dt className="sr-only">Name</dt>
                                  <dd className="text-neutral-900 dark:text-neutral-100">
                                    {author.name}
                                  </dd>
                                  {author.twitter && <dt className="sr-only">Twitter</dt>}
                                  {author.twitter && (
                                    <dd>
                                      <Link
                                        href={author.twitter}
                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                      >
                                        {author.twitter.replace('https://twitter.com/', '@')}
                                      </Link>
                                    </dd>
                                  )}
                                </dl>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </dl>
                    )}

                    {/* Tags */}
                    {tags && (
                      <div className="mt-6 border-t border-neutral-200/30 pt-6 dark:border-neutral-700/30">
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-6 border-t border-neutral-200/30 pt-6 dark:border-neutral-700/30">
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                        Navigation
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
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="xl:col-span-3 xl:row-span-2 xl:pl-6">
              <div className="prose prose-lg relative max-w-none rounded-xl border border-neutral-200/50 p-8 pb-8 pt-10 shadow-sm dark:prose-invert dark:border-neutral-700/50 lg:p-12">
                {/* 浅色模式背景 */}
                <div
                  className="absolute inset-0 rounded-xl dark:hidden"
                  style={{
                    backgroundColor: '#fafbfc',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                />

                {/* 深色模式背景 */}
                <div
                  className="absolute inset-0 hidden rounded-xl dark:block"
                  style={{
                    backgroundColor: '#171717',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                />

                <div className="relative z-10">{children}</div>
              </div>

              {/* Footer Navigation */}
              <footer className="relative mt-8 rounded-xl border border-neutral-200/50 p-6 shadow-sm dark:border-neutral-700/50">
                {/* 浅色模式背景 */}
                <div
                  className="absolute inset-0 rounded-xl dark:hidden"
                  style={{
                    backgroundColor: '#fafbfc',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  }}
                />

                {/* 深色模式背景 */}
                <div
                  className="absolute inset-0 hidden rounded-xl dark:block"
                  style={{
                    backgroundColor: '#171717',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                />

                <div className="relative z-10 divide-neutral-200/30 text-sm font-medium leading-5 dark:divide-neutral-700/30 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  <div className="py-4 xl:py-8">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                      Share & Discuss
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={discussUrl(path)}
                        rel="nofollow"
                        className="text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Discuss on Twitter
                      </Link>
                      {siteMetadata.siteRepo && (
                        <Link
                          href={editUrl(filePath)}
                          className="text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit on GitHub
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4 xl:pt-8">
                    <Link
                      href={`/${basePath}`}
                      className="font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="Back to the blog"
                    >
                      ← Back to the blog
                    </Link>
                  </div>
                </div>
              </footer>

              <div className="pb-6 pt-6 text-sm text-neutral-700 dark:text-neutral-300">
                <Comments slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

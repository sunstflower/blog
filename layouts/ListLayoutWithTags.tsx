'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="relative cursor-auto rounded-full border border-neutral-200/50 px-6 py-3 text-neutral-500 disabled:opacity-50 dark:border-neutral-700/50 dark:text-neutral-500"
            disabled
          >
            {/* 浅色模式背景 */}
            <div
              className="absolute inset-0 rounded-full dark:hidden"
              style={{
                backgroundColor: '#fafbfc',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            />

            {/* 深色模式背景 */}
            <div
              className="absolute inset-0 hidden rounded-full dark:block"
              style={{
                backgroundColor: '#171717',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            />

            <span className="relative z-10">Previous</span>
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="relative rounded-full border border-neutral-200/50 px-6 py-3 text-neutral-700 transition-colors duration-150 hover:text-neutral-900 hover:shadow-sm dark:border-neutral-700/50 dark:text-neutral-300 dark:hover:text-neutral-100"
          >
            {/* 浅色模式背景 */}
            <div
              className="absolute inset-0 rounded-full dark:hidden"
              style={{
                backgroundColor: '#fafbfc',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            />

            {/* 深色模式背景 */}
            <div
              className="absolute inset-0 hidden rounded-full dark:block"
              style={{
                backgroundColor: '#171717',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            />

            <span className="relative z-10">Previous</span>
          </Link>
        )}
        <span className="flex items-center text-neutral-600 dark:text-neutral-400">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="relative cursor-auto rounded-full border border-neutral-200/50 px-6 py-3 text-neutral-500 disabled:opacity-50 dark:border-neutral-700/50 dark:text-neutral-500"
            disabled
          >
            {/* 浅色模式背景 */}
            <div
              className="absolute inset-0 rounded-full dark:hidden"
              style={{
                backgroundColor: '#fafbfc',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            />

            {/* 深色模式背景 */}
            <div
              className="absolute inset-0 hidden rounded-full dark:block"
              style={{
                backgroundColor: '#171717',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            />

            <span className="relative z-10">Next</span>
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="relative rounded-full border border-neutral-200/50 px-6 py-3 text-neutral-700 transition-colors duration-150 hover:text-neutral-900 hover:shadow-sm dark:border-neutral-700/50 dark:text-neutral-300 dark:hover:text-neutral-100"
          >
            {/* 浅色模式背景 */}
            <div
              className="absolute inset-0 rounded-full dark:hidden"
              style={{
                backgroundColor: '#fafbfc',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            />

            {/* 深色模式背景 */}
            <div
              className="absolute inset-0 hidden rounded-full dark:block"
              style={{
                backgroundColor: '#171717',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            />

            <span className="relative z-10">Next</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="pt-6 pb-6">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-neutral-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-blue-400">
          {title}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <div className="relative hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-xl border border-neutral-200/50 pt-5 shadow-sm sm:flex dark:border-neutral-700/50">
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

          <div className="relative z-10 w-full px-6 py-4">
            {pathname.startsWith('/blog') ? (
              <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
            ) : (
              <Link
                href={`/blog`}
                className="hover:text-primary-500 dark:hover:text-primary-400 font-bold text-neutral-700 uppercase dark:text-neutral-300"
              >
                All Posts
              </Link>
            )}
            <ul className="mt-4">
              {sortedTags.map((t) => {
                return (
                  <li key={t} className="my-3">
                    {pathname.split('/tags/')[1] === encodeURI(t) ? (
                      <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        href={`/tags/${t}`}
                        className="hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium text-neutral-500 uppercase dark:text-neutral-400"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="w-full">
          <div className="relative max-w-lg pb-8">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-400 relative z-10 block w-full rounded-xl border border-neutral-300/50 px-4 py-3 text-neutral-900 shadow-sm dark:border-neutral-600/50 dark:text-neutral-100"
                style={{
                  backgroundColor: 'transparent',
                }}
              />

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
            </label>
            <svg
              className="absolute top-3 right-3 z-20 h-5 w-5 text-neutral-400 dark:text-neutral-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <ul>
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path} className="mb-8">
                  <article className="group relative rounded-xl border border-neutral-200/50 p-8 transition-all duration-200 hover:border-blue-200/60 hover:shadow-sm dark:border-neutral-700/50 dark:hover:border-blue-400/30 dark:hover:shadow-lg">
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

                    <div className="relative z-10 space-y-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/${path}`}
                              className="text-neutral-900 transition-colors duration-150 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-3 flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-neutral-500 dark:text-neutral-400">
                          {summary}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base leading-6 font-medium text-neutral-500 dark:text-neutral-500">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        <Link
                          href={`/${path}`}
                          className="font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </>
  )
}

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      {/* Hero Section - Zed Style with Dark Mode */}
      <div className="relative py-24 lg:py-32">
        <div className="text-center">
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-neutral-900 lg:text-7xl xl:text-8xl dark:text-blue-400">
            Latest
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-600 lg:text-2xl dark:text-neutral-400">
            {siteMetadata.description}
          </p>
        </div>
      </div>

      {/* Posts Grid - Card Layout with Dark Mode Support */}
      <div className="space-y-20 lg:space-y-24">
        <div className="grid gap-8 lg:gap-12">
          {!posts.length && (
            <div className="relative rounded-xl border border-neutral-200/50 py-20 text-center text-neutral-600 shadow-sm dark:border-neutral-700/50 dark:text-neutral-400">
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

              <p className="relative z-10 text-lg">No posts found.</p>
            </div>
          )}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags } = post
            const isLarge = index === 0

            return (
              <article
                key={slug}
                className={`group relative overflow-hidden rounded-xl border border-neutral-200/50 p-8 transition-all duration-200 hover:border-blue-200/60 hover:shadow-md lg:p-12 dark:border-neutral-700/50 dark:hover:border-blue-400/30 dark:hover:shadow-lg ${
                  isLarge ? 'lg:p-16' : ''
                }`}
              >
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
                  <div className="mb-4">
                    <time
                      dateTime={date}
                      className="text-sm font-medium text-neutral-500 dark:text-neutral-500"
                    >
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>

                  <h2
                    className={`mb-4 font-bold tracking-tight ${
                      isLarge ? 'text-3xl lg:text-4xl xl:text-5xl' : 'text-2xl lg:text-3xl'
                    }`}
                  >
                    <Link
                      href={`/blog/${slug}`}
                      className="text-neutral-900 transition-colors duration-150 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {title}
                    </Link>
                  </h2>

                  {tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  )}

                  <p
                    className={`mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300 ${
                      isLarge ? 'text-lg lg:text-xl' : 'text-base lg:text-lg'
                    }`}
                  >
                    {summary}
                  </p>

                  <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label={`Read more: "${title}"`}
                  >
                    Read more
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {posts.length > MAX_DISPLAY && (
          <div className="py-12 text-center">
            <Link
              href="/blog"
              className="relative inline-flex items-center rounded-full border border-neutral-200/50 px-8 py-4 text-lg font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md dark:border-neutral-700/50"
            >
              {/* 浅色模式背景 */}
              <div
                className="absolute inset-0 rounded-full dark:hidden"
                style={{
                  backgroundColor: '#fafbfc',
                }}
              />

              {/* 深色模式背景 */}
              <div
                className="absolute inset-0 hidden rounded-full dark:block"
                style={{
                  backgroundColor: '#171717',
                }}
              />

              <span className="relative z-10 text-neutral-700 dark:text-neutral-300">
                View All Posts
              </span>
              <svg
                className="relative z-10 ml-2 h-5 w-5 text-neutral-700 dark:text-neutral-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

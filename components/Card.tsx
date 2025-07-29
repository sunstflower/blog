import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div className="h-full rounded-xl border border-neutral-200 bg-white p-6 transition-colors duration-200 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 lg:p-8">
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="mb-6 h-auto w-full rounded-lg object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="mb-6 h-auto w-full rounded-lg object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-blue-400 lg:text-3xl">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="transition-colors duration-150 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 lg:text-lg">
          {description}
        </p>
        {href && (
          <div className="pt-2">
            <Link
              href={href}
              className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              aria-label={`Link to ${title}`}
            >
              Learn more →
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Card

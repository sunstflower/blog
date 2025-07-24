import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="py-12 lg:py-20">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          <SocialIcon kind="medium" href={siteMetadata.medium} size={6} />
        </div>
        <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div>{siteMetadata.author}</div>
          <div>•</div>
          <div>© {new Date().getFullYear()}</div>
          <div>•</div>
          <Link
            href="/"
            className="transition-colors duration-150 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {siteMetadata.title}
          </Link>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-500">
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="transition-colors duration-150 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}

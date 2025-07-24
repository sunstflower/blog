import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  // 固定导航栏，移除原边框样式
  const headerClass = 'fixed top-0 left-0 right-0 z-50 backdrop-blur-xl'

  return (
    <header className={headerClass}>
      {/* 浅色模式背景 */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundColor: 'rgba(232, 234, 246, 0.95)',
        }}
      />

      {/* 深色模式背景 */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
        }}
      />

      {/* 导航栏下边框 - 浅色模式，与主装饰线样式一致 */}
      <div
        className="absolute right-0 bottom-0 left-0 h-0.5 dark:hidden"
        style={{
          background: 'linear-gradient(to right, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
          opacity: 0.5,
        }}
      />

      {/* 导航栏下边框 - 深色模式，与主装饰线样式一致 */}
      <div
        className="absolute right-0 bottom-0 left-0 hidden h-0.5 dark:block"
        style={{
          background: 'linear-gradient(to right, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
          opacity: 0.6,
        }}
      />

      {/* 导航栏装饰线 - 浅色模式，减少边距与主装饰线一致 */}
      <div
        className="absolute inset-y-0 left-3 w-0.5 lg:left-4 dark:hidden"
        style={{
          backgroundColor: '#3b82f6',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute inset-y-0 right-3 w-0.5 lg:right-4 dark:hidden"
        style={{
          backgroundColor: '#3b82f6',
          opacity: 0.4,
        }}
      />

      {/* 导航栏装饰线 - 深色模式，减少边距与主装饰线一致 */}
      <div
        className="absolute inset-y-0 left-3 hidden w-0.5 lg:left-4 dark:block"
        style={{
          backgroundColor: '#60a5fa',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-y-0 right-3 hidden w-0.5 lg:right-4 dark:block"
        style={{
          backgroundColor: '#60a5fa',
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo - 双模式支持，调整与装饰线的距离 */}
          <Link
            href="/"
            aria-label={siteMetadata.headerTitle}
            className="ml-3 flex items-center space-x-2 lg:ml-4"
          >
            <Logo className="h-6 w-6 flex-shrink-0" />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-lg font-bold tracking-tight text-neutral-900 sm:block dark:text-neutral-100">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>

          {/* 中间药丸式导航栏 - 双模式设计 */}
          <div className="relative hidden items-center rounded-full p-1 shadow-sm lg:flex">
            {/* 浅色模式背景 */}
            <div
              className="absolute inset-0 rounded-full dark:hidden"
              style={{
                backgroundColor: 'rgba(250, 251, 252, 0.9)',
                border: '1px solid rgba(147, 197, 253, 0.15)',
              }}
            />

            {/* 深色模式背景 */}
            <div
              className="absolute inset-0 hidden rounded-full dark:block"
              style={{
                backgroundColor: 'rgba(23, 23, 23, 0.9)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
              }}
            />

            <div className="relative z-10 flex items-center">
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => {
                  // 这里可以添加当前页面判断逻辑
                  const isActive = false // 暂时设为 false，可以后续添加路由判断

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-neutral-900 shadow-sm dark:text-neutral-100'
                          : 'text-neutral-600 hover:bg-white/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100'
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundColor: '#fafbfc', // 浅色模式活跃状态
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            }
                          : undefined
                      }
                    >
                      <span className={isActive ? 'dark:hidden' : ''}>{link.title}</span>
                      {isActive && (
                        <span
                          className="hidden dark:inline"
                          style={{
                            backgroundColor: 'rgba(38, 38, 38, 1)',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          {link.title}
                        </span>
                      )}
                    </Link>
                  )
                })}
            </div>
          </div>

          {/* 右侧操作按钮 */}
          <div className="relative z-10 flex items-center space-x-3">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

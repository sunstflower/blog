import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-blue-400 lg:text-5xl xl:text-6xl">
      {children}
    </h1>
  )
}

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-4xl leading-tight font-bold tracking-tight text-neutral-900 lg:text-5xl xl:text-6xl dark:text-blue-400">
      {children}
    </h1>
  )
}

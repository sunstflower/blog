import { ReactNode } from 'react'
//这是section容器，用于包裹内容，并设置最大宽度为6xl，左右边距为6，左右边距为8
interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-6xl px-6 lg:px-8">{children}</section>
}

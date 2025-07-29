import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            项目正在筹备中，敬请期待...
          </p>
        </div>
        <div className="container py-12">
          {projectsData.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                暂无项目
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                我正在准备一些有趣的项目，请稍后再来查看！
              </p>
            </div>
          ) : (
            <div className="-m-4 flex flex-wrap">
              {projectsData.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

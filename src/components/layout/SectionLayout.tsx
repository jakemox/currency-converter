import clsx from 'clsx'
import type { FC, PropsWithChildren, ReactNode } from 'react'

interface SectionLayoutProps {
  className?: string
  container?: boolean
  children: ReactNode
}

const SectionLayout: FC<PropsWithChildren<SectionLayoutProps>> = ({
  className,
  container = true,
  children,
}: SectionLayoutProps) => (
  <section className={clsx(className, 'py-10 md:py-16')}>
    {container ? <div className="container">{children}</div> : children}
  </section>
)

export default SectionLayout

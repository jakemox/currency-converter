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
  <section className={`py-16 ${className}`}>
    {container ? <div className="container">{children}</div> : children}
  </section>
)

export default SectionLayout

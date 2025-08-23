import type { FC, PropsWithChildren } from 'react'

export interface InputContainerProps {
  id: string
  label: string
  error?: string
  className?: string
}

const InputContainer: FC<PropsWithChildren<InputContainerProps>> = ({
  id,
  label,
  error,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm">
        {label}
      </label>
      <div className="input-container flex w-full">{children}</div>
      {error && <div className="mt-1 text-sm font-semibold text-red-700">{error}</div>}
    </div>
  )
}

export default InputContainer

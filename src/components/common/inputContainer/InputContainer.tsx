import clsx from 'clsx'
import type { FC, PropsWithChildren } from 'react'

export interface InputContainerProps {
  id: string
  label: string
  error?: string
  disabled?: boolean
  className?: string
}

const InputContainer: FC<PropsWithChildren<InputContainerProps>> = ({
  id,
  label,
  error,
  disabled,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm">
        {label}
      </label>
      <div
        className={clsx(
          'flex w-full rounded-lg border border-solid border-black p-4 text-2xl focus-within:outline-1 focus-within:outline-black',
          disabled && 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500',
          error && 'border-red-700 focus-within:outline-red-700',
        )}
      >
        {children}
      </div>
      {error && <div className="mt-1 text-sm font-semibold text-red-700">{error}</div>}
    </div>
  )
}

export default InputContainer

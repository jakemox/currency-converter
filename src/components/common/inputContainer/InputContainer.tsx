import clsx from 'clsx'
import type { FC, PropsWithChildren } from 'react'

export interface InputContainerProps {
  id: string
  label: string
  error?: string
  disabled?: boolean
  // showArrow used to display arrow on select dropdowns
  showArrow?: boolean
  className?: string
}

const InputContainer: FC<PropsWithChildren<InputContainerProps>> = ({
  id,
  label,
  error,
  disabled,
  className,
  showArrow,
  children,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm">
        {label}
      </label>
      <div
        className={clsx(
          'focus-within:outline-3 flex w-full rounded-lg border border-solid border-black p-3 text-lg focus-within:border-teal-700 focus-within:outline-teal-700 md:p-4 md:text-2xl',
          showArrow && 'custom-arrow-wrapper relative',
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

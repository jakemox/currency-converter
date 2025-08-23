import type { FC, SelectHTMLAttributes } from 'react'
import InputContainer, { type InputContainerProps } from '../inputContainer/InputContainer'

export interface SelectProps extends InputContainerProps, SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  options: string[]
}

const Select: FC<SelectProps> = ({ id, label, options, error, className, ...selectProps }) => {
  const containerProps = { id, label, error, className }

  return (
    <InputContainer {...containerProps}>
      <select id={id} className="grow outline-none" {...selectProps}>
        {options.map((option, i) => {
          return <option key={i}>{option}</option>
        })}
      </select>
    </InputContainer>
  )
}

export default Select

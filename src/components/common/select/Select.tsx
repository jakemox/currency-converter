import type { FC, OptionHTMLAttributes, SelectHTMLAttributes } from 'react'
import InputContainer, { type InputContainerProps } from '../inputContainer/InputContainer'

export interface Option extends OptionHTMLAttributes<HTMLOptionElement> {
  label: string
  value: string
}

export interface SelectProps extends InputContainerProps, SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  options: Option[]
}

const Option: FC<Option> = ({ label, value }) => {
  return <option value={value}>{label}</option>
}

const Select: FC<SelectProps> = ({
  id,
  label,
  options,
  error,
  disabled,
  className,
  ...selectProps
}) => {
  const containerProps = { id, label, error, disabled, className }

  return (
    <InputContainer showArrow {...containerProps}>
      <select
        id={id}
        className="max-w-full grow appearance-none text-ellipsis bg-white outline-none after:content-none"
        disabled={disabled}
        {...selectProps}
      >
        {options.map((option, i) => (
          <Option key={i} {...option} />
        ))}
      </select>
    </InputContainer>
  )
}

export default Select

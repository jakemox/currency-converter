import type { FC, InputHTMLAttributes } from 'react'
import type { InputContainerProps } from '../inputContainer/InputContainer'
import InputContainer from '../inputContainer/InputContainer'

export interface InputProps extends InputContainerProps, InputHTMLAttributes<HTMLInputElement> {
  id: string
  prefix?: string
}

const Input: FC<InputProps> = ({ id, label, prefix, error, className, ...inputProps }) => {
  const containerProps = { id, label, error, className }

  return (
    <InputContainer {...containerProps}>
      {prefix && <span>{prefix}</span>}
      <input id={id} className="grow outline-none" {...inputProps} />
    </InputContainer>
  )
}
export default Input

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Input, { type InputProps } from './Input'
import '@testing-library/jest-dom'

const defaultProps: InputProps = {
  id: 'input-id',
  label: 'Label',
  onChange: () => {},
}

describe('Input', () => {
  it('renders input and has id', () => {
    render(<Input {...defaultProps} />)
    const input = screen.getByLabelText('Label')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'input-id')
  })

  it('renders prefix when provided', () => {
    render(<Input {...defaultProps} prefix="£" />)
    expect(screen.getByText('£')).toBeInTheDocument()
  })

  it('passes additional props to input', () => {
    render(<Input {...defaultProps} value="Input value" placeholder="Placeholder text" />)
    const input = screen.getByLabelText('Label')
    expect(input).toHaveValue('Input value')
    expect(input).toHaveAttribute('placeholder', 'Placeholder text')
  })

  it('changes value when user types', () => {
    render(<Input {...defaultProps} />)
    const input = screen.getByLabelText('Label')
    fireEvent.change(input, { target: { value: 'Test value' } })
    expect(input).toHaveValue('Test value')
  })
})

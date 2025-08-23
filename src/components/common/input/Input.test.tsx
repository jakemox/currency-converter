import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input, { type InputProps } from './Input'
import '@testing-library/jest-dom'

const defaultProps: InputProps = {
  id: 'input-id',
  label: 'Label',
  onChange: () => {},
}

describe('Input', () => {
  it('renders input', () => {
    render(<Input {...defaultProps} />)
    expect(screen.getByLabelText('Label')).toHaveAttribute('id', 'input-id')
  })

  it('renders prefix when provided', () => {
    render(<Input {...defaultProps} prefix="£" />)
    expect(screen.getByText('£')).toBeInTheDocument()
  })

  it('passes additional props to input', () => {
    render(<Input {...defaultProps} value="Input value" placeholder="Placeholder text" />)
    const input = screen.getByPlaceholderText('Placeholder text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Input value')
  })

  it('calls onChange handler when typing', () => {
    const handleChange = vi.fn()
    render(<Input {...defaultProps} onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '10.00' } })
    expect(handleChange).toHaveBeenCalled()
  })
})

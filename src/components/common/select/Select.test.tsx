import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Select, { type SelectProps } from './Select'
import '@testing-library/jest-dom'

const defaultProps: SelectProps = {
  id: 'select-id',
  label: 'Label',
  options: ['Option 1', 'Option 2', 'Option 3'],
}

describe('Select', () => {
  it('renders select with default option and has id', () => {
    render(<Select {...defaultProps} />)
    const select = screen.getByLabelText('Label')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('Option 1')
    expect(select).toHaveAttribute('id', 'select-id')
  })

  it('renders all provided options', () => {
    render(<Select {...defaultProps} />)
    defaultProps.options.forEach((option) => {
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument()
    })
  })

  it('changes value when user selects an option', () => {
    render(<Select {...defaultProps} />)
    const select = screen.getByLabelText('Label')
    fireEvent.change(select, { target: { value: 'Option 2' } })
    expect(select).toHaveValue('Option 2')
  })
})

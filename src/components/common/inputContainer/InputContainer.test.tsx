import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import InputContainer, { type InputContainerProps } from './InputContainer'
import '@testing-library/jest-dom'

const defaultProps: InputContainerProps = {
  id: 'input-id',
  label: 'Label',
}

describe('InputContainer', () => {
  it('renders label', () => {
    render(
      <InputContainer {...defaultProps}>
        <input id="input-id" />
      </InputContainer>,
    )
    const label = screen.getByText('Label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'input-id')
  })

  it('renders error message when provided', () => {
    render(<InputContainer {...defaultProps} error="Error message" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('applies all class names passed by the parent', () => {
    const { container } = render(<InputContainer {...defaultProps} className="class-name" />)
    expect(container.firstChild).toHaveClass('class-name')
  })
})

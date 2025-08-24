import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CurrencyConverterForm, { type CurrencyConverterFormProps } from './CurrencyConverterForm'
import '@testing-library/jest-dom'

const defaultProps: CurrencyConverterFormProps = {
  amount: '10.00',
  baseCurrency: 'GBP',
  targetCurrency: 'EUR',
  onAmountChange: vi.fn(),
  onBaseCurrencyChange: vi.fn(),
  onTargetCurrencyChange: vi.fn(),
  onAmountBlur: vi.fn(),
  // currencyOptions: ['GBP', 'USD', 'EUR'],
}

describe('CurrencyConverterForm', () => {
  it('renders amount input, currency dropdowns and convert button', () => {
    render(<CurrencyConverterForm {...defaultProps} />)
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByLabelText('From')).toBeInTheDocument()
    expect(screen.getByLabelText('To')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument()
  })

  it('sets the correct values for amount and dropdowns', () => {
    render(<CurrencyConverterForm {...defaultProps} />)
    expect(screen.getByLabelText('Amount')).toHaveValue(defaultProps.amount)
    expect(screen.getByLabelText('From')).toHaveValue(defaultProps.baseCurrency)
    expect(screen.getByLabelText('To')).toHaveValue(defaultProps.targetCurrency)
  })

  it('calls onAmountChange when amount is changed', async () => {
    const user = userEvent.setup()
    render(<CurrencyConverterForm {...defaultProps} />)
    await user.type(screen.getByLabelText('Amount'), '5')
    expect(defaultProps.onAmountChange).toHaveBeenCalled()
  })

  it('calls onBaseCurrencyChange when baseCurrency is changed', async () => {
    const user = userEvent.setup()
    render(<CurrencyConverterForm {...defaultProps} />)
    await user.selectOptions(screen.getByLabelText('From'), 'USD')
    expect(defaultProps.onBaseCurrencyChange).toHaveBeenCalled()
  })

  it('calls onTargetCurrencyChange when targetCurrency is changed', async () => {
    const user = userEvent.setup()
    render(<CurrencyConverterForm {...defaultProps} />)
    await user.selectOptions(screen.getByLabelText('To'), 'GBP')
    expect(defaultProps.onTargetCurrencyChange).toHaveBeenCalled()
  })

  it('renders error message when amountError is provided', () => {})

  it('disables convert button when amountError occurs', () => {})

  it('calls the API when the convert button is clicked', async () => {})
})

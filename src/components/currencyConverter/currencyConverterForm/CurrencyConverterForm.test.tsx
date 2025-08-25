import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CurrencyConverterForm, { type CurrencyConverterFormProps } from './CurrencyConverterForm'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../../utils/test-utils'
import { mockData } from '../../../mocks/mockData'

const defaultProps: CurrencyConverterFormProps = {
  converted: false,
  setConverted: vi.fn(),
}

const mockState = {
  amount: '10.00',
  baseCurrency: 'GBP',
  targetCurrency: 'AUD',
  rates: mockData,
  status: 'idle' as 'idle' | 'loading' | 'failed',
}

const renderForm = (props = defaultProps, preloadedState = mockState) => {
  return renderWithProviders(<CurrencyConverterForm {...props} />, {
    preloadedState: { currencyConverter: { ...preloadedState } },
  })
}

describe('CurrencyConverterForm', () => {
  it('renders amount input, currency dropdowns and convert button', () => {
    renderForm()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByLabelText('From')).toBeInTheDocument()
    expect(screen.getByLabelText('To')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument()
  })

  it('sets the correct values for amount and dropdowns', () => {
    renderForm()
    expect(screen.getByLabelText('Amount')).toHaveValue(mockState.amount)
    expect(screen.getByLabelText('From')).toHaveValue(mockState.baseCurrency)
    expect(screen.getByLabelText('To')).toHaveValue(mockState.targetCurrency)
  })

  it('updates the amount input when changed', async () => {
    const user = userEvent.setup()
    renderForm()
    const amountInput = screen.getByLabelText('Amount')
    await user.clear(amountInput)
    await user.type(amountInput, '5')
    expect(amountInput).toHaveValue('5')
  })

  it('formats the amount input to two decimal places on blur', async () => {
    const user = userEvent.setup()
    renderForm()
    const amountInput = screen.getByLabelText('Amount')
    await user.clear(amountInput)
    await user.type(amountInput, '5')
    await user.tab()
    expect(amountInput).toHaveValue('5.00')
  })

  it('renders error message and disables convert button when amount input is invalid', async () => {
    const user = userEvent.setup()
    renderForm()
    const amountInput = screen.getByLabelText('Amount')
    await user.clear(amountInput)
    await user.type(amountInput, 'wrong input')
    expect(screen.getByText('Please enter a valid amount')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /convert/i })).toBeDisabled()
  })

  it('updates baseCurrency in the Redux state ', async () => {
    const user = userEvent.setup()
    renderForm()
    const baseCurrencySelect = screen.getByLabelText('From')

    await user.selectOptions(baseCurrencySelect, 'USD')
    expect(baseCurrencySelect).toHaveValue('USD')
  })

  it('updates targetCurrency in the Redux state when changed', async () => {
    const user = userEvent.setup()
    renderForm()
    const select = screen.getByLabelText('To')
    await user.selectOptions(select, 'AUD')
    expect(select).toHaveValue('AUD')
  })

  it('calls setConverted when convert button is clicked', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.click(screen.getByRole('button', { name: /convert/i }))
    expect(defaultProps.setConverted).toHaveBeenCalledWith(true)
  })

  it('disables target dropdown and convert button if there is an error fetching data', async () => {
    // EUR is set to return status 500 in mock api call
    renderForm(defaultProps, { ...mockState, baseCurrency: 'EUR' })
    await waitFor(() => {
      expect(screen.getByLabelText('To')).toBeDisabled()
      expect(screen.getByRole('button', { name: /convert/i })).toBeDisabled()
    })
  })
})

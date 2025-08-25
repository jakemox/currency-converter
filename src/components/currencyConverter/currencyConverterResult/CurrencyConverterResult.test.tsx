import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../../utils/test-utils'
import CurrencyConverterResult from './CurrencyConverterResult'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/dom'
import { mockData } from '../../../mocks/mockData'

const mockState = {
  amount: '10.00',
  baseCurrency: 'GBP',
  targetCurrency: 'AUD',
  rates: {},
  status: 'idle' as 'idle' | 'loading' | 'failed',
}

const renderResult = (preloadedState = mockState) => {
  return renderWithProviders(<CurrencyConverterResult />, {
    preloadedState: { currencyConverter: { ...preloadedState } },
  })
}

describe('CurrencyConverterResult', () => {
  it('renders the correct conversion result', () => {
    // expected conversion rates calculated from mock data
    renderResult({ ...mockState, rates: mockData })
    expect(screen.getByText('10.00 U.K. Pound Sterling =')).toBeInTheDocument()
    expect(screen.getByText('15.40 Australian Dollar')).toBeInTheDocument()
    expect(screen.getByText('1 AUD = 0.65 GBP')).toBeInTheDocument()
  })

  it('renders nothing if rateInfo is missing', () => {
    const { container } = renderResult()
    expect(container).toBeEmptyDOMElement()
  })
})

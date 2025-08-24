import { useState, type ChangeEvent, type FC } from 'react'
import CurrencyConverterForm from '../currencyConverter/currencyConverterForm/CurrencyConverterForm'
import CurrencyConverterResult from '../currencyConverter/currencyConverterResult/CurrencyConverterResult'
import { baseCurrencies } from '../../constants'

const isValidAmount = (value: string) =>
  /^\d*\.?\d{0,2}$/.test(value) && value !== '' && parseFloat(value) > 0

const formatCurrency = (value: string) => {
  const amount = parseFloat(value)
  if (isNaN(amount)) return ''
  return amount.toFixed(2)
}

const CurrencyConverterSection: FC = () => {
  const [amount, setAmount] = useState('1.00')
  const [baseCurrency, setBaseCurrency] = useState(baseCurrencies[0].code)
  const [targetCurrenct, setTargetCurrency] = useState('EUR')

  const amountError = !isValidAmount(amount) ? 'Please enter a valid amount' : ''

  const handleAmountBlur = () => {
    if (isValidAmount(amount)) {
      setAmount(formatCurrency(amount))
    }
  }

  const handleBaseCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBaseCurrency(e.target.value)
  }

  return (
    <section className="bg-blue-600 py-16">
      <div className="container">
        <CurrencyConverterForm
          amount={amount}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrenct}
          onAmountChange={(e) => setAmount(e.target.value)}
          onBaseCurrencyChange={handleBaseCurrencyChange}
          onTargetCurrencyChange={(e) => setTargetCurrency(e.target.value)}
          // TODO Move to component?
          amountError={amountError}
          onAmountBlur={handleAmountBlur}
        />
        {/* TODO Render and update only once Convert button has been clicked*/}
        <CurrencyConverterResult
          amount={amount}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrenct}
          conversionRate={2}
        />
      </div>
    </section>
  )
}

export default CurrencyConverterSection

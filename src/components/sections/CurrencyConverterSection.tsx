import { useState, type FC } from 'react'
import Input from '../common/input/Input'
import Select from '../common/select/Select'

const isValidAmount = (value: string) =>
  /^\d*\.?\d{0,2}$/.test(value) && value !== '' && parseFloat(value) > 0

const formatCurrency = (value: string) => {
  const amount = parseFloat(value)
  if (isNaN(amount)) return ''
  return amount.toFixed(2)
}

const mockOptions = ['GBP', 'USD', 'EUR']

const CurrencyConverterSection: FC = () => {
  const [amount, setAmount] = useState('1.00')
  const [from, setFrom] = useState('GBP')
  const [to, setTo] = useState('EUR')

  const amountError = !isValidAmount(amount) ? 'Please enter a valid amount' : ''

  const handleAmountBlur = () => {
    if (isValidAmount(amount)) {
      setAmount(formatCurrency(amount))
    }
  }

  return (
    <section className="bg-blue-600 py-16">
      <div className="container">
        <div className="mx-auto mb-10 max-w-xl rounded-3xl bg-white p-6">
          <Input
            id="amount"
            value={amount}
            label="Amount"
            prefix="£"
            type="text"
            inputMode="decimal"
            pattern="^\d*\.?\d{0,2}$"
            error={amountError}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={handleAmountBlur}
            className="mb-8"
          />
          <Select
            id="from"
            value={from}
            label="From"
            options={mockOptions}
            onChange={(e) => setFrom(e.target.value)}
            className="mb-4"
          />
          <Select
            id="to"
            value={to}
            label="To"
            options={mockOptions}
            onChange={(e) => setTo(e.target.value)}
            className="mb-8"
          />
          <button
            className="w-full cursor-pointer rounded-full bg-blue-500 p-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            disabled={!!amountError}
            onClick={() => {
              console.log(amount, from, to)
            }}
          >
            Convert
          </button>
        </div>
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6">
          <div>
            <p className="text-center text-3xl font-semibold">{`${amount} ${from} = ${(parseFloat(amount) * 2).toFixed(2)} ${to}`}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrencyConverterSection

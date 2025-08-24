import type { ChangeEventHandler, FC } from 'react'
import Select from '../../common/select/Select'
import Input from '../../common/input/Input'
import { baseCurrencies } from '../../../constants'
import { fetchRates } from '../../../api/currencyApi'

export interface CurrencyConverterFormProps {
  amount: string
  baseCurrency: string
  targetCurrency: string
  onAmountChange: ChangeEventHandler<HTMLInputElement>
  onBaseCurrencyChange: ChangeEventHandler<HTMLSelectElement>
  onTargetCurrencyChange: ChangeEventHandler<HTMLSelectElement>
  amountError?: string
  onAmountBlur: () => void
  // currencyOptions: string[]
}

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({
  amount,
  baseCurrency,
  targetCurrency,
  onAmountChange,
  onBaseCurrencyChange,
  onTargetCurrencyChange,
  amountError,
  onAmountBlur,
  // currencyOptions,
}) => {
  return (
    <div className="content-box">
      <Input
        id="amount"
        value={amount}
        label="Amount"
        // TODO edit
        prefix="£"
        type="text"
        inputMode="decimal"
        pattern="^\d*\.?\d{0,2}$"
        error={amountError}
        onChange={onAmountChange}
        onBlur={onAmountBlur}
        className="mb-8"
      />
      <Select
        id="base-currency"
        value={baseCurrency}
        label="From"
        options={baseCurrencies.map(({ code }) => code)}
        onChange={onBaseCurrencyChange}
        className="mb-4"
      />
      <Select
        id="target-currency"
        value={targetCurrency}
        label="To"
        options={['GBP', 'USD']}
        onChange={onTargetCurrencyChange}
        className="mb-8"
      />
      <button
        className="w-full cursor-pointer rounded-full bg-blue-500 p-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={!!amountError}
        onClick={async () => {
          const data = await fetchRates('gbp')
          console.log(data)
        }}
      >
        Convert
      </button>
    </div>
  )
}

export default CurrencyConverterForm

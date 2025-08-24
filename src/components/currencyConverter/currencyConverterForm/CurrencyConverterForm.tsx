import type { ChangeEventHandler, FC } from 'react'
import Select from '../../common/select/Select'
import Input from '../../common/input/Input'

export interface CurrencyConverterFormProps {
  amount: string
  baseCurrency: string
  targetCurrency: string
  onAmountChange: ChangeEventHandler<HTMLInputElement>
  onBaseCurrencyChange: ChangeEventHandler<HTMLSelectElement>
  onTargetCurrencyChange: ChangeEventHandler<HTMLSelectElement>
  amountError?: string
  onAmountBlur: () => void
  currencyOptions: string[]
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
  currencyOptions,
}) => {
  return (
    <div className="content-box">
      <Input
        id="amount"
        value={amount}
        label="Amount"
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
        options={currencyOptions}
        onChange={onBaseCurrencyChange}
        className="mb-4"
      />
      <Select
        id="to"
        value={targetCurrency}
        label="To"
        options={currencyOptions}
        onChange={onTargetCurrencyChange}
        className="mb-8"
      />
      <button
        className="w-full cursor-pointer rounded-full bg-blue-500 p-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        disabled={!!amountError}
        onClick={() => {
          console.log(amount, baseCurrency, targetCurrency)
        }}
      >
        Convert
      </button>
    </div>
  )
}

export default CurrencyConverterForm

import { useEffect, type ChangeEvent, type FC, type Dispatch, type SetStateAction } from 'react'
import Select, { type Option } from '../../common/select/Select'
import Input from '../../common/input/Input'
import { baseCurrencies, PRIORITY_CURRENCIES } from '../../../constants'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  getRates,
  selectAmount,
  selectBaseCurrency,
  selectRates,
  selectTargetCurrency,
  setAmount,
  setBaseCurrency,
  setTargetCurrency,
  selectStatus,
} from '../../../features/currencyConverter/currencySlice'

export interface CurrencyConverterFormProps {
  converted: boolean
  setConverted: Dispatch<SetStateAction<boolean>>
}

const getOptions = <Type extends { code: string; name: string }>(currencies?: Type[]): Option[] => {
  if (!currencies) return []
  return currencies.map(({ code, name }) => ({
    label: `${code} - ${name}`,
    value: code,
  }))
}

const sortCurrenciesByPriority = (options: Option[]): Option[] => {
  const prioritised = options
    .filter((option) => PRIORITY_CURRENCIES.includes(option.value))
    .sort((a, b) => PRIORITY_CURRENCIES.indexOf(a.value) - PRIORITY_CURRENCIES.indexOf(b.value))

  return [
    ...prioritised,
    ...options.filter((option) => !PRIORITY_CURRENCIES.includes(option.value)),
  ]
}

const isValidAmount = (value: string) =>
  /^\d*\.?\d{0,2}$/.test(value) && value !== '' && parseFloat(value) > 0

const formatCurrency = (value: string) => {
  const amount = parseFloat(value)
  if (isNaN(amount)) return ''
  return amount.toFixed(2)
}

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({ converted, setConverted }) => {
  const dispatch = useAppDispatch()
  const amount = useAppSelector(selectAmount)
  const baseCurrency = useAppSelector(selectBaseCurrency)
  const targetCurrency = useAppSelector(selectTargetCurrency)
  const rates = useAppSelector(selectRates) || {}
  const status = useAppSelector(selectStatus)

  const baseOptions = getOptions(baseCurrencies)
  const targetOptions = getOptions(Object.values(rates))
  const sortedTargetOptions = sortCurrenciesByPriority(targetOptions)

  const amountPrefix = baseCurrencies.find(
    ({ code }) => code === baseCurrency.toUpperCase(),
  )?.symbol

  useEffect(() => {
    dispatch(getRates(baseCurrency))
  }, [dispatch, baseCurrency])

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAmount(e.target.value))
  }

  const handleAmountBlur = () => {
    if (isValidAmount(amount)) {
      dispatch(setAmount(formatCurrency(amount)))
    }
  }

  const handleBaseCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setBaseCurrency(e.target.value))
  }

  const handleTargetCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTargetCurrency(e.target.value))
  }

  const amountError = !isValidAmount(amount) ? 'Please enter a valid amount' : ''

  console.log(status)

  return (
    <div className="content-box">
      <Input
        id="amount"
        value={amount}
        label="Amount"
        prefix={amountPrefix}
        type="text"
        inputMode="decimal"
        pattern="^\d*\.?\d{0,2}$"
        error={amountError}
        onChange={handleAmountChange}
        onBlur={handleAmountBlur}
        className="mb-8"
      />
      <Select
        id="base-currency"
        value={baseCurrency}
        label="From"
        options={baseOptions}
        onChange={handleBaseCurrencyChange}
        className="mb-4"
      />
      <Select
        id="target-currency"
        value={targetCurrency}
        label="To"
        options={sortedTargetOptions}
        onChange={handleTargetCurrencyChange}
        disabled={status === 'failed'}
        className="mb-8"
      />
      {!converted && (
        <button
          className="w-full cursor-pointer rounded-full bg-blue-500 p-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          disabled={!!amountError || status === 'failed'}
          onClick={() => setConverted(true)}
        >
          Convert
        </button>
      )}
    </div>
  )
}

export default CurrencyConverterForm

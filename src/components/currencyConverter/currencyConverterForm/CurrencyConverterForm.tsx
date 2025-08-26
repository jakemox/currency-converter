import {
  useEffect,
  type ChangeEvent,
  type FC,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from 'react'
import Select, { type Option } from '../../common/select/Select'
import Input from '../../common/input/Input'
import { baseCurrencies, PRIORITY_CURRENCIES } from '../constants'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import {
  getRates,
  setAmount,
  setBaseCurrency,
  setTargetCurrency,
  selectCurrencyConverterState,
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

// Show USD, GBP, EUR etc at the top of the target currencies dropdown list if they exist
const sortCurrenciesByPriority = (options: Option[]): Option[] => {
  const prioritised = options
    .filter((option) => PRIORITY_CURRENCIES.includes(option.value))
    .sort((a, b) => PRIORITY_CURRENCIES.indexOf(a.value) - PRIORITY_CURRENCIES.indexOf(b.value))

  return [
    ...prioritised,
    ...options.filter((option) => !PRIORITY_CURRENCIES.includes(option.value)),
  ]
}

// Use regex to test if amount is positive a positive number with no more than 2 decimal places
const isValidAmount = (value: string) =>
  /^\d*\.?\d{0,2}$/.test(value) && value !== '' && parseFloat(value) > 0

// Format amount to 2 decimal places
const formatCurrency = (value: string) => {
  const amount = parseFloat(value)
  if (isNaN(amount)) return ''
  return amount.toFixed(2)
}

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({ converted, setConverted }) => {
  const dispatch = useAppDispatch()
  const {
    amount,
    baseCurrency,
    targetCurrency,
    status,
    rates: storeRates,
  } = useAppSelector(selectCurrencyConverterState)
  // Memoize rates to avoid creating a new empty object on every render
  const rates = useMemo(() => storeRates || {}, [storeRates])

  const baseOptions = getOptions(baseCurrencies)
  const targetOptions = getOptions(Object.values(rates))
  const sortedTargetOptions = sortCurrenciesByPriority(targetOptions)

  // Find currency symbol for amount based on baseCurrency
  const amountPrefix = baseCurrencies.find(
    ({ code }) => code === baseCurrency.toUpperCase(),
  )?.symbol

  useEffect(() => {
    dispatch(getRates(baseCurrency))
  }, [dispatch, baseCurrency])

  // If user clicks on a base currency that matches the target currency, we change the target currency to gbp or usd
  useEffect(() => {
    if (!rates[targetCurrency.toLowerCase()]) {
      const available = Object.keys(rates).find((code) => code === 'gbp' || code === 'usd')
      if (available) {
        dispatch(setTargetCurrency(available.toUpperCase()))
      }
    }
  }, [rates, baseCurrency, targetCurrency, dispatch])

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAmount(e.target.value))
  }

  // Format the amount to 2 decimal places if valid when user leaves the amount input
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
      />
      {!converted && (
        <button
          className="button-primary mt-8 w-full"
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

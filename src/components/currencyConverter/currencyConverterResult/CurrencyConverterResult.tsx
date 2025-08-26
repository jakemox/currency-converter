import type { FC } from 'react'
import { useAppSelector } from '../../../hooks/hooks'
import { selectCurrencyConverterState } from '../../../features/currencyConverter/currencySlice'
import { baseCurrencies } from '../constants'

const CurrencyConverterResult: FC = () => {
  const { amount, baseCurrency, targetCurrency, rates } = useAppSelector(
    selectCurrencyConverterState,
  )

  // Find base currency name by code
  const baseCurrencyName = baseCurrencies.find(
    ({ code }) => code === baseCurrency.toUpperCase(),
  )?.name

  const rateInfo = rates ? rates[targetCurrency.toLowerCase()] : undefined

  // Don't render component if rates data doesn't exist or if amount is invalid
  if (!rateInfo || !amount || isNaN(Number(amount))) return null

  const { rate, inverseRate, name: targetCurrencyName } = rateInfo

  return (
    <div className="content-box background-navy mt-10">
      <p className="text-lg font-semibold">{`${parseFloat(amount).toFixed(2)} ${baseCurrencyName} = `}</p>
      <p className="mb-4 mt-2 text-3xl font-semibold">
        {`${(parseFloat(amount) * rate).toFixed(2)} ${targetCurrencyName}`}
      </p>
      <p>{`1 ${targetCurrency} = ${inverseRate.toFixed(2)} ${baseCurrency}`}</p>
    </div>
  )
}

export default CurrencyConverterResult

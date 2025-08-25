import type { FC } from 'react'
import { useAppSelector } from '../../../hooks'
import {
  selectAmount,
  selectBaseCurrency,
  selectRates,
  selectTargetCurrency,
} from '../../../features/currencyConverter/currencySlice'
import { baseCurrencies } from '../../../constants'

const CurrencyConverterResult: FC = () => {
  const amount = useAppSelector(selectAmount)
  const baseCurrency = useAppSelector(selectBaseCurrency)
  const targetCurrency = useAppSelector(selectTargetCurrency)
  const rates = useAppSelector(selectRates) || {}

  const baseCurrencyName = baseCurrencies.find(
    ({ code }) => code === baseCurrency.toUpperCase(),
  )?.name

  const rateInfo = rates[targetCurrency.toLowerCase()]

  if (!rateInfo) return null

  const { rate, inverseRate, name: targetCurrencyName } = rateInfo

  return (
    <div className="content-box mt-10">
      <p className="font-semibold">{`${amount} ${baseCurrencyName} = `}</p>
      <p className="mb-4 mt-2 text-3xl font-semibold">
        {`${(parseFloat(amount) * rate).toFixed(2)} ${targetCurrencyName}`}
      </p>
      <p>{`1 ${targetCurrency} = ${inverseRate.toFixed(2)} ${baseCurrency}`}</p>
    </div>
  )
}

export default CurrencyConverterResult

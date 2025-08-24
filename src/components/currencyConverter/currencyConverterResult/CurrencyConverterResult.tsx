import type { FC } from 'react'

export interface CurrencyConverterResultProps {
  amount: string
  baseCurrency: string
  targetCurrency: string
  conversionRate: number
}

const CurrencyConverterResult: FC<CurrencyConverterResultProps> = ({
  amount,
  baseCurrency,
  targetCurrency,
  conversionRate,
}) => {
  return (
    <div className="content-box mt-10">
      <p className="text-center text-3xl font-semibold">
        {`${amount} ${baseCurrency} = ${(parseFloat(amount) * conversionRate).toFixed(2)} ${targetCurrency}`}
      </p>
    </div>
  )
}

export default CurrencyConverterResult

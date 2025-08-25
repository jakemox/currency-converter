import { useState, type FC } from 'react'
import CurrencyConverterForm from './currencyConverterForm/CurrencyConverterForm'
import CurrencyConverterResult from './currencyConverterResult/CurrencyConverterResult'

const CurrencyConverterSection: FC = () => {
  const [converted, setConverted] = useState<boolean>(false)

  return (
    <>
      <CurrencyConverterForm converted={converted} setConverted={setConverted} />
      {converted && <CurrencyConverterResult />}
    </>
  )
}

export default CurrencyConverterSection

import { useState, type FC } from 'react'
import CurrencyConverterForm from './currencyConverterForm/CurrencyConverterForm'
import CurrencyConverterResult from './currencyConverterResult/CurrencyConverterResult'

const CurrencyConverter: FC = () => {
  const [converted, setConverted] = useState<boolean>(false)

  return (
    <>
      <CurrencyConverterForm converted={converted} setConverted={setConverted} />
      {/* Render the result once the first conversion has been run and it will remain on screen afterwards, updating live */}
      {converted && <CurrencyConverterResult />}
    </>
  )
}

export default CurrencyConverter

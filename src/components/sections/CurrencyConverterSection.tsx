import { useState, type FC } from 'react'
import CurrencyConverterForm from '../currencyConverter/currencyConverterForm/CurrencyConverterForm'
import CurrencyConverterResult from '../currencyConverter/currencyConverterResult/CurrencyConverterResult'

const CurrencyConverterSection: FC = () => {
  const [converted, setConverted] = useState<boolean>(false)

  return (
    <section className="bg-blue-600 py-16">
      <div className="container">
        <CurrencyConverterForm converted={converted} setConverted={setConverted} />
        {converted && <CurrencyConverterResult />}
      </div>
    </section>
  )
}

export default CurrencyConverterSection

import SectionLayout from './components/layout/SectionLayout'
import CurrencyConverter from './components/currencyConverter/CurrencyConverter'
import { selectCurrencyConverterState } from './features/currencyConverter/currencySlice'
import { useAppSelector } from './hooks/hooks'

function App() {
  const { status, error } = useAppSelector(selectCurrencyConverterState)

  return (
    <>
      {status === 'failed' && error && (
        <div className="fixed left-0 top-0 z-50 w-full bg-red-600 p-4 text-center text-white">
          {error}
        </div>
      )}
      <SectionLayout className="background-teal text-center">
        <h1 className="heading-1">Currency Converter</h1>
        <p className="text-body-lg mx-auto max-w-xl">
          Convert currencies to your heart's content, courtesy of Jake Moxon
        </p>
      </SectionLayout>
      <SectionLayout className="diagonal-split-bg pt-0 md:pt-0">
        <CurrencyConverter />
      </SectionLayout>
    </>
  )
}

export default App

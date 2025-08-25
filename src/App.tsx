import CurrencyConverterSection from './components/sections/CurrencyConverterSection'
import { selectError, selectStatus } from './features/currencyConverter/currencySlice'
import { useAppSelector } from './hooks'

function App() {
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

  return (
    <>
      {status === 'failed' && error && (
        <div className="fixed left-0 top-0 z-50 w-full bg-red-600 p-4 text-center text-white">
          {error}
        </div>
      )}
      <CurrencyConverterSection />
    </>
  )
}

export default App

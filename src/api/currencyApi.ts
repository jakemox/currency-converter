import type { CurrencyInfo } from '../types/currency'

export async function fetchRates(baseCurrency: string) {
  const url = `http://www.floatrates.com/daily/${baseCurrency}.json`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const data: Record<string, CurrencyInfo> = await response.json()
    const rates = Object.entries(data).reduce(
      (res, [currency, info]) => {
        res[currency] = { code: info.code, rate: info.rate }
        return res
      },
      {} as Record<string, CurrencyInfo>,
    )

    return rates
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('An unknown error occurred')
    }
  }
}

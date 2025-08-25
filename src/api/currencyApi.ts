import type { Rates } from '../types/currency'

export async function fetchRates(baseCurrency: string) {
  const url = `http://www.floatrates.com/daily/${baseCurrency.toLowerCase()}.json`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const data: Rates = await response.json()
    const rates = Object.entries(data).reduce(
      (res, [currency, { code, name, rate, inverseRate }]) => {
        res[currency] = { code, name, rate, inverseRate }
        return res
      },
      {} as Rates,
    )
    return rates
  } catch (error) {
    if (error instanceof Error) {
      throw error.message
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}

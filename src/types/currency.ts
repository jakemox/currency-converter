type CurrencyInfo = { code: string; name: string; rate: number; inverseRate: number }
export type Rates = Record<string, CurrencyInfo>

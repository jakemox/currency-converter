import { describe, expect, it } from 'vitest'
import { fetchRates } from './currencyApi'
import { mockData } from '../mocks/mockData'

describe('fetchRates', () => {
  it('returns rates data successfully from API', async () => {
    const response = await fetchRates('gbp')
    expect(response).toEqual(mockData)
  })

  it('throws an error when the response is not ok', async () => {
    await expect(fetchRates('eur')).rejects.toThrow('Response status: 500')
  })
})

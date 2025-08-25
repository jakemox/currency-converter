import { describe, expect, it } from 'vitest'
import { fetchRates } from './currencyApi'
import { mockData } from '../mocks/handlers'

describe('fetchRates', () => {
  it('returns rates data successfully from API', async () => {
    const response = await fetchRates('gbp')
    console.log('hello', mockData)
    console.log('response', response)

    expect(response).toEqual(mockData)
  })
})

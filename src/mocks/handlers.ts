import { http, HttpResponse } from 'msw'

export const mockData = {
  aud: {
    code: 'AUD',
    name: 'Australian Dollar',
    rate: 1.5395709702449,
    inverseRate: 0.64953160284707,
  },
  eur: {
    code: 'EUR',
    name: 'Euro',
    rate: 0.85462583276941,
    inverseRate: 1.1701027065371,
  },
  hkd: {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    rate: 7.8097618125156,
    inverseRate: 0.12804487819301,
  },
}

export const handlers = [
  http.get('http://www.floatrates.com/daily/:base.json', ({ params }) => {
    if (params.base === 'eur') {
      return new HttpResponse(null, { status: 500 })
    }

    if (params.base === 'gbp') {
      return HttpResponse.json(mockData)
    }
  }),
]

import { http, HttpResponse } from 'msw'
import { mockData } from './mockData'

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

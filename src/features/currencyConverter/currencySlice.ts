import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchRates } from '../../api/currencyApi'
import type { CurrencyInfo } from '../../types/currency'

interface CurrencyConverterState {
  amount: number
  baseCurrency: string
  targetCurrency: string
  rates?: Record<string, CurrencyInfo>
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CurrencyConverterState = {
  amount: 1,
  baseCurrency: 'GBP',
  targetCurrency: '',
  rates: {},
  status: 'idle',
}

const getRates = createAsyncThunk('currencyConverter/getRates', async (baseCurrency: string) => {
  return await fetchRates(baseCurrency)
})

export const currencyConverterSlice = createSlice({
  name: 'currencyConverter',
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload
    },
    setBaseCurrency(state, action: PayloadAction<string>) {
      state.baseCurrency = action.payload
    },
    setTargetCurrency(state, action: PayloadAction<string>) {
      state.targetCurrency = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRates.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getRates.fulfilled, (state, action) => {
        state.status = 'idle'
        state.rates = action.payload
      })
      .addCase(getRates.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setAmount, setBaseCurrency, setTargetCurrency } = currencyConverterSlice.actions
export default currencyConverterSlice.reducer

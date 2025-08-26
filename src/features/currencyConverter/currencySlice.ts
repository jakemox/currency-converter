import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchRates } from '../../api/currencyApi'
import type { Rates } from '../../types/currency'
import type { RootState } from '../../store'

interface CurrencyConverterState {
  amount: string
  baseCurrency: string
  targetCurrency: string
  rates?: Rates
  status: 'idle' | 'loading' | 'failed'
  error?: string
}

const initialState: CurrencyConverterState = {
  amount: '1.00',
  baseCurrency: 'GBP',
  targetCurrency: 'USD',
  rates: {},
  status: 'idle',
  error: undefined,
}

export const getRates = createAsyncThunk(
  'currencyConverter/getRates',
  async (baseCurrency: string) => {
    return await fetchRates(baseCurrency)
  },
)

export const currencyConverterSlice = createSlice({
  name: 'currencyConverter',
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<string>) {
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
      .addCase(getRates.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectCurrencyConverterState = (state: RootState) => state.currencyConverter

export const { setAmount, setBaseCurrency, setTargetCurrency } = currencyConverterSlice.actions
export default currencyConverterSlice.reducer

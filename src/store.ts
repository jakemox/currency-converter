import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import currencyConverterReducer from './features/currencyConverter/currencySlice'

export const store = configureStore({
  reducer: {
    currencyConverter: currencyConverterReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

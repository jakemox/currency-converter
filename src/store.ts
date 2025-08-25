import { combineReducers, configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import currencyConverterReducer from './features/currencyConverter/currencySlice'

// export const store = configureStore({
//   reducer: {
//     currencyConverter: currencyConverterReducer,
//   },
// })

const rootReducer = combineReducers({
  currencyConverter: currencyConverterReducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
export const store = setupStore()

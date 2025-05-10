import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'


export const makeStore = () => {
  return configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
  })
}
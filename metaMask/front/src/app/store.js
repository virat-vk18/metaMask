import { configureStore } from '@reduxjs/toolkit'
import { api } from './service/api'
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefalutMiddleware) => getDefalutMiddleware().concat(api.middleware)
})
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://172.16.17.205:3600' }),
    tagTypes: ['Todos'],
    endpoints: () => ({})
})

import { api } from "../app/service/api"
const loginApi = api.injectEndpoints({
    endpoints: builder => ({
        checkLOgin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Todos']
        }),
    })
})
export const { useCheckLOginMutation } = loginApi
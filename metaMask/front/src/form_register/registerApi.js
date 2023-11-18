import { api } from "../app/service/api"
const token = localStorage.getItem('token')
const registerApi = api.injectEndpoints({
    endpoints: builder => ({
        getRegister: builder.query({
            query: () => ({ url: `register/getAllData` }
            ),
            providesTags: ['Todos']
        }),
        createRegister: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Todos']
        }),
        getSingleUser: builder.mutation({
            query: (body) => ({
                headers: {
                    authorization: `Bearer ${token}`
                },
                url: "/register/editUser",
                method: 'POST',
                body
            }),
            invalidatesTags: ['Todos']
        }),
        editRegister: builder.mutation({
            query: ({ id, ...body }) => ({
                headers: {
                    authorization: `Bearer ${token}`
                },
                url: `/register/update/${id}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Todos']
        }),
        deleteRegister: builder.mutation({
            query: (body) => ({
                url: '/register/delete',
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Todos']
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url: 'fileUpload',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Todos']
        }),
        createCkData: builder.mutation({
            query: (data) => ({
                url: 'ckEditor',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Todos']
        }),
        getCkData: builder.query({
            query: () => ({ url: `` }
            ),
            providesTags: ['Todos']
        }),
    })
})

export const { useGetRegisterQuery, useCreateRegisterMutation, useGetSingleUserMutation, useEditRegisterMutation, useDeleteRegisterMutation, useUploadImageMutation, useCreateCkDataMutation } = registerApi
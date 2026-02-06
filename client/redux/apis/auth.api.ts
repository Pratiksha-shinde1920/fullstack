// import { User } from "@/types/Todo"
import { User } from "@/types/user"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        //  baseUrl: "http://localhost:5000/api/auth",
         baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
         credentials:"include" }),
    tagTypes: [],
    endpoints: (builder) => {
        return {

            signup: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: userData
                    }
                },

            }),
            signin: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userData
                    }
                },

            }),
            signout: builder.mutation<void, User>({
                query: userData => {
                    return {
                        url: "/signout",
                        method: "POST",
                        body: userData
                    }
                },

            }),

        }
    }
})

export const { useSigninMutation, useSignoutMutation,useSignupMutation } = authApi

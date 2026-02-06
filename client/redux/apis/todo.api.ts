import { Todo } from "@/types/Todo"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/todo",
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL} /api/todo`,
        credentials: "include"
    }),

    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query<Todo[], void>({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            addTodo: builder.mutation<void, Todo>({
                query: tododate => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: tododate
                    }
                },
                invalidatesTags: ["todo"]
            }),
            updateTodo: builder.mutation<void, Todo>({
                query: tododata => {
                    return {
                        url: "/modify/" + tododata._id as string,
                        method: "PATCH",
                        body: tododata

                    }
                },
                invalidatesTags: ["todo"]
            }),
            deleteTodo: builder.mutation<void, string>({
                query: _id => {
                    return {
                        url: "/remove/" + _id,
                        method: "DELETE",


                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } = todoApi

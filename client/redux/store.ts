import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./apis/todo.api";
import { authApi } from "./apis/auth.api";


const reduxStore = configureStore({
    reducer: {
       [todoApi.reducerPath]:todoApi.reducer,
       [authApi.reducerPath]:authApi.reducer,
    },
    middleware:def => def().concat(todoApi.middleware,authApi.middleware)
})

export default reduxStore
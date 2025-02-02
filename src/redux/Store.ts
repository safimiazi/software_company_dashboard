import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import  sidebarReducer  from "./slices/sidebarSlice";
import { setupListeners } from '@reduxjs/toolkit/query'
import mainApi from "./api/MainApi";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        sidebar: sidebarReducer,
        [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mainApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
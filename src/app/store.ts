import { configureStore } from "@reduxjs/toolkit"
import {favoritesReducer} from "../Features/Favorites/model/favoritesSlice";
import {appReducer} from "./appSlice";
import { baseApi } from "./baseApi"

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        app: appReducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {MovieType} from "../../Movie/api/movieApi.types";


type FavoritesState = {
    movies: MovieType[];
};

const initialState: FavoritesState = {
    movies: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    selectors: {
        selectFavorites: (state) => state.movies,
    },
    reducers: {
        toggleFavorite(state, action: PayloadAction<MovieType>) {
            const index = state.movies.findIndex(
                movie => movie.id === action.payload.id
            );

            if (index === -1) {
                state.movies.push(action.payload);
            } else {
                state.movies.splice(index, 1);
            }
        }
    },
});

export const {toggleFavorite} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const {selectFavorites} = favoritesSlice.selectors;
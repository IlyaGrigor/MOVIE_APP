import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

type AppState = {
    themeMode: ThemeMode;
};

const savedTheme = localStorage.getItem("themeMode");

const initialState: AppState = {
    themeMode:
        savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "light",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.themeMode = action.payload;
            localStorage.setItem("themeMode", action.payload);
        },
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
    },
});

export const { changeThemeMode } = appSlice.actions;
export const { selectThemeMode } = appSlice.selectors;
export const appReducer = appSlice.reducer;
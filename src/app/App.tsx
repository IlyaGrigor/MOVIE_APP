import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {useEffect} from "react";
import {ErrorBoundary} from "../common/components/ErrorBoundary/ErrorBoundary";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {Routing} from "../common/Routing/Routing";
import {selectFavorites} from "../Features/Favorites/model/favoritesSlice";
import {Footer} from "../Layout/Footer/Footer";
import {Header} from "../Layout/Header/Header";
import {selectThemeMode} from "./appSlice";
import {getTheme} from "./theme";


function App() {

    const themeMode = useAppSelector(selectThemeMode);

    const theme = getTheme(themeMode)

    const favorites = useAppSelector(selectFavorites);

    useEffect(() => {
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <Box sx={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
                    <Header />
                    <Box component="main" sx={{flexGrow: 1}}>
                        <Routing />
                    </Box>
                    <Footer />
                </Box>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App

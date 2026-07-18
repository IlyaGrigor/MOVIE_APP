import {AppBar, Box, Button, IconButton, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {changeThemeMode, selectThemeMode} from "../../app/appSlice";
import logo from "../../assets/logo.svg";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Path} from "../../common/constants/Paths";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {PageContainer} from "../../common/components/PageContainer/PageContainer";


export const Header = () => {

    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)

    const changeThemeHandler = () => {
        dispatch(changeThemeMode(themeMode === "light" ? "dark" : "light"))
    }

    return (
        <AppBar position="static" sx={{
            mb: 10,
        }}>
            <PageContainer>
                <Toolbar variant="dense"
                         sx={{
                             minHeight: 90,
                             display: "flex",
                             flexDirection: "row",
                             justifyContent: "space-between",
                         }}
                >
                        <Box
                        component={NavLink}
                        to={Path.Main}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            mr: 2,
                        }}
                    >
                        <Box
                            component="img"
                            src={logo}
                            alt="TMDB"
                            sx={{height: 20}}
                        />
                    </Box>


                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 5
                        }}>
                            <Button color="inherit" component={NavLink} to={Path.Main}>
                                Main
                            </Button>
                            <Button color="inherit" component={NavLink} to={Path.CategoryMovies.replace(":category", "popular")}>
                                Category Movies
                            </Button>
                            <Button color="inherit" component={NavLink} to={Path.FilteredMovies}>
                                Filtered Movies
                            </Button>
                            <Button color="inherit" component={NavLink} to={Path.Search}>
                                Search
                            </Button>
                            <Button color="inherit" component={NavLink} to={Path.Favorites}>
                                Favorites
                            </Button>
                        </Box>

                        <IconButton
                            color="inherit"
                            onClick={changeThemeHandler}
                        >
                            {themeMode === "light"
                                ? <DarkModeIcon/>
                                : <LightModeIcon/>}
                        </IconButton>
                </Toolbar>
            </PageContainer>
        </AppBar>
    );
};


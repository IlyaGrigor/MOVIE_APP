import {Box, Button, Skeleton, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import type {MovieType} from "../../../../Features/Movie/api/movieApi.types";
import {useGetMoviesByCategoryQuery, useGetPopularMoviesQuery} from "../../../../Features/Movies/api/moviesApi";
import {Path} from "../../../constants/Paths";
import {ErrorAlert} from "../../ErrorAlert/ErrorAlert";
import {HeroBanner} from "../../HeroBanner/HeroBanner";
import {MovieList} from "../../MovieList/MovieList";
import {PageContainer} from "../../PageContainer/PageContainer";
import {SearchBar} from "../../SearchBar/SearchBar";

export const MainPage = () => {

    const [value, setValue] = useState("");
    const [randomMovie, setRandomMovie] = useState<MovieType | null>(null);
    const navigate = useNavigate();

    const {
        data: popularMovies,
        isLoading: isPopularLoading,
        isError: isPopularError,
        error: popularError,
        refetch: refetchPopularMovies,
    } = useGetPopularMoviesQuery()

    const {
        data: topRatedMovies,
        isLoading: isTopRatedLoading,
        isError: isTopRatedError,
        error: topRatedError,
        refetch: refetchTopRatedMovies,
    } = useGetMoviesByCategoryQuery({category: "top_rated", page: 1})
    const {
        data: upcomingMovies,
        isLoading: isUpcomingLoading,
        isError: isUpcomingError,
        error: upcomingError,
        refetch: refetchUpcomingMovies,
    } = useGetMoviesByCategoryQuery({category: "upcoming", page: 1})
    const {
        data: nowPlayingMovies,
        isLoading: isNowPlayingLoading,
        isError: isNowPlayingError,
        error: nowPlayingError,
        refetch: refetchNowPlayingMovies,
    } = useGetMoviesByCategoryQuery({category: "now_playing", page: 1})

    const onSearchHandler = () => {
        const searchValue = value.trim();

        if (!searchValue) return;

        navigate(
            `${Path.Search}?query=${encodeURIComponent(searchValue)}`
        );
    };


    useEffect(() => {
        if (!popularMovies?.results.length) return;

        const index = Math.floor(Math.random() * popularMovies.results.length);
        setRandomMovie(popularMovies.results[index]);
    }, [popularMovies]);


    return (
        <>
            <HeroBanner movie={randomMovie}>
                <PageContainer>
                    <Box
                        sx={{
                            width: 600,
                            p: 5,
                            borderRadius: 4,

                            backdropFilter: "blur(4px)",
                            WebkitBackdropFilter: "blur(16px)",

                            background: "rgba(20,20,20,0.25)",
                            boxShadow: "0 8px 32px rgba(0,0,0,.3)",
                        }}
                    >
                        <Typography variant="h1"
                                    sx={{
                                        color: "white",
                                    }}
                        >
                            WELCOME!
                        </Typography>
                        <Typography variant="h4"
                                    sx={{
                                        color: "white",
                                    }}
                        >
                            Browse highlighted titles from TMDB
                        </Typography>
                            {isPopularLoading ? (
                                <Box sx={{mt: 3}}>
                                    <Skeleton variant="text" width="70%" sx={{bgcolor: "rgba(255,255,255,0.22)", fontSize: "3rem"}}/>
                                    <Skeleton variant="text" width="85%" sx={{bgcolor: "rgba(255,255,255,0.18)", fontSize: "2rem"}}/>
                                </Box>
                            ) : null}
                            <SearchBar value={value} setValue={setValue} onSearch={onSearchHandler}/>
                    </Box>
                </PageContainer>
            </HeroBanner>
            <PageContainer>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 10
                }}>
                    <h3>Popular Movies</h3>
                    <Button component={NavLink} to={Path.CategoryMovies.replace(":category", "popular")}>
                        view all
                    </Button>
                </Box>
                {isPopularError && (
                    <ErrorAlert
                        error={popularError}
                        message="Failed to load popular movies"
                        onRetry={refetchPopularMovies}
                    />
                )}
                <MovieList movies={popularMovies?.results.slice(0, 6) ?? []} isLoading={isPopularLoading}/>


                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 10
                }}>
                    <h3>Top Rated Movies</h3>
                    <Button component={NavLink} to={Path.CategoryMovies.replace(":category", "top_rated")}>
                        view all
                    </Button>
                </Box>
                {isTopRatedError && (
                    <ErrorAlert
                        error={topRatedError}
                        message="Failed to load top rated movies"
                        onRetry={refetchTopRatedMovies}
                    />
                )}
                <MovieList movies={topRatedMovies?.results.slice(0, 6) ?? []} isLoading={isTopRatedLoading}/>


                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 10
                }}>
                    <h3>Upcoming Movies</h3>
                    <Button component={NavLink} to={Path.CategoryMovies.replace(":category", "upcoming")}>
                        view all
                    </Button>
                </Box>
                {isUpcomingError && (
                    <ErrorAlert
                        error={upcomingError}
                        message="Failed to load upcoming movies"
                        onRetry={refetchUpcomingMovies}
                    />
                )}
                <MovieList movies={upcomingMovies?.results.slice(0, 6) ?? []} isLoading={isUpcomingLoading}/>


                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 10
                }}>
                    <h3>Now Playing Movies</h3>
                    <Button component={NavLink} to={Path.CategoryMovies.replace(":category", "now_playing")}>
                        view all
                    </Button>
                </Box>
                {isNowPlayingError && (
                    <ErrorAlert
                        error={nowPlayingError}
                        message="Failed to load now playing movies"
                        onRetry={refetchNowPlayingMovies}
                    />
                )}
                <MovieList movies={nowPlayingMovies?.results.slice(0, 6) ?? []} isLoading={isNowPlayingLoading}/>


            </PageContainer>
        </>
    );
};


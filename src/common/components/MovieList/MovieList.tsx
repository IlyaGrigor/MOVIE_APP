import {Grid} from "@mui/material";
import type {MovieType} from "../../../Features/Movie/api/movieApi.types";
import {MovieCard, MovieCardSkeleton} from "../MovieCard/MovieCard";

type MovieListType = {
    movies: MovieType[]
    isLoading?: boolean
    skeletonCount?: number
}
export const MovieList = ({movies, isLoading = false, skeletonCount = 6}: MovieListType) => {
    if (isLoading) {
        return (
            <Grid container spacing={3}>
                {Array.from({length: skeletonCount}).map((_, index) => (
                    <Grid size={{xs: 12, sm: 6, md: 2}} key={index}>
                        <MovieCardSkeleton/>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {movies.map((movie) => (
            <Grid size={{xs: 12, sm: 6, md: 2}} key={movie.id}>
                <MovieCard movie={movie}/>
            </Grid>
            ))}
        </Grid>
    );
};


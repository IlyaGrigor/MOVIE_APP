import type {MovieCategory} from "../../../common/components/Pages/CategoryMovies/CategoryMovies";
import type {z} from "zod";
import type {getGenresResponseSchema, getMoviesResponseSchema} from "./moviesApi.schemas";

export type GetMoviesResponse = z.infer<typeof getMoviesResponseSchema>;

export type GetMoviesByCategoryArgs = {
    category: MovieCategory;
    page: number;
};

export type SortOption =
    | "popularity.desc"
    | "popularity.asc"
    | "vote_average.desc"
    | "vote_average.asc"
    | "release_date.desc"
    | "release_date.asc";

export type DiscoverMoviesParams = {
    page: number;
    sortBy: SortOption;
    ratingFrom: number;
    ratingTo: number;
    genres: number[];
};

export type GetGenresResponse = z.infer<typeof getGenresResponseSchema>;

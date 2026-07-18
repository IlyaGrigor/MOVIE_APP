import {baseApi} from "../../../app/baseApi";
import type {
    DiscoverMoviesParams,
    GetGenresResponse,
    GetMoviesByCategoryArgs,
    GetMoviesResponse
} from "./movies.Api.types";
import {getGenresResponseSchema, getMoviesResponseSchema} from "./moviesApi.schemas";

export const moviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPopularMovies: build.query<GetMoviesResponse, void>({
            query: () => "movie/popular",
            transformResponse: (response: unknown) => getMoviesResponseSchema.parse(response),
        }),
        getMoviesByCategory: build.query<GetMoviesResponse, GetMoviesByCategoryArgs>({
            query: ({category, page}) => `movie/${category}?page=${page}`,
            transformResponse: (response: unknown) => getMoviesResponseSchema.parse(response),
        }),
        getSimilarMovies: build.query<GetMoviesResponse, number>({
            query: (movieId) => `movie/${movieId}/similar`,
            transformResponse: (response: unknown) => getMoviesResponseSchema.parse(response),
        }),
        getFilteredMovies: build.query<GetMoviesResponse, DiscoverMoviesParams>({
            query: ({page, sortBy, ratingFrom, ratingTo, genres,}) => ({
                url: "discover/movie",
                params: {
                    page,
                    sort_by: sortBy,

                    // Рейтинг фильма
                    "vote_average.gte": ratingFrom,
                    "vote_average.lte": ratingTo,

                    // Не показывать фильмы без голосов
                    "vote_count.gte": 100,

                    // ID жанров превращаем в строку:
                    // [28, 12] -> "28,12"
                    with_genres: genres.length
                        ? genres.join(",")
                        : undefined,
                },
            }),
            transformResponse: (response: unknown) => getMoviesResponseSchema.parse(response),
        }),
        getGenres: build.query<GetGenresResponse, void>({
            query: () => "genre/movie/list",
            transformResponse: (response: unknown) => getGenresResponseSchema.parse(response),
        }),
        getSearchMovies: build.query<GetMoviesResponse, { query: string; page: number }>({
            query: ({query, page}) => ({
                url: "search/movie",
                params: {
                    query,
                    page,
                },
            }),
            transformResponse: (response: unknown) => getMoviesResponseSchema.parse(response),
        }),
    })
})

export const {
    useGetPopularMoviesQuery,
    useGetMoviesByCategoryQuery,
    useGetSimilarMoviesQuery,
    useGetFilteredMoviesQuery,
    useGetGenresQuery,
    useGetSearchMoviesQuery,
} = moviesApi

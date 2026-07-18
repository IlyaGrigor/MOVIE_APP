import {baseApi} from "../../../app/baseApi";
import type {ConfigurationResponse, MovieCreditsResponse, MovieDetailsResponse} from "./movieApi.types";
import {
    configurationResponseSchema,
    movieCreditsResponseSchema,
    movieDetailsResponseSchema
} from "./movieApi.schemas";

export const movieApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMovieDetails: build.query<MovieDetailsResponse, number>({
            query: (movieId) => `movie/${movieId}`,
            transformResponse: (response: unknown) => movieDetailsResponseSchema.parse(response),
        }),
        getMovieCredits: build.query<MovieCreditsResponse, number>({
            query: (movieId) => `movie/${movieId}/credits`,
            transformResponse: (response: unknown) => movieCreditsResponseSchema.parse(response),
        }),
        getConfiguration: build.query<ConfigurationResponse, void>({
            query: () => "configuration",
            transformResponse: (response: unknown) => configurationResponseSchema.parse(response),
        }),
    })
})


export const {
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetConfigurationQuery

} = movieApi

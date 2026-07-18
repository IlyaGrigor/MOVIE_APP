import {z} from "zod";
import {genreSchema, movieSchema} from "../../Movie/api/movieApi.schemas";

export const getMoviesResponseSchema = z.object({
    page: z.number(),
    results: z.array(movieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export const getGenresResponseSchema = z.object({
    genres: z.array(genreSchema),
});

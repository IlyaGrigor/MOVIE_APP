import type {z} from "zod";
import type {
    configurationResponseSchema,
    genreSchema,
    movieCreditsResponseSchema,
    movieDetailsResponseSchema,
    movieSchema,
} from "./movieApi.schemas";

export type MovieType = z.infer<typeof movieSchema>;
export type MovieDetailsResponse = z.infer<typeof movieDetailsResponseSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type MovieCreditsResponse = z.infer<typeof movieCreditsResponseSchema>;
export type ConfigurationResponse = z.infer<typeof configurationResponseSchema>;


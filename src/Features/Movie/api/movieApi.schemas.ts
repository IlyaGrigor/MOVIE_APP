import {z} from "zod";

const nullableStringSchema = z.string().nullable();

export const movieSchema = z.object({
    adult: z.boolean(),
    backdrop_path: nullableStringSchema,
    genre_ids: z.array(z.number()),
    id: z.number(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: nullableStringSchema,
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const genreSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const collectionSchema = z.object({
    id: z.number(),
    name: z.string(),
    poster_path: nullableStringSchema,
    backdrop_path: nullableStringSchema,
});

const productionCompanySchema = z.object({
    id: z.number(),
    logo_path: nullableStringSchema,
    name: z.string(),
    origin_country: z.string(),
});

const productionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});

const spokenLanguageSchema = z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string(),
});

export const movieDetailsResponseSchema = z.object({
    adult: z.boolean(),
    backdrop_path: nullableStringSchema,
    belongs_to_collection: collectionSchema.nullable(),
    budget: z.number(),
    genres: z.array(genreSchema),
    homepage: z.string(),
    id: z.number(),
    imdb_id: nullableStringSchema,
    origin_country: z.array(z.string()),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: nullableStringSchema,
    production_companies: z.array(productionCompanySchema),
    production_countries: z.array(productionCountrySchema),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(spokenLanguageSchema),
    status: z.string(),
    tagline: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

const personSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: nullableStringSchema,
});

const castMemberSchema = personSchema.extend({
    cast_id: z.number(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
});

const crewMemberSchema = personSchema.extend({
    credit_id: z.string(),
    department: z.string(),
    job: z.string(),
});

export const movieCreditsResponseSchema = z.object({
    id: z.number(),
    cast: z.array(castMemberSchema),
    crew: z.array(crewMemberSchema),
});

export const configurationResponseSchema = z.object({
    images: z.object({
        base_url: z.string(),
        secure_base_url: z.string(),
        backdrop_sizes: z.array(z.string()),
        logo_sizes: z.array(z.string()),
        poster_sizes: z.array(z.string()),
        profile_sizes: z.array(z.string()),
        still_sizes: z.array(z.string()),
    }),
    change_keys: z.array(z.string()),
});

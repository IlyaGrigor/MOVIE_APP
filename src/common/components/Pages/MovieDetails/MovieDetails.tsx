import {Box, Chip, Rating, Skeleton, Tooltip, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useGetMovieCreditsQuery, useGetMovieDetailsQuery,} from "../../../../Features/Movie/api/movieApi";
import {useGetSimilarMoviesQuery} from "../../../../Features/Movies/api/moviesApi";
import {IMAGE} from "../../../constants/images";
import {ErrorAlert} from "../../ErrorAlert/ErrorAlert";
import {MovieList} from "../../MovieList/MovieList";
import {PageContainer} from "../../PageContainer/PageContainer";
import no_poster from "../../../../assets/poster_unavailable.png"
import no_avatar from "../../../../assets/no_avatar.png"

export const MovieDetails = () => {

    const {movieId} = useParams<{ movieId: string }>();
    const parsedMovieId = Number(movieId);
    const hasValidMovieId = Number.isFinite(parsedMovieId) && parsedMovieId > 0;


    const {
        data: movieDetails,
        isLoading: isMovieLoading,
        isError: isMovieError,
        error: movieError,
        refetch: refetchMovieDetails,
    } = useGetMovieDetailsQuery(parsedMovieId, {
        skip: !hasValidMovieId
    });

    const {
        data: credits,
        isLoading: isCreditsLoading,
        isError: isCreditsError,
        error: creditsError,
        refetch: refetchCredits,
    } = useGetMovieCreditsQuery(parsedMovieId, {
        skip: !hasValidMovieId
    });

    const {
        data: similarMovies,
        isLoading: isSimilarMoviesLoading,
        isError: isSimilarMoviesError,
        error: similarMoviesError,
        refetch: refetchSimilarMovies,
    } = useGetSimilarMoviesQuery(parsedMovieId, {
        skip: !hasValidMovieId
    })

    if (!hasValidMovieId) {
        return (
            <PageContainer>
                <ErrorAlert message="Movie id is invalid"/>
            </PageContainer>
        );
    }

    if (isMovieLoading) {
        return (
            <PageContainer>
                <MovieDetailsSkeleton/>
            </PageContainer>
        );
    }

    if (isMovieError) {
        return (
            <PageContainer>
                <ErrorAlert
                    error={movieError}
                    message="Failed to load movie details"
                    onRetry={refetchMovieDetails}
                />
            </PageContainer>
        );
    }

    if (!movieDetails) {
        return (
            <PageContainer>
                <ErrorAlert message="Movie details are unavailable"/>
            </PageContainer>
        );
    }

    const runtime = movieDetails.runtime ?? 0;
    const year = movieDetails.release_date.slice(0, 4) ?? 0;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const cast = credits?.cast.slice(0, 6) ?? [];
    const similarMoviesArr =
        similarMovies?.results.slice(0, 6) ?? [];

    return (
        <PageContainer>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                mt: 10,
                gap: 10
            }}>
                <Box>
                    <Box
                        component="img"
                        src={movieDetails.poster_path ? `${IMAGE.profileLarge}${movieDetails.poster_path}` : no_poster}
                        alt={movieDetails.title}
                        style={{
                            borderRadius: 16,
                        }}
                        sx={{
                            width: 342,
                            height: 513,
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                            }}
                            gutterBottom
                        >
                            {movieDetails.title}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: "text.primary",
                                mb: 2,
                            }}
                        >
                            {year}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <Rating
                                value={movieDetails.vote_average / 2}
                                precision={0.1}
                                readOnly
                            />

                            <Typography variant="body1">
                                {movieDetails.vote_average.toFixed(1)}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: 20,
                            lineHeight: 1.8,
                            color: "text.secondary",
                            maxWidth: 700,
                            mb: 5,
                        }}
                    >
                        {movieDetails.overview}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: 1.2,
                            color: "text.secondary",
                            mb: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: "text.primary",
                                mb: 4,
                            }}
                        >
                            {hours}h {minutes}m
                        </Typography>
                    </Typography>

                    <div>
                        <Typography
                            sx={{
                                fontSize: 22,
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Genres
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1.5,
                                mt: 1,
                            }}
                        >
                            {movieDetails.genres.map((genre) => (
                                <Chip
                                    key={genre.id}
                                    label={genre.name}
                                    sx={(theme) => ({
                                        bgcolor: theme.palette.action.hover,
                                        color: theme.palette.text.primary,
                                        borderRadius: "999px",
                                        fontWeight: 500,
                                        px: 0.5,
                                        "&:hover": {
                                            bgcolor: theme.palette.action.selected,
                                        },
                                    })}
                                />
                            ))}
                        </Box>
                    </div>
                </Box>
            </Box>

            <Box sx={{mt: 4}}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 3,
                    }}
                >
                    Cast
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 200px)",
                            justifyContent: "center",
                            gap: 6,
                            mt: 4,
                        }}
                    >
                        {isCreditsError
                            ? (
                                <ErrorAlert
                                    error={creditsError}
                                    message="Failed to load cast"
                                    onRetry={refetchCredits}
                                />
                            )
                            : isCreditsLoading
                                ? Array.from({ length: 6 }).map((_, index) => (
                                    <CastMemberSkeleton key={index} />
                                ))
                                : cast.map((actor) => (
                                    <Box
                                        key={actor.credit_id}
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={
                                                actor.profile_path
                                                    ? `${IMAGE.profileLarge}${actor.profile_path}`
                                                    : no_avatar
                                            }
                                            alt={actor.name}
                                            sx={{
                                                width: 200,
                                                height: 200,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                mx: "auto",
                                                mb: 1,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                color: "text.primary",
                                            }}
                                        >
                                            {actor.name}
                                        </Typography>

                                        <Tooltip
                                            title={actor.character}
                                            disableHoverListener={actor.character.length <= 16}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 18,
                                                    color: "text.secondary",
                                                    mt: 0.5,
                                                }}
                                            >
                                                {actor.character.length > 16
                                                    ? `${actor.character.slice(0, 16)}...`
                                                    : actor.character}
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                ))}
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: 10
            }}>
                <h3>Similar Movies</h3>
            </Box>
            {isSimilarMoviesError && (
                <ErrorAlert
                    error={similarMoviesError}
                    message="Failed to load similar movies"
                    onRetry={refetchSimilarMovies}
                />
            )}
            <MovieList movies={similarMoviesArr} isLoading={isSimilarMoviesLoading}/>

        </PageContainer>
    );
}

const MovieDetailsSkeleton = () => {
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                mt: 10,
                gap: 10
            }}>
                <Skeleton variant="rounded" width={500} height={750}/>

                <Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                    <Skeleton variant="text" width="75%" sx={{fontSize: "4rem"}}/>
                    <Skeleton variant="text" width="35%" sx={{fontSize: "2rem", mb: 4}}/>
                    <Skeleton variant="rounded" width="100%" height={180} sx={{mb: 5}}/>
                    <Skeleton variant="text" width="20%" sx={{fontSize: "2rem", mb: 4}}/>
                    <Skeleton variant="text" width="18%" sx={{fontSize: "2rem"}}/>
                    <Box sx={{display: "flex", gap: 1.5, mt: 1}}>
                        {Array.from({length: 4}).map((_, index) => (
                            <Skeleton key={index} variant="rounded" width={86} height={32}/>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box sx={{mt: 4}}>
                <Skeleton variant="text" width={120} sx={{fontSize: "2rem", mb: 3}}/>
                <Box sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    {Array.from({length: 6}).map((_, index) => (
                        <CastMemberSkeleton key={index}/>
                    ))}
                </Box>
            </Box>
        </>
    );
};

const CastMemberSkeleton = () => {
    return (
        <Box sx={{textAlign: "center", width: 200}}>
            <Skeleton
                variant="circular"
                width={200}
                height={200}
                sx={{mx: "auto", mb: 1}}
            />
            <Skeleton variant="text" sx={{fontSize: "1.5rem"}}/>
            <Skeleton variant="text" width="70%" sx={{mx: "auto", fontSize: "1.25rem"}}/>
        </Box>
    );
};

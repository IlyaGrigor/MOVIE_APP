import {Box, LinearProgress, Pagination} from "@mui/material";
import {useState} from "react";
import {MovieFilters} from "../../../../Features/Filtration/FilterPanel/FilterPanel";
import type {DiscoverMoviesParams} from "../../../../Features/Movies/api/movies.Api.types";
import {useGetFilteredMoviesQuery,} from "../../../../Features/Movies/api/moviesApi";
import {ErrorAlert} from "../../ErrorAlert/ErrorAlert";
import {MovieList} from "../../MovieList/MovieList";
import {PageContainer} from "../../PageContainer/PageContainer";

const initialFilters: DiscoverMoviesParams = {
    page: 1,
    sortBy: "popularity.desc",
    ratingFrom: 0,
    ratingTo: 10,
    genres: [],
};

export const FilteredMovies = () => {
    const [filters, setFilters] =
        useState<DiscoverMoviesParams>(initialFilters);

    const {data, isLoading, isFetching, isError, error, refetch} = useGetFilteredMoviesQuery(filters);

    return (
        <>
                <PageContainer>
                    <Box
                        sx={{
                            py: 4,
                        }}
                    >
                        <MovieFilters
                            filters={filters}
                            onChange={setFilters}
                        />

                        <Box sx={{mt: 4}}>
                            {isFetching && !isLoading && (
                                <LinearProgress sx={{mb: 3}}/>
                            )}

                            {isError && (
                                <ErrorAlert
                                    error={error}
                                    message="Failed to load movies"
                                    onRetry={refetch}
                                />
                            )}

                            {(data || isLoading) && (
                                <>
                                    <Box
                                        sx={{
                                            opacity:
                                                isFetching && !isLoading
                                                    ? 0.5
                                                    : 1,
                                            transition: "opacity 0.2s",
                                        }}
                                    >
                                        <MovieList
                                            movies={data?.results ?? []}
                                            isLoading={isLoading}
                                            skeletonCount={12}
                                        />
                                    </Box>

                                    {data && (
                                        <Pagination
                                            page={filters.page}
                                            count={Math.min(
                                                data.total_pages,
                                                500,
                                            )}
                                            onChange={(_, page) => {
                                                setFilters((previousFilters) => ({
                                                    ...previousFilters,
                                                    page,
                                                }));
                                            }}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                mt: 4,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </PageContainer>
        </>
    );
};

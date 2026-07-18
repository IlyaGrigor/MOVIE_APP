import {
    Box,
    LinearProgress,
    Pagination,
    Typography,
} from "@mui/material";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {MovieList} from "../../common/components/MovieList/MovieList";
import {PageContainer} from "../../common/components/PageContainer/PageContainer";
import {SearchBar} from "../../common/components/SearchBar/SearchBar";
import {ErrorAlert} from "../../common/components/ErrorAlert/ErrorAlert";
import {useGetSearchMoviesQuery} from "../Movies/api/moviesApi";


export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("query") ?? "";

    const [value, setValue] = useState(query);
    const [pagesByQuery, setPagesByQuery] = useState<Record<string, number>>({});
    const page = pagesByQuery[query] ?? 1;

    const {data, isLoading, isFetching, isError, error, refetch} = useGetSearchMoviesQuery({query, page,}, {skip: !query,},);

    const onSearchHandler = () => {
        const trimmedValue = value.trim();

        if (!trimmedValue) return;

        setSearchParams({
            query: trimmedValue,
        });
        setPagesByQuery((previousPages) => ({
            ...previousPages,
            [trimmedValue]: 1,
        }));
    };

    return (
        <PageContainer>
            <Typography variant="h4"
                        sx={{
                            color: "text.primary",
                            fontWeight: 600,
                            fontSize: "2rem",
                            mt: 2,
                            mb: 4,
                        }}>
                Discover a large movie database!
            </Typography>
            <SearchBar
                value={value}
                setValue={setValue}
                onSearch={onSearchHandler}
            />

            {query && (
                <Typography
                    variant="h4"
                    sx={{my: 3}}
                >
                    Search results for: “{query}”
                </Typography>
            )}

            {isFetching && !isLoading && <LinearProgress sx={{mb: 3}}/>}

            {isError && (
                <ErrorAlert
                    error={error}
                    message="Failed to load movies"
                    onRetry={refetch}
                />
            )}

            {!isLoading && query && data?.results.length === 0 && (
                <Typography>
                    Nothing found
                </Typography>
            )}

            {(isLoading || (data && data.results.length > 0)) && (
                <>
                    <div
                        style={{
                            opacity: isFetching && !isLoading ? 0.5 : 1,
                        }}
                    >
                        <MovieList
                            movies={data?.results ?? []}
                            isLoading={isLoading}
                            skeletonCount={12}
                        />
                    </div>

                    {data && (
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <Pagination
                                page={page}
                                count={Math.min(data.total_pages, 500)}
                                onChange={(_, newPage) => {
                                    setPagesByQuery((previousPages) => ({
                                        ...previousPages,
                                        [query]: newPage,
                                    }));
                                    localStorage.setItem(`page-${query}`, newPage.toString());
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </PageContainer>
    );
};

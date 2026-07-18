import {
    Box,
    Button,
    Chip,
    FormControl,
    MenuItem,
    Select,
    Slider,
    Typography,
} from "@mui/material";
import {ErrorAlert} from "../../../common/components/ErrorAlert/ErrorAlert";
import type {
    DiscoverMoviesParams,
    SortOption,
} from "../../Movies/api/movies.Api.types";
import {useGetGenresQuery} from "../../Movies/api/moviesApi";

type FiltersProps = {
    filters: DiscoverMoviesParams;
    onChange: (filters: DiscoverMoviesParams) => void;
};

export const MovieFilters = ({
                                 filters,
                                 onChange,
                             }: FiltersProps) => {
    const {
        data,
        isError,
        error,
        refetch,
    } = useGetGenresQuery();

    const genres = data?.genres ?? [];

    const toggleGenre = (selectedGenreId: number) => {
        const genreExists =
            filters.genres.includes(selectedGenreId);

        const newGenres = genreExists
            ? filters.genres.filter(
                (genreId) => genreId !== selectedGenreId,
            )
            : [...filters.genres, selectedGenreId];

        onChange({
            ...filters,
            genres: newGenres,
            page: 1,
        });
    };

    const resetFilters = () => {
        onChange({
            page: 1,
            sortBy: "popularity.desc",
            ratingFrom: 0,
            ratingTo: 10,
            genres: [],
        });
    };

    return (
        <Box
            sx={{
                width: "100%",
                p: 3,
                borderRadius: 3,
                bgcolor: "background.paper",
            }}
        >
            <Typography
                variant="h6"
                sx={{mb: 3}}
            >
                Filters / Sort
            </Typography>

            {isError && (
                <ErrorAlert
                    error={error}
                    message="Failed to load genres"
                    onRetry={refetch}
                />
            )}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: 3,
                }}
            >
                <Box
                    sx={{
                        width: 220,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{mb: 1}}
                    >
                        Sort by
                    </Typography>

                    <FormControl
                        fullWidth
                        size="small"
                    >
                        <Select
                            value={filters.sortBy}
                            onChange={(event) => {
                                onChange({
                                    ...filters,
                                    sortBy:
                                        event.target
                                            .value as SortOption,
                                    page: 1,
                                });
                            }}
                        >
                            <MenuItem value="popularity.desc">
                                Popularity ↓
                            </MenuItem>

                            <MenuItem value="popularity.asc">
                                Popularity ↑
                            </MenuItem>

                            <MenuItem value="vote_average.desc">
                                Rating ↓
                            </MenuItem>

                            <MenuItem value="vote_average.asc">
                                Rating ↑
                            </MenuItem>

                            <MenuItem value="release_date.desc">
                                Release date ↓
                            </MenuItem>

                            <MenuItem value="release_date.asc">
                                Release date ↑
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        width: 260,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography variant="body2">
                            Rating
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {filters.ratingFrom} –{" "}
                            {filters.ratingTo}
                        </Typography>
                    </Box>

                    <Slider
                        value={[
                            filters.ratingFrom,
                            filters.ratingTo,
                        ]}
                        min={0}
                        max={10}
                        step={0.5}
                        valueLabelDisplay="auto"
                        onChange={(_, newValue) => {
                            const [
                                ratingFrom,
                                ratingTo,
                            ] = newValue as number[];

                            onChange({
                                ...filters,
                                ratingFrom,
                                ratingTo,
                                page: 1,
                            });
                        }}
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={resetFilters}
                    sx={{
                        height: 40,
                        minWidth: 150,
                    }}
                >
                    Reset filters
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 3,
                }}
            >
                {genres.map((genre) => {
                    const selected =
                        filters.genres.includes(genre.id);

                    return (
                        <Chip
                            key={genre.id}
                            label={genre.name}
                            size="small"
                            clickable
                            color={
                                selected
                                    ? "primary"
                                    : "default"
                            }
                            variant={
                                selected
                                    ? "filled"
                                    : "outlined"
                            }
                            onClick={() =>
                                toggleGenre(genre.id)
                            }
                        />
                    );
                })}
            </Box>
        </Box>
    );
};
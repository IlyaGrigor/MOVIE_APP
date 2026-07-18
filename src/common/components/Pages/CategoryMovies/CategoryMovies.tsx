import {Box, Pagination} from "@mui/material";
import {useState} from "react";
import {NavLink, useParams} from "react-router-dom"
import {useGetMoviesByCategoryQuery} from "../../../../Features/Movies/api/moviesApi";
import {ErrorAlert} from "../../ErrorAlert/ErrorAlert";
import {MovieList} from "../../MovieList/MovieList";
import {PageContainer} from "../../PageContainer/PageContainer";

export type MovieCategory =
    | "popular"
    | "top_rated"
    | "upcoming"
    | "now_playing"

const categories = [
    { title: "Popular", path: "/movies/popular" },
    { title: "Top Rated", path: "/movies/top_rated" },
    { title: "Upcoming", path: "/movies/upcoming" },
    { title: "Now Playing", path: "/movies/now_playing" },
];

const navLinkStyles = {
    px: 4,
    py: 2,
    borderRadius: 2,
    textDecoration: "none",
    color: "text.primary",

    "&:hover": {
        bgcolor: "action.hover",
    },

    "&.active": {
        bgcolor: "primary.main",
        color: "primary.contrastText",
    },
};

export const CategoryMovies = () => {
    const {category = "popular"} = useParams<{ category: MovieCategory }>()

    const [pagesByCategory, setPagesByCategory] = useState<Record<string, number>>(() => {
        return {
            [category]: Number(localStorage.getItem(`page-${category}`)) || 1,
        };
    });

    const page = pagesByCategory[category] ?? (Number(localStorage.getItem(`page-${category}`)) || 1);
    const {data: movies, isLoading, isFetching, isError, error, refetch} = useGetMoviesByCategoryQuery({category, page})
    const currentCategory = categories.find(
        item => item.path === `/movies/${category}`
    );

    return (
            <PageContainer>
                <Box
                    component="nav"
                    sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center"
                    }}
                >
                    {categories.map((category) => (
                        <Box
                            key={category.path}
                            component={NavLink}
                            to={category.path}
                            sx={navLinkStyles}
                        >
                            {category.title}
                        </Box>
                    ))}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <h1>{currentCategory?.title}</h1>
                </Box>
                <Box
                    sx={{
                        opacity: isFetching && !isLoading ? 0.5 : 1,
                        transition: "opacity 0.2s",
                    }}
                >
                    {isError && (
                        <ErrorAlert
                            error={error}
                            message="Failed to load movies"
                            onRetry={refetch}
                        />
                    )}
                    <MovieList
                        movies={movies?.results ?? []}
                        isLoading={isLoading}
                        skeletonCount={12}
                    />
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                }}>
                    <Pagination
                        count={movies?.total_pages ?? 1}
                        page={page}
                        onChange={(_, value) => {
                            setPagesByCategory((previousPages) => ({
                                ...previousPages,
                                [category]: value,
                            }));
                            localStorage.setItem(`page-${category}`, value.toString());
                        }}
                        color="primary"
                    />
                </Box>
            </PageContainer>
    )
}

import {Box, Card, CardContent, IconButton, Skeleton, Tooltip, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {NavLink} from "react-router-dom";
import {selectFavorites, toggleFavorite} from "../../../Features/Favorites/model/favoritesSlice";
import type {MovieType} from "../../../Features/Movie/api/movieApi.types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {IMAGE} from "../../constants/images";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import no_poster from "../../../assets/poster_unavailable.png";

export type MovieCardType = {
    movie: MovieType,
}

export const MovieCardSkeleton = () => {
    return (
        <Card
            sx={{
                width: 220,
                borderRadius: 4,
            }}
        >
            <Skeleton variant="rectangular" width={220} height={330}/>

            <CardContent>
                <Skeleton variant="text" sx={{fontSize: "1.25rem"}}/>
                <Skeleton variant="text" width="45%"/>
            </CardContent>
        </Card>
    );
};


export const MovieCard = ({movie}: MovieCardType) => {

    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);

    const isFavorite = favorites.some(favorite => favorite.id === movie.id);

    return (
        <NavLink to={`/movie/${movie.id}`}
                 style={{
                     textDecoration: "none",
                     color: "inherit",
                 }}
        >
            <Card sx={{
                width: 220,
                borderRadius: 4,
                transition: "transform 0.25s ease",

                "&:hover": {
                    transform: "scale(1.04)",
                },

            }}>
                <Box sx={{position: "relative"}}>
                    <CardMedia
                        component="img"
                        height="330"
                        image= {movie.poster_path
                            ? `${IMAGE.poster}${movie.poster_path}`
                            : no_poster}

                        alt={movie.title}
                    />
                    <IconButton
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            dispatch(toggleFavorite(movie));
                        }}
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bgcolor: "rgba(0, 0, 0, 0.45)",
                            color: "white",
                            "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.65)",
                            },
                        }}
                    >
                        {isFavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                    </IconButton>
                </Box>

                <CardContent>
                    <Tooltip title={movie.title}
                             disableHoverListener={movie.title.length <= 14}
                             slotProps={{
                                 tooltip: {
                                     sx: {
                                         fontSize: 16,
                                     },
                                 },
                             }}>
                        <Typography variant="h6">
                            {
                                movie.title.length >= 14 ?
                                    `${movie.title.slice(0, 14)}...` : movie.title
                            }
                        </Typography>
                    </Tooltip>

                    <Typography variant="body2">
                        ⭐ {Math.round(movie.vote_average * 2) / 2}
                    </Typography>
                </CardContent>
            </Card>
        </NavLink>
    );
};


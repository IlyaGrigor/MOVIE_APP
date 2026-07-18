import { Box } from "@mui/material"
import type { ReactNode } from "react"
import type {MovieType} from "../../../Features/Movie/api/movieApi.types";


type Props = {
    movie: MovieType | null
    children: ReactNode
}

export const HeroBanner = ({ movie, children }: Props) => {
    return (
        <Box
            sx={{
                minHeight: "950px",
                backgroundImage: movie
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    )
}
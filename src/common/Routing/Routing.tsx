import {Route, Routes} from "react-router-dom";
import {Search} from "../../Features/Search/Search";
import {CategoryMovies} from "../components/Pages/CategoryMovies/CategoryMovies";
import {Favorites} from "../components/Pages/Favorites/Favorites";
import {FilteredMovies} from "../components/Pages/FilteredMovies/FilteredMovies";
import {MainPage} from "../components/Pages/Main/MainPage";
import {MovieDetails} from "../components/Pages/MovieDetails/MovieDetails";
import {PageNotFound} from "../components/Pages/PageNotFound/PageNotFound";
import {Path} from "../constants/Paths";

export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.Main} element={<MainPage/>} />
            <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
            <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
            <Route path={Path.MovieDetails} element={<MovieDetails />} />
            <Route path={Path.Favorites} element={<Favorites />} />
            <Route path={Path.NotFound} element={<PageNotFound />} />
            <Route path={Path.Search} element={<Search/>}/>
        </Routes>
    )
}
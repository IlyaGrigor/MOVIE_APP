import {selectFavorites} from "../../../../Features/Favorites/model/favoritesSlice";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {MovieList} from "../../MovieList/MovieList";
import {PageContainer} from "../../PageContainer/PageContainer";


export const Favorites = () => {

    const favorites = useAppSelector(selectFavorites);

    return (
        <PageContainer>
            <MovieList movies={favorites}/>
        </PageContainer>
    );
}
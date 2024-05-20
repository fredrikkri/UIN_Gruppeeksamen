import { useEffect, useState } from "react"
import { fetchFavoritesUser1AndWishlistUser2, fetchWishlistUser1AndFavoritesUser2 } from "../../services/userServices";
import { getMovies, options } from "../App";
import MovieCard from "./MovieCard";

export default function WishlistAndFavorites({user, friend}){

    const [user1WishlistUser2Favorites, setUser1WishlistUser2Favorites] = useState(null)
    const [user1FavoritesUser2Wishlist, setUser1FavoritesUser2Wishlist] = useState(null)
    const [sharedFavWishIds, setSharedFavWishIds] = useState("")
    const [sharedWishFavIds, setSharedWishFavIds] = useState("")
    const [sharedWishlistUrl, setSharedWishlistUrl] = useState(null)
    const [sharedFavoritesUrl, setSharedFavoritesUrl] = useState(null)
    const [sharedWishlist, setSharedWishlist] = useState(null)
    const [sharedFavorites, setSharedFavorites] = useState(null)
    const [finalResult, setFinalResult] = useState({})


    useEffect(() => {
        const getResultFavAndWishlist = async () => {
            const FavWishdata = await fetchFavoritesUser1AndWishlistUser2(user.name, friend.name);
            setUser1WishlistUser2Favorites(FavWishdata);
            const wishFavdata = await fetchWishlistUser1AndFavoritesUser2(user.name, friend.name);
            setUser1FavoritesUser2Wishlist(wishFavdata);
          };
          getResultFavAndWishlist()
    },[user, friend])

    useEffect(() => {
        if (user1WishlistUser2Favorites?.sharedMovies) {
            const wishlistIds = user1WishlistUser2Favorites.sharedMovies.join(",");
            setSharedFavWishIds(wishlistIds);
        }
        if (user1FavoritesUser2Wishlist?.sharedMovies){
            const favoritesIds = user1FavoritesUser2Wishlist.sharedMovies.join(",");
            setSharedWishFavIds(favoritesIds);
        }
    }, [user1WishlistUser2Favorites, user1FavoritesUser2Wishlist]);

    useEffect(() => {
        if (sharedFavWishIds) {
            const wishlistUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedFavWishIds}&info=base_info`;
            setSharedWishlistUrl(wishlistUrl);            
        }
        if (sharedWishFavIds){
            const favoritesUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${sharedWishFavIds}&info=base_info`;
            setSharedFavoritesUrl(favoritesUrl);
        }
    }, [sharedFavWishIds, sharedWishFavIds]);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            if (sharedWishlistUrl) {
                const wishlist = await getMovies(sharedWishlistUrl, options);
                setSharedWishlist(wishlist);
            }
            if (sharedFavoritesUrl) {
                const favorites = await getMovies(sharedFavoritesUrl, options);
                setSharedFavorites(favorites)
            }
        };
        fetchMoviesDetails();
    }, [sharedWishlistUrl, sharedFavoritesUrl]);

    useEffect(()=> {
        let result = {};
        // if (sharedFavorites != null) {
        //     result = [...sharedFavorites]
        // }
        // if (sharedWishlist != null) {
        //     result = [...sharedWishlist]
        // }
        const tmp = {...sharedWishlist, ...sharedFavorites};
        setFinalResult(tmp);
    },[sharedFavorites, sharedWishlist])
    
    return(
        <>
        <section id="wishlistAndFavoritesSection">
            <h2>ØNSKELISTER OG FAVORITTER</h2>
            {finalResult?.results ? 
            <p>Dere har noen filmer som er på ønskelisten til en av dere og favorittlisten til den andre! 
                Kanskje kan en av dere få innføre den andre i en ny filmopplevelse...?!</p>
             : <p>Dere har ingen filmer til felles fra ønskelister og favoritter.</p>}
             <ul id="ul-wishlistAndFavoritesSection">
             {finalResult?.results?.map((movie, i) =>
                            <li key={i+"bus"}>
                                <MovieCard key={i+"raymondKvisvikFFK"} imdb={movie.id} title={movie.originalTitleText.text} image={movie.primaryImage?.url}/>
                            </li>
                        )}
             </ul>

        </section>
        </>
    )
}
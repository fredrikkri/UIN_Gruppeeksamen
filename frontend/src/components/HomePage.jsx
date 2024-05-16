import { FaStar } from "react-icons/fa6";
import { VscSmiley } from "react-icons/vsc";
import MovieCard from "./MovieCard";
import { fetchWishListForUser } from "../../services/movieServices";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { fetchUser } from "../../services/userServices";
import MovieCardTest from "./MovieCardTest";

export default function HomePage({user, setUser, friend, setFriend, movielist, userList}){

    const [wishList, setWishList] = useState ([])


    //Henter innhold i en ønskeliste til en bruker
    const wishListUser =  async (user) => {
        const data = await fetchWishListForUser(user)
        setWishList(data)
        console.log("wishListUser:", data, "username:", user)
    }

    
    useEffect (() => {
        wishListUser(user)
        console.log("wishlistuser:", user)
    }, [user])

    console.log("wishList1:", wishList)
    // console.log("wishlistuser:",wishListUser([].wishlist))
    // [0].wishlist
    // [0].wishlist[0]


    const getUser = async () => {
        const currentUser = await fetchUser(localStorage.getItem("username"));
        setUser(currentUser);
    }
    
    useEffect(()=> {
        getUser()
    }, [])

     //Skriver ut listen over brukerer som ikke er innlogget
    // const otherUsers = userList.filter(friends => friends !== user)

    const otherUsers = userList.filter(friends => friends.name !== user.name)
    const redirectToViewTogetherPage = useNavigate();
    // const movieWishList = movielist;
    // console.log("movielist:", movielist)

    const handleFriendClick = (user) => {
        setFriend(user)
        redirectToViewTogetherPage("/viewtogether")
    }
   

    return (
        <>
            <h1>Hei, {localStorage.getItem("username")}</h1>
            <div>
                <section id="moviesWatchLaterSection">
                    <h2><FaStar /> Filmer jeg skal se!</h2>
                    {/* {wishList?.map((movie, index) => (
                        <div key={index}>
                            <p>{movie}</p> 
                        </div>
                        ))} */}
                    {wishList?.map((movie, index) => <MovieCardTest key={index} titleSanity={movie}/>)}
                    {/* {wl?.map((movie, index) => <MovieCard key={index} titleSanity={movie}/>)} */}
                    {wishList.length > 0 ? (wishList.map((movie, index) => (
                        <MovieCardTest key={index} titleSanity={movie}/>
                        ))
                        ) : (
                            <p> Ingen filmer i ønskeliste </p>
                        )}

                    {/* {wl.length > 0 ? (wl?.map((movie, index) => (
                        <MovieCard key={index} titleSanity={movie}/>
                        ))
                        ): (
                            <p> Ingen filmer i ønskeliste </p>
                        )}   */}
                    <ul>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                    </ul>
                </section>
                <section id="wishlistSection">
                    <p>Disse filmene ligger i ønskelisten din:</p>
                    <ul>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                        <li>
                            <MovieCard />
                        </li>
                    </ul>
                    <MovieCard />
                    {/* <span className='movie-card-wrapper'>
                        {movieWishList?.map((movie, id) =>
                        <li key={id}>
                            <MovieCard key={movie?.id} 
                            title={movie?.title} 
                            imdb={movie?.imdb} 
                            moviecover={movie?.moviecover} />
                        </li>
                        )}
                    </span> */}
                </section>
                <section id="watchTogetherSection">
                    <h3><VscSmiley /> Jeg skal se sammen med...</h3>
                    <ul>
                        {otherUsers?.map((user, i) => 
                        <li key={i+"mouse"}>
                            <button onClick={() => handleFriendClick(user)}>{user.name}</button>
                        </li>)}
                    </ul>
                </section>
            </div>
        </>
    ) 
}
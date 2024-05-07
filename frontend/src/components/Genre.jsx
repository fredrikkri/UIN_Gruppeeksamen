import { Link } from "react-router-dom"
import { fetchAllGenres } from "../../services/genreServices"
import { useState, useEffect } from "react"
import { addFavoriteGenre } from "../../services/userServices"
export default function Genre({setGenre, user, genre}) {

    const [genreList, setGenrelist] = useState(null)

    const getAllGenres = async () => {
        const data = await fetchAllGenres()
        setGenrelist(data)
    }

    useEffect(() => {
        getAllGenres()
        }, [])

    const handleClick = async (genre) => {
        console.log("user-clicked",user)
        console.log("genre-clicked",genre)
        addFavoriteGenre(user, genre)

    }

    return (
        <>
            <h1>Sjangere</h1>
            <section id="genreContent">
                    <ul>
                        {genreList?.map((item, i) =>
                        <li key={i+"rat"}>
                            <Link to="/genrepage" onClick={()=> setGenre(item.genre)}>{item.genre}</Link>
                            <button onClick={() => setGenre(item.genre)}>Legg til favoritt</button>
                        </li>
                        )}
                    </ul>
            </section>
            {/* Skrive ut liste med sjangere */}
        </>
    )
}
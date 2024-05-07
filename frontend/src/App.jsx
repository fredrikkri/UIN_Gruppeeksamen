import './App.css'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import Genre from './components/Genre';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

const [query, setQuery] = useState ("")
const [movies, setMovies] = useState ("James Bond")
const [genre, setGenre] = useState ("action")


// Endre til parameter Movie with: id, title, imdb, moviecover
const url = `https://moviesdatabase.p.rapidapi.com/titles/titles?info=base_info&genre=${genre}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7e3f288618mshec33b67b23dbf21p168ecdjsna051e3a0e1e7',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

const getData = async(url) => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    setMovies(result);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getData(url)
},[])

console.log("movies", movies)


  const [user, setUser] = useState(null)
  const [movies, setMovies] = useState(null)
  const [genre, setGenre] = useState(null)

  const urlGenre = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&genre=${genre}`;
  //const urlFavorites = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${user.favorites}&info=base_info`; // Må % mellom id i listen
  //const urlMovies = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ad97b2da57mshea14e44c7ca71c2p19c8c9jsn525facd6154e',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };
  
  const getData = async(url)=>{
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setMovies(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getData(urlGenre)
  },[])

  console.log("movies", movies)

  return (
    <Layout user={user} setUser={setUser}>
      <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/home" element={<HomePage movielist={movies} title={query} user={user}/>}/>
            <Route path="/genre" element={<Genre />} />
        </Routes>
    </Layout>
  )
}

export default App 
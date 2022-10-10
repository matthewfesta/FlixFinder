import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com?apikey=9ab56e03'

const movie1 = {

    "Title": "Star Wars: Episode IV - A New Hope",
    "Year": "1977",
    "imdbID": "tt0076759",
    "Poster":"https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title})`);
        const data = await response.json();

        setMovies(data.Search);
    }   

    useEffect(() => {
        searchMovies('Star Wars');
    }, []);

    return (
        <div className="app">
            <h1>FlixFinder</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            { movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />))}
                    </div>
                ) :  (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )    
            }

            
        </div>
    );
}

export default App;

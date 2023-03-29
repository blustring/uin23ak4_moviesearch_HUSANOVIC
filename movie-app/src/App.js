import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	/*const [movies, setMovies] = useState([
		{
			"Title": "James Bond 007: Everything or Nothing",
			"Year": "2003",
			"imdbID": "tt0366629",
			"Type": "game",
			"Poster": "https://m.media-amazon.com/images/M/MV5BNzhiNjgxNGMtMzg0ZS00ODMwLTk5MTYtYzI0NDBmOThlZjY3XkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg"
		},
		{
			"Title": "James Bond 007: Blood Stone",
			"Year": "2010",
			"imdbID": "tt1692489",
			"Type": "game",
			"Poster": "https://m.media-amazon.com/images/M/MV5BMTcxMzE4NDg0NF5BMl5BanBnXkFtZTgwMjg5Mjc1MDE@._V1_SX300.jpg"
		},
		{
			"Title": "Jatt James Bond",
			"Year": "2014",
			"imdbID": "tt3732110",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BOWVmNjQ2YmYtY2M4ZS00NDdkLTljZmUtYTZkNmNjM2FhMWU3XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg"
		},
		{
			"Title": "James Bond Jr.",
			"Year": "1991–1992",
			"imdbID": "tt0283744",
			"Type": "series",
			"Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2NjkzNTA1N15BMl5BanBnXkFtZTcwMzM1Mjg4NA@@._V1_SX300.jpg"
		},
		{
			"Title": "James Bond in Agent Under Fire",
			"Year": "2001",
			"imdbID": "tt0295846",
			"Type": "game",
			"Poster": "https://m.media-amazon.com/images/M/MV5BY2NjMjRmZDMtOTVmOC00MzQ4LWE4ZWYtOTE4NWQyMGVlYjlmXkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg"
		},
		{
			"Title": "The James Bond Story",
			"Year": "1999",
			"imdbID": "tt0239074",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BMTg1ODc0MjkzMF5BMl5BanBnXkFtZTcwMDY2NzEyMQ@@._V1_SX300.jpg"
		},
		{
			"Title": "James Bond Supports International Women's Day",
			"Year": "2011",
			"imdbID": "tt1858469",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BNmQ4OTlmNTUtMmQ1NC00YmI0LTgxYTItYjU5NjJkZjFkZTMyXkEyXkFqcGdeQXVyMjExMDE1MzQ@._V1_SX300.jpg"
		},
		{
			"Title": "James Bond",
			"Year": "2015",
			"imdbID": "tt4896340",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BM2IwZDRiOTAtNTUxOC00ZWQxLThlYTYtZTM2NTRmMjEzNmQwXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_SX300.jpg"
		},
		{
			"Title": "Happy Anniversary 007: 25 Years of James Bond",
			"Year": "1987",
			"imdbID": "tt0223426",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BNWE3NzFlZDItZTllNy00ZGE2LTgwMWYtZWI3ZGQyYjY4ZTNiXkEyXkFqcGdeQXVyMTY1MTcxMzc@._V1_SX300.jpg"
		},
		{
			"Title": "Sean Connery vs James Bond",
			"Year": "2022",
			"imdbID": "tt22498916",
			"Type": "movie",
			"Poster": "https://m.media-amazon.com/images/M/MV5BNmQ0Mzg1NTItNjZjMi00M2ZjLTkxZDEtYzhhYWMzMmVkMmMxXkEyXkFqcGdeQXVyNTM2NTg3Nzg@._V1_SX300.jpg"
		}
	  
	]);*/
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState("James Bond");
	const [movies, setMovies] = useState([]);


	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a50c1b35`;



		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest();
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue}  />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
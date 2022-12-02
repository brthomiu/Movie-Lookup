import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import GenreTags from "./components/GenreTags";
import * as API from "./api/api";
import Modal from "react-modal";
import Footer from "./components/Footer";

Modal.setAppElement("#root");

// Main App Component
function App() {
  //----------- Movie List State, API call, data handling functions ------------------------------------------
  // State for movie data and trigger
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect hook to fetch data from API, takes isLoaded state as dependency array
  useEffect(() => {
    API.connectToAPI(isLoaded, setMovies, setIsLoaded);
  }, [isLoaded]);

  // Check is movie data is valid, if not, used cached data
  const movieList = API.dataChecker(movies);

  // Map all genres to an array
  const genreList = movieList.map((movie) => movie.genres);

  // Loop through array of genres and remove duplicates
  const allGenres = API.parseGenres(genreList);

  //----------- Search and filter state and functions ----------------------------------------------------
  // States for search/genre filter
  const [searchQuery, setSearchQuery] = useState([]);
  const [genreQuery, setGenreQuery] = useState(allGenres);
  const [markTag, setMarkTag] = React.useState(false);

  // Search function, sent to Header component props, updates searchQuery state
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Genre filter functions, sent to GenreTags component props, updates genreQuery state
  const addGenreFilter = (genre) => {
    let queryArray = genreQuery;
    queryArray.push(genre);
    setGenreQuery(queryArray);
  };

  // Toggles state of genre tag
  const handleTag = () => {
    if (markTag === true) {
      setMarkTag(false);
    } else {
      setMarkTag(true);
    }
  };

  // Functions to show all genres or no genres
  const clearGenreFilter = () => {
    setGenreQuery([]);
  };
  const allGenreFilter = () => {
    setGenreQuery(allGenres);
    console.log(genreQuery);
  };

  //Remove genre from filter list
  const removeGenreFilter = (genre) => {
    let queryArray = genreQuery;
    setGenreQuery(queryArray.filter((item) => item !== genre));
  };

  // Use effect hook to rerender components when genreQuery state changes
  useEffect(() => {}, [genreQuery]);

  // State for whether genre section is rendered, toggled by button on header
  const [showGenres, setShowGenres] = useState(false);

  const toggleGenres = () => {
    if (showGenres === true) {
      setShowGenres(false);
      allGenreFilter();
    } else {
      setShowGenres(true);
      allGenreFilter();
    }
  };

  //  Conditional to render genre section when showGenres state is true
  const isShowGenres = () => {
    let genreShow;
    if (showGenres === true) {
      genreShow = (
        <section className="GenreTagsContainer">
          <GenreTags
            allGenreFilter={allGenreFilter}
            clearGenreFilter={clearGenreFilter}
            handleTag={handleTag}
            genreQuery={genreQuery}
            allGenres={allGenres}
            addGenreFilter={addGenreFilter}
            removeGenreFilter={removeGenreFilter}
          />
        </section>
      );
    } else {
      genreShow = <div className="noStyle"></div>;
    }
    return genreShow;
  };

  //----------- Return main App component -------------------------------------------------------
  return (
    <>
      <div className="App">
        {/* Header with searchbar */}
        <Header toggleGenres={toggleGenres} handleSearch={handleSearch} />
        {isShowGenres()}

        {/* Movie Cards - Mapped from movie data sent by props
           filtered by search terms & tags */}

        <div className="MovieCardContainer">
          {movieList.map((movie) => {
            const movieTitleFiltered = movie.title.toLowerCase();

            //Checks if movie titles contain search query or genre filter and returns movie cards
            if (
              movieTitleFiltered.includes(searchQuery) &&
              searchQuery.length >= 0 &&
              (genreQuery.includes(movie.genres[0]) ||
                genreQuery.includes(movie.genres[1]) ||
                genreQuery.includes(movie.genres[2]) ||
                genreQuery.includes(movie.genres[3]))
            ) {
              return (
                <MovieCard
                  key={movie.id}
                  loadDetails={movie.loadDetails}
                  id={movie.id}
                  title={movie.title}
                  genres={movie.genres}
                />
              );
            }
          })}
        </div>
        {/*No more movies statement lives at the bottom of the list, conditional seems pointless here*/}
        <div className="NoMoreMovies">
          <h1>No more movies to show!</h1>
          <h2>Try a different search and/or genre combination</h2>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

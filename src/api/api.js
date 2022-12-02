import { movieCache } from "../components/movieCache";

export const API_ADDRESS =
  "API_ADDRESS is hidden in the public repo";

// Normally the API key should be stored as an environmental variable and retrieved from the backend
// But, since there is no backend, for the sake of this project it is being stored here
// This is a security risk and should not be done in a production environment
// The repo is private, but this is still a bad practice

export const API_KEY = "API_KEY is hidden in the public repo";

// Checks if data is already loaded
// If not, connects to API and loads data - Used in main App component
export const connectToAPI = (loadState, setDataState, setLoadState) => {
  if (!loadState) {
    fetch(`${API_ADDRESS}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDataState(data);
        setLoadState(true);
      });
  }
};

// Fetch data from API subroute and returns it - Used in MovieCard component
export const fetchMovieDetails = (filter, setFilter, API_ROUTE) => {
  try {
    fetch(`${API_ADDRESS}${API_ROUTE}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFilter(data);
      });
  } catch (error) {
    return console.log("Unable to retrieve data from API");
  }
};

// Checks if the data has properly loaded and then retuns an array of movie data
// If data is not loaded, returns cached data - Used in main App component
// ----- This will most likely evolve into the search function? =maybe not= -----
export const dataChecker = (movieData) => {
  if (typeof movieData === "object" && JSON.stringify(movieData).length > 10) {
    let movieArray = movieData.data;
    console.log("Movie list retrieved, updating movie data");
    return movieArray;
  } else {
    console.log("Movie list object cannot be retrieved, using cached data");
    return movieCache;
  }
};

// Loop through array of genres and remove duplicates
export const parseGenres = (genres) => {
  let allGenres = [];
  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < genres[i].length; j++) {
      if (!allGenres.includes(genres[i][j])) {
        allGenres.push(genres[i][j]);
      }
    }
  }
  return allGenres;
};

import "./styles.css";
import React from "react";
import * as API from "../api/api";
import Modal from "react-modal";
import { InView } from "react-intersection-observer";

// Movie card component
// Takes array of movies as props
const MovieCard = (props) => {
  // State to show/hide movie card details component - Toggled by clicking on movie card
  const [showMovieInfo, setShowMovieInfo] = React.useState(false);

  //State for API movie detail call - API call made when movie card is rendered
  const [movieDetails, setMovieDetails] = React.useState([]);
  const [movieDetailsLoad, setMovieDetailsLoad] = React.useState(false);

  // useEffect hook to fetch data from API subroutes
  // Takes movieDetailsLoad state as dependency array
  // Only runs when movieDetailsLoad is set to true
  React.useEffect(() => {
    if (movieDetailsLoad === true) {
      API.fetchMovieDetails(movieDetails, setMovieDetails, `/${props.id}`);
    }
  }, [movieDetailsLoad]);

  // Functions to toggle movie card overlay component
  const showInfo = (event) => {
    setShowMovieInfo(true);
  };
  const hideInfo = (event) => {
    setShowMovieInfo(false);
  };
  const loadDetails = () => {
    setMovieDetailsLoad(true);
  };

  // State declaration & functions to toggle movie card details modal
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  // Checks if the path of the image exists in the local files and returns default image path if not
  const posterPath = (path) => {
    try {
      return require(`../assets/moviePosterImages/${path}.jpeg`);
    } catch {
      return require("../assets/moviePosterImages/defaultImage.jpeg");
    }
  };

  const bannerPath = (path) => {
    try {
      return require(`../assets/movieHeroImages/${path}.jpeg`);
    } catch {
      return require("../assets/movieHeroImages/defaultImage.jpeg");
    }
  };

  // Conditional rendering for movie card overlay component - showMovieInfo state toggles on clicking card
  if (showMovieInfo !== true) {
    // Movie card with image, title and genres display on hover
    return (
      <InView
        as="div"
        className="MovieCard"
        onChange={(inView) => loadDetails()}
      >
        {/* Movie Poster Image */}

        <img
          className="MoviePoster"
          src={posterPath(props.id)}
          alt="Movie Poster"
        ></img>

        <div className="MovieTitle">
          {/* Movie Title */}
          <h1>{props.title}</h1>
        </div>

        {/* Movie Info Card - Displays while hovering */}
        <button
          className="MovieBox"
          onMouseOver={loadDetails}
          onClick={showInfo}
        ></button>
      </InView>
    );
  } else {
    // Movie Info Card - Toggles on click
    return (
      <InView as="div" className="MovieCard">
        {/* Movie Poster Image */}
        <img
          className="MoviePoster"
          src={posterPath(props.id)}
          alt="Movie Poster"
        ></img>

        {/* Movie Info Card - Displays while hovering */}
        <div className="MovieInfo">
          {/* Movie Title */}
          {/* Movie Title */}
          <h1 onClick={hideInfo}>X</h1>
          <h2>{props.title}</h2>

          {/* Movie Genres */}
          <h3>
            {props.genres.map((genre) => (
              <div key={genre}>{genre}</div>
            ))}
          </h3>

          {/* Details Button - Triggers modal overlay */}
          <button className="MovieDetailsButton" onClick={openModal}>
            Details
          </button>

          {/* Modal overlay with movie details */}
          <Modal
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
            className="ModalContainer"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Movie Details Modal"
          >
            {/* Modal - Movie Banner Image */}
            <img
              className="MovieBanner"
              src={bannerPath(props.id)}
              alt="Movie Poster"
            ></img>
            <form className="DetailsForm">
              {/* Modal - Movie Details Form */}
              <h1>{movieDetails.data.title}</h1>
              <div className="CastList">
                <h2>{movieDetails.data.topCast[0].name}</h2>
                <h2>{movieDetails.data.topCast[1].name}</h2>
                <h2>{movieDetails.data.topCast[2].name}</h2>
              </div>
              <p>{movieDetails.data.description}</p>
            </form>

            {/* Modal - Close Button */}
            <button className="CloseModalButton" onClick={closeModal}>
              Close
            </button>
          </Modal>
        </div>
      </InView>
    );
  }
};
export default MovieCard;

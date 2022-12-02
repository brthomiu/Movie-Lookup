import React from "react";

// Individual genre button component to toggle genre filters
const GenreButton = (props) => {
  const markTagOn = (event) => {
    props.addGenreFilter(props.genre);
    props.handleTag();
  };

  const markTagOff = (event) => {
    props.removeGenreFilter(props.genre);
    props.handleTag();
  };

  if (!props.genreQuery.includes(props.genre)) {
    return (
      <button className="GenreTagButton" onClick={markTagOn}>
        {props.genre}
      </button>
    );
  }
  return (
    <button className="GenreTagButtonOn" onClick={markTagOff}>
      {props.genre}
    </button>
  );
};

export default GenreButton;

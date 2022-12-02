import React from "react";
import GenreButton from "./GenreButton";

const GenreTags = (props) => {
  return (
    <div className="GenreContainer">
    <button className="BigButton" onClick={props.allGenreFilter}>Show All</button>
      <div className="GenreTags">
        {props.allGenres.map((genre) => (
          <GenreButton
            handleTag={props.handleTag}
            genreQuery={props.genreQuery}
            key={genre}
            genre={genre}
            addGenreFilter={props.addGenreFilter}
            removeGenreFilter={props.removeGenreFilter}
          />
        ))}
      </div>
      <button className="BigButton" onClick={props.clearGenreFilter}>Clear All</button>

    </div>
  );
};

export default GenreTags;

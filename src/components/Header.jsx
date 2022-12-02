import React from "react";
import "./styles.css";
import searchIcon from "../assets/search.svg";

const Header = (props) => {
  // State for search/filter array and trigger

  return (
    <header className="Header__Menu">
      <div className="Header__Left">
        <img src={searchIcon} className="Header__MenuIcon" alt="menu"></img>
        <div className="Search">
          <input
            className="Search"
            type="text"
            id="search"
            onChange={props.handleSearch}
            placeholder="Enter a Movie Title"
          ></input>
        </div>
      </div>
      <button className="ToggleGenresButton" onClick={props.toggleGenres}>
        Display Genre Tags
      </button>
    </header>
  );
};

export default Header;

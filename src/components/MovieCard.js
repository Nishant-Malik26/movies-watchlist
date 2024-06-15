import React, { useState } from "react";

const MovieCard = ({ movie, handleEdit, openPopup }) => {
  return (
    <div className="movieCard">
      <div className="movieTitle">{movie?.title}</div>
      <div className="innerCard">
        <img className="left" src="https://picsum.photos/200" alt="movie"></img>
        <div className="center">
          <div className="description">{movie?.description}</div>
          <div>Release Date: {movie?.releaseYear}</div>
          <div>Genre: {movie?.genre}</div>
        </div>

        <div className="buttonsContainer right">
          <button onClick={() => handleEdit(movie?.key)}>Edit</button>
          <button onClick={() => openPopup(movie?.key)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

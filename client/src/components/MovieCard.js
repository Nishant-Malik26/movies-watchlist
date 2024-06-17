import React from "react";

const MovieCard = ({
  movie,

  toggleDrawer,
  openPopup,
  handleView,
  setIsEditing,
}) => {
  const handleEdit = () => {
    console.log("🚀 ~ handleEdit ~ movie:", movie);
    setIsEditing(true);

    toggleDrawer(movie);
  };

  const handleDelete = () => {
    openPopup(movie);
  };

  return (
    <div className="movieCard">
      <div className="movieTitle">{movie.title}</div>
      <div className="innerCard">
        <img className="left" src="https://picsum.photos/200" alt="movie" />
        <div className="center">
          <div className="description">{movie.description}</div>
          <div>Release Date: {movie.releaseYear}</div>
          <div>Genre: {movie.genre}</div>
        </div>
        <div className="buttonsContainer right">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>

          <button onClick={() => handleView(movie)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

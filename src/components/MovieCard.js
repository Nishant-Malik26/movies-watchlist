import React from "react";

const MovieCard = ({
  movie,
  handleEditMovie,
  handleDeleteMovie,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  toggleDrawer,
  openPopup,
  handleView,
  setIsEditing,
}) => {
  console.log("🚀 ~ movie:", movie);
  const handleEdit = () => {
    console.log("🚀 ~ handleEdit ~ movie:", movie);
    setIsEditing(true);

    toggleDrawer(movie);
  };

  const handleDelete = () => {
    openPopup(movie);
  };

  const handleAddToWatch = () => {
    handleAddToWatchlist(movie._id);
  };

  const handleRemoveFromWatch = () => {
    handleRemoveFromWatchlist(movie._id);
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
          {/* {movie.watchStatus ? (
            <button onClick={handleRemoveFromWatch}>
              Remove from Watchlist
            </button>
          ) : (
            <button onClick={handleAddToWatch}>Add to Watchlist</button>
          )} */}
          <button onClick={() => handleView(movie)}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

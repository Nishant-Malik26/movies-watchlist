import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  addToWatchlist,
  removeFromWatchlist,
  fetchWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
  addReview,
  updateRating,
} from "../store/moviesSlice";
import MovieCard from "./MovieCard";
import Drawer from "./Drawer";
import AddEditForm from "./AddEditForm";
import ConfirmationPopup from "./ConfirmationPopup";
import ViewDetails from "./ViewDetails";

const Watchlist = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const watchlist = useSelector((state) => state.movies.watchlist);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchWatchlist());
  }, [dispatch]);

  const toggleDrawer = (movie) => {
    console.log("🚀 ~ toggleDrawer ~ movie:", movie);
    setSelectedMovie(movie);
    setIsOpen(!isOpen);
  };

  const handleAddMovie = (movie) => {
    dispatch(addMovie(movie));
  };

  const handleEditMovie = (id, movie) => {
    dispatch(updateMovie({ id, movie }));
  };

  const handleDeleteMovie = (id) => {
    dispatch(deleteMovie(id));
  };

  const openPopup = (movie) => {
    console.log("🚀 ~ openPopup ~ movie:", movie);
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirm = () => {
    handleDeleteMovie(selectedMovie._id);
    closePopup();
    if (isOpen) {
      toggleDrawer(selectedMovie);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    closePopup();
  };

  const handleAddToWatchlist = (id) => {
    dispatch(addToWatchlist(id));
  };

  const handleRemoveFromWatchlist = (id) => {
    dispatch(removeFromWatchlist(id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleAddReview = (review) => {
    dispatch(addReview({ id: selectedMovie._id, review }));
    dispatch(fetchMovies());
    setSelectedMovie(movies.find((el) => el?._id === selectedMovie._id));
  };

  const handleUpdateRating = (rating) => {
    dispatch(updateRating({ id: selectedMovie._id, rating }));
  };

  const handleView = (movie) => {
    console.log("🚀 ~ handleView ~ movie:", movie);
    setSelectedMovie(movie);
    setIsEditing(false);
    toggleDrawer(movie);
  };

  const handleAdd = () => {
    setIsOpen(!isOpen);
    setIsEditing(true);
    setSelectedMovie(null);
  };

  return (
    <div>
      <div>Movies Watchlist created by you!!</div>
      <button onClick={handleAdd}>Add movies</button>
      <div className="listContainer">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            handleEditMovie={handleEditMovie}
            handleDeleteMovie={handleDeleteMovie}
            handleAddToWatchlist={handleAddToWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            toggleDrawer={toggleDrawer}
            openPopup={openPopup}
            handleView={handleView}
            setIsEditing={setIsEditing}
          />
        ))}
      </div>
      {isOpen && (
        <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
          {isEditing ? (
            <AddEditForm
              movie={selectedMovie}
              handleAddMovie={handleAddMovie}
              toggleDrawer={toggleDrawer}
              handleEditMovie={handleEditMovie}
            />
          ) : (
            <ViewDetails
              movie={selectedMovie}
              pageHeader="View"
              onEdit={handleEdit}
              onDelete={openPopup}
              onAddReview={handleAddReview}
              onUpdateRating={handleUpdateRating}
            />
          )}
        </Drawer>
      )}
      {isPopupOpen && (
        <ConfirmationPopup
          message="Are you sure you want to continue?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isOpen={isPopupOpen}
        />
      )}
    </div>
  );
};

export default Watchlist;

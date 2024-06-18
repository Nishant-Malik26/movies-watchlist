import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  toggleWatchstatus,
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
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMovies());
    }
  }, [dispatch, isAuthenticated]);

  const toggleDrawer = (movie) => {
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
    setSelectedMovie(movie);
    setIsEditing(false);
    toggleDrawer(movie);
  };

  const handleAdd = () => {
    setIsOpen(!isOpen);
    setIsEditing(true);
    setSelectedMovie(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleWatchstatus = () => {
    dispatch(
      toggleWatchstatus({
        ...selectedMovie,
        watchStatus: !selectedMovie.watchStatus,
      })
    );
    dispatch(fetchMovies());
  };

  return (
    <div>
      <div className="watchlistContainer">
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>

        <div className="pageHeading">Movies Watchlist created by you!!</div>
        <button className="addButton" onClick={handleAdd}>
          Add movies
        </button>
      </div>
      <br />
      <div className="listContainer">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              handleEditMovie={handleEditMovie}
              handleDeleteMovie={handleDeleteMovie}
              toggleDrawer={toggleDrawer}
              openPopup={openPopup}
              handleView={handleView}
              setIsEditing={setIsEditing}
            />
          ))
        ) : (
          <div className="notFound">
            Movies not found. Please Add using the button above
          </div>
        )}
      </div>
      {isOpen && (
        <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
          {isEditing ? (
            <AddEditForm
              pageHeader={selectedMovie ? "Edit" : "Add"}
              movie={selectedMovie}
              handleAddMovie={handleAddMovie}
              toggleDrawer={toggleDrawer}
              handleEditMovie={handleEditMovie}
            />
          ) : (
            <ViewDetails
              movie={movies.find((el) => el?._id === selectedMovie._id)}
              pageHeader="View"
              onEdit={handleEdit}
              onDelete={openPopup}
              onAddReview={handleAddReview}
              onUpdateRating={handleUpdateRating}
              handleToggleWatchstatus={handleToggleWatchstatus}
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

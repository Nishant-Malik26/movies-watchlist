import React, { useState } from "react";
import MovieCard from "./MovieCard";
import Drawer from "./Drawer";
import AddEditForm from "./AddEditForm";
import ConfirmationPopup from "./ConfirmationPopup";

const Watchlist = ({ watchlist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [pageHeader, setPageHeader] = useState("Add");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  console.log("🚀 ~ Watchlist ~ isPopupOpen:", isPopupOpen);

  const openPopup = () => {
    console.log("first");
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirm = () => {
    // Handle confirmation logic
    closePopup();
  };

  const handleCancel = () => {
    closePopup();
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setIsOpen(true);
    setPageHeader("Edit");
  };

  const handleAdd = () => {
    setIsOpen(true);
    setPageHeader("Add");
  };

  return (
    <div>
      <div className="pageHeading">
        <div>Movies Watchlist created by you!!</div>
        <button className="addButton" onClick={handleAdd}>
          Add movies
        </button>
      </div>
      <div className="listContainer">
        {watchlist?.map((movie) => (
          <MovieCard
            movie={movie}
            openPopup={openPopup}
            handleEdit={() => handleEdit(movie)}
          />
        ))}
      </div>
      {isOpen && (
        <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
          <AddEditForm
            movie={editMovie}
            pageHeader={pageHeader}
            toggleDrawer={toggleDrawer}
          />
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

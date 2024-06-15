import React, { useState, useEffect } from "react";

const AddEditForm = ({ movie, pageHeader, toggleDrawer }) => {
  console.log("🚀 ~ AddEditForm ~ movie:", movie);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submit logic here
  };

  return (
    <div className="formContainer">
      <div className="drawerHeader">{pageHeader} Movie</div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Release Year:</label>
          <input
            type="text"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="footer">
          <button type="button" className="close-button" onClick={toggleDrawer}>
            Close
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditForm;

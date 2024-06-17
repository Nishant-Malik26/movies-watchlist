import React, { useState } from "react";

const AddEditForm = ({
  handleAddMovie,
  movie,
  toggleDrawer,
  handleEditMovie,
  pageHeader,
}) => {
  const [title, setTitle] = useState(movie?.title || "");
  const [description, setDescription] = useState(movie?.description || "");
  const [releaseYear, setReleaseYear] = useState(movie?.releaseYear || "");
  const [genre, setGenre] = useState(movie?.genre || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = { title, description, releaseYear, genre };
    if (movie?._id) {
      handleEditMovie(movie._id, newMovie);
    } else {
      handleAddMovie(newMovie);
    }
    toggleDrawer();
    // setEditMovvie
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="drawer-header">{pageHeader} Movie</div>

      <div className="formContainer">
        <div className="input-container etc">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description:</label>
          <textarea
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
      </div>
      <div className="footer">
        <button className="save-button" type="submit">
          Save
        </button>
        <button className="close-button" onClick={toggleDrawer}>
          Close
        </button>
      </div>
    </form>
  );
};

export default AddEditForm;

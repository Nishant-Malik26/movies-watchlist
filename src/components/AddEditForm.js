import React, { useState } from "react";

const AddEditForm = ({
  handleAddMovie,
  movie,
  toggleDrawer,
  handleEditMovie,
}) => {
  console.log("🚀 ~ AddEditForm ~ movie:", movie);
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
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Release Year:</label>
        <input
          type="text"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </div>
      <div>
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddEditForm;

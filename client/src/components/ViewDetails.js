import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  updateRating,
} from "../store/moviesSlice";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdBookmark } from "react-icons/md";

const ViewDetails = ({
  movie,
  pageHeader,
  onEdit,
  onDelete,
  onAddReview,
  handleToggleWatchstatus,
}) => {
  const [rating, setRating] = useState(movie?.rating || 0);
  const [hover, setHover] = useState(null);
  const [newReview, setNewReview] = useState("");
  const dispatch = useDispatch();

  const handleAddReview = () => {
    if (newReview) {
      onAddReview(newReview);
      setNewReview("");
    }
  };

  const handleUpdateRating = (newRating) => {
    setRating(newRating);
    dispatch(updateRating({ id: movie._id, rating: newRating }));
  };

  return (
    <div className="view-container">
      <div className="drawer-header">{pageHeader} Movie</div>
      <div className="movie-details">
        <h2>{movie?.title}</h2>
        <img
          className="image-drawer"
          src="https://picsum.photos/400/200"
          alt="movie"
        />

        <p>
          <strong>Description: </strong>
          {movie?.description}
        </p>
        <div className="movie-info">
          <div>
            <strong>Release Year:</strong> {movie?.releaseYear}
          </div>
          <div>
            <strong>Genre:</strong> {movie?.genre}
          </div>
          <div className="toogleWatchlist">
            {movie.watchStatus ? (
              <MdBookmark size={32} onClick={handleToggleWatchstatus} />
            ) : (
              <IoBookmarkOutline size={32} onClick={handleToggleWatchstatus} />
            )}
          </div>
          <div>
            <strong>Rating:</strong>
            <div className="star-rating">
              {[...Array(5)].map((__, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={20}
                    onClick={() => handleUpdateRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="reviews">
          <h3>Reviews</h3>

          <div className="add-review">
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Add a review"
            />
            <button onClick={handleAddReview}>Add Review</button>
          </div>
          {movie?.reviews?.map((review, index) => (
            <div key={index + "shjuj"} className="review">
              {review}
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={() => onDelete(movie)}>Delete</button>
      </div>
    </div>
  );
};

export default ViewDetails;

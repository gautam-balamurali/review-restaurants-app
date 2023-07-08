/* eslint-disable */

import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import { useReviewRestaurants } from "../../../core/contexts/ReviewRestaurantsContext";
import { restaurantsData } from "../../../core/database/Database";
import "./Reviews.css";

const Reviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    selectedRestaurant,
    comment,
    handleCommentChange,
    rating,
    handleRatingChange,
    dispatch,
  } = useReviewRestaurants();

  const handleAddReview = () => {
    if (comment.trim() !== "" && rating !== 0) {
      const newReview = {
        rating,
        comment,
        revName: "Gautam B",
        pp: "https://picsum.photos/30/30",
      };

      if (selectedRestaurant) {
        const restaurant = restaurantsData.find(
          ({ id }) => id === selectedRestaurant
        );
        restaurant.ratings.push(newReview);
        restaurant.averageRating =
          restaurant.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          restaurant.ratings.length;
      }

      dispatch({ type: "UPDATE_COMMENT", payload: "" });
      dispatch({ type: "UPDATE_RATING", payload: 0 });
    }
  };
  return (
    <div className="review-container">
      <Link to="/" className="back-btn">
        <BiArrowBack />
      </Link>
      <div className="reviews-section">
        <div className="restaurant-details-section">
          <div className="restaurant-details">
            <h1>
              {
                restaurantsData.find(({ id }) => id === selectedRestaurant)
                  ?.name
              }
            </h1>
            <span>
              {restaurantsData
                .find(({ id }) => id === selectedRestaurant)
                ?.menu.map((item) => item.name)
                .join(",  ")}
            </span>
            <span>
              {
                restaurantsData.find(({ id }) => id === selectedRestaurant)
                  ?.address
              }
            </span>
            <span>
              Average Rating:{" "}
              {restaurantsData
                .find((restaurant) => restaurant.id === selectedRestaurant)
                .averageRating.toFixed(1)}
            </span>
          </div>

          <button
            className="open-review-modal-btn"
            onClick={() => setOpenModal(true)}
          >
            Add Review
          </button>
        </div>
        <hr />
        {selectedRestaurant ? (
          <div className="review-section">
            <div className="review-section-details">
              <h2>Reviews</h2>
              <div className="restaurant-reviews">
                {selectedRestaurant &&
                  restaurantsData
                    .filter(
                      (restaurant) => restaurant.id === selectedRestaurant
                    )
                    .map((restaurant) =>
                      restaurant.ratings.length > 0 ? (
                        <div className="restaurant-reviews" key={restaurant.id}>
                          {restaurant.ratings.map(
                            ({ rating, comment, pp, revName }, index) => (
                              <div
                                className="restaurant-reviews"
                                key={index + comment + rating}
                              >
                                <div className="review-content">
                                  <div className="review-content-container">
                                    <div className="user-details">
                                      <img src={pp} /> <b>{revName}</b>
                                    </div>
                                    <b className="rating">
                                      <h3>{rating}</h3>
                                      <span>
                                        <FaRegStar />
                                      </span>
                                    </b>
                                  </div>
                                  <span>{comment}</span>
                                </div>
                                <hr />
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p>Reviews Not Found.</p>
                      )
                    )}
              </div>
            </div>
            <div
              className="add-review"
              style={{ display: openModal ? "flex" : "none" }}
            >
              <span className="close" onClick={() => setOpenModal(false)}>
                <MdOutlineCancel />
              </span>
              <h2>Add Your Review</h2>
              <div className="set-rating">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={handleRatingChange}
                >
                  <option value={0} disabled>
                    Select Rating
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div className="add-comment">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
              <button
                onClick={() => {
                  handleAddReview();
                  setOpenModal(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <p>Please select a restaurant</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;

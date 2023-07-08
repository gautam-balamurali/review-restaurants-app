import { createContext, useContext, useReducer } from "react";

import { reviewRestaurantsReducer } from "../reducers/ReviewRestaurantsReducerFunction";
import { reviewRestaurantsInitialState } from "../reducers/ReviewRestaurantsReducerInitialState";

export const ReviewRestaurantsContext = createContext();

export const ReviewRestaurantsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reviewRestaurantsReducer,
    reviewRestaurantsInitialState
  );

  const handleCuisineSelect = (cuisineId) => {
    dispatch({ type: "SELECT_CUISINE", payload: cuisineId });
  };

  const handleRestaurantSelect = (restaurantId) => {
    dispatch({ type: "SELECT_RESTAURANT", payload: restaurantId });
  };

  const handleRatingChange = (event) => {
    const { value } = event.target;
    dispatch({ type: "UPDATE_RATING", payload: Number(value) });
  };

  const handleCommentChange = (event) => {
    const { value } = event.target;
    dispatch({ type: "UPDATE_COMMENT", payload: value });
  };

  return (
    <ReviewRestaurantsContext.Provider
      value={{
        ...state,
        dispatch,
        handleCuisineSelect,
        handleRestaurantSelect,
        handleRatingChange,
        handleCommentChange,
      }}
    >
      {children}
    </ReviewRestaurantsContext.Provider>
  );
};

export const useReviewRestaurants = () => useContext(ReviewRestaurantsContext);

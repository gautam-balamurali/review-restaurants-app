export const reviewRestaurantsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SELECT_CUISINE":
      return { ...state, selectedCuisine: payload, selectedRestaurant: null };
    case "SELECT_RESTAURANT":
      return { ...state, selectedRestaurant: payload };
    case "UPDATE_RATING":
      return { ...state, rating: payload };
    case "UPDATE_COMMENT":
      return { ...state, comment: payload };
    default:
      return state;
  }
};

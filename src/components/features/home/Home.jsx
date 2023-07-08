/* eslint-disable */

import { useReviewRestaurants } from "../../../core/contexts/ReviewRestaurantsContext";
import { cuisineData } from "../../../core/database/Database";
import Header from "../../layouts/header/Header";
import Restaurant from "../restaurant/Restaurant";
import "./Home.css";

const Home = () => {
  const { selectedCuisine, handleCuisineSelect } = useReviewRestaurants();

  return (
    <div className="food-menu-container">
      <Header />
      <h2>Select Your Cuisine:</h2>
      <div className="cuisine-list-section">
        {cuisineData.map((cuisine) => (
          <div
            key={cuisine.id}
            className={`cuisine-type ${
              selectedCuisine === cuisine.id ? "active" : ""
            }`}
            onClick={() => handleCuisineSelect(cuisine.id)}
          >
            {cuisine.name}
          </div>
        ))}
      </div>
      <Restaurant />
    </div>
  );
};

export default Home;

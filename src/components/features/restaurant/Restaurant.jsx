import { Link } from "react-router-dom";

import { useReviewRestaurants } from "../../../core/contexts/ReviewRestaurantsContext";
import { restaurantsData } from "../../../core/database/Database";
import "./Restaurant.css";

const Restaurant = () => {
  const { selectedCuisine, handleRestaurantSelect } = useReviewRestaurants();

  return (
    <div>
      <div className="restaurant-list-section">
        {selectedCuisine && (
          <>
            {restaurantsData
              .filter((restaurant) => restaurant.cuisine_id === selectedCuisine)
              .map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="restaurant"
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                >
                  <h2>Dishes by {restaurant.name}</h2>

                  <Link to={"/restaurant"} className="restaurant-menu">
                    {restaurant.menu.map((menuItem, index) => (
                      <div key={index} className="menu-item">
                        <div className="menu-image">
                          <img src={menuItem.imgSrc} alt="dish menu" />
                        </div>
                        <div className="menu-content">
                          <div className="menu-details">
                            <b>{menuItem.name}</b>
                            <div className="price">
                              Rs. {menuItem.price} for {menuItem.qty}
                            </div>
                            <span className="price">{restaurant.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurant;

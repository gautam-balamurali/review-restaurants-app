/* eslint-disable */

import { Route, Routes } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import PageNotFound from "../../pages/PageNotFound";
import ReviewsPage from "../../pages/ReviewsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurant" element={<ReviewsPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;

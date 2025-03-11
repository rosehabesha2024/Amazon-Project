import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import React from "react";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Cart from "./Pages/Cart/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";







const stripePromise = loadStripe(
  "pk_test_51QzhkWJuGoDwPpMd36yTuRXAtkg8ZBL54H2KVDKP7ACTTQrH6ms4wwrnv4odb7YnE59sVf75SO3QpZMhGluYCu0H00Ae7Rrusa"
);

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute
                msg={"you must login to pay"}
                redirect={"/payments"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg={"you must login to access your order"}
                redirect={"/orders"}
              >
                  <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;

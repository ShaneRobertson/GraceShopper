import React, { useEffect } from "react";
import DisplayVisitorCart from "./DisplayVisitorCart";
import VisitorSummary from "./VisitorSummary";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const VisitorCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {}, [localStorage.getItem("token")]);

  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      <div className="visitor-cart-elements">
        <div className="visitor-cart-cards">
          <DisplayVisitorCart products={cart} />
        </div>
        <div className="visitor-card-summary">
          <VisitorSummary stripe={stripe} elements={elements} />
        </div>
      </div>
    </>
  );
};

export default VisitorCart;

// import PageHeader from "../components/PageHeader";
import React, { useState, useEffect } from "react";
import DisplayCart from "./DisplayCart";
import { getCart } from "../api";
import OrderSummary from "./OrderSummary";

import { ElementsConsumer } from "@stripe/react-stripe-js";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart()
      .then((response) => {
        setCart(response.cart.products);
      })
      .catch((error) => {
        setCart(error.message);
      });
  }, []);

  return (
    <>
      <div>
        {/* <PageHeader /> */}
        <div className="loggedin-cart-elements">
          <div className="loggedin-cart-cards">
            <DisplayCart products={cart} />
          </div>
          <div className="loggedin-card-summary">
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <OrderSummary stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

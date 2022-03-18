import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { getCart, checkout, sendToken } from "../api";
import { useHistory } from "react-router-dom";
import CardDetails from "./CardDetails";
import { CardElement } from "@stripe/react-stripe-js";
import OrderSuccess from "./OrderSuccess";
import stripepng from "../stripe.png";

const OrderSummary = ({ stripe, elements }) => {
  const totalArr = [];
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [charge, setCharge] = useState();

  const home = () => {
    history.push("/");
  };

  useEffect(() => {
    getCart()
      .then((response) => {
        setCart(response.cart.products);
        setCartId(response.cart.id);
      })
      .catch((error) => {
        setCart(error.message);
      });
  }, []);

  // parsing string from local storage
  cart.map((product) => {
    for (let i = 0; i < product.count; i++) {
      totalArr.push(parseFloat(product.price));
    }
  });

  const total = totalArr.reduce((a, b) => a + b, 0).toFixed(2);

  const Checkout = async (event) => {
    event.preventDefault(event);
    if (!stripe || !elements) {
      return;
    }
    try {
      const card = elements.getElement(CardElement);
      console.log("the card is: ", elements.getElement(CardElement));
      const result = await stripe.createToken(card);
      console.log("result on line 50 is: ", result);
      if (result.error) {
        console.log("error on OrderSummary 51: ", result.error);
        console.log(result.error.message);
      } else {
        await sendToken(total, result.token).then((res) => {
          console.log("response OrderSummary 56: ", res);
          setCharge(res.charge);
        });

        checkout(JSON.parse(localStorage.getItem("user")).id, cartId);
        setOpen(true);
      }
    } catch (err) {
      console.log("OrderSummary 64 | err: ", err);
    }
  };

  return (
    <>
      {open && <OrderSuccess charge={charge} />}
      <Card className="order-summary-card">
        <Card.Content className="order-summary-header-container">
          <p className="order-summary-header">Order Summary</p>{" "}
        </Card.Content>
        <Card.Content className="order-summary-content">
          <p className="order-summary-items-container">
            <span className="order-summary-total-items">Total Items:</span>{" "}
            &nbsp; {totalArr.length}
          </p>
          <p className="order-summary-total-container">
            <span className="order-summary-grand-total">Grand Total:</span>{" "}
            &nbsp;$
            {totalArr.reduce((a, b) => a + b, 0).toFixed(2)}
          </p>
        </Card.Content>
        <Card.Content className="order-summary-button-container">
          <p className="checkout-stripe">
            Checkout with <img src={stripepng} className="stripe-image" />
          </p>

          <div className="flex">
            <p className="card-number">Card number</p>
            <p className="expiration">Exp date and CVC</p>
          </div>
          <form onSubmit={Checkout} className="order-summary-form">
            <CardDetails className="card-details" />
            <Button color="red" className="order-summary-button">
              Checkout and Pay
            </Button>{" "}
          </form>
        </Card.Content>
      </Card>
      <div className="order-summary-shopping-button">
        <Button color="green" onClick={home}>
          Continue Shopping
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;

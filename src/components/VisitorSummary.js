import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import CardDetails from "./CardDetails";
import { sendToken } from "../api";
import { CardElement } from "@stripe/react-stripe-js";
import OrderSuccess from "./OrderSuccess";
import stripepng from "../stripe.png";

const VisitorSummary = ({ stripe, elements }) => {
  const [open, setOpen] = useState(false);
  const [charge, setCharge] = useState();

  const totalArr = [];

  // parsing string from local storage
  JSON.parse(localStorage.getItem("cart")).map((product) => {
    for (let i = 0; i < product.count; i++) {
      totalArr.push(parseFloat(product.price));
    }
  });

  const total = totalArr.reduce((a, b) => a + b, 0).toFixed(2);

  const Checkout = async (event) => {
    event.preventDefault(event);
    if (!stripe || !elements) {
      console.log("no !stripe || !elements");
      return;
    }
    try {
      const card = elements.getElement(CardElement);
      console.log("card is: ", card);
      const result = await stripe.createToken(card);
      console.log("result is: ", result);
      if (result.error) {
        console.log(result.error.message);
      } else {
        await sendToken(total, result.token).then((res) => {
          console.log(res);
          setCharge(res.charge);
        });
        localStorage.setItem("cart", JSON.stringify([]));
        setOpen(true);
      }
    } catch (err) {
      console.log("VisitorSummary 44 | err", err);
    }
  };

  const history = useHistory();

  const home = () => {
    history.push("/");
  };

  return (
    <>
      {open && <OrderSuccess charge={charge} />}
      <Card className="order-summary-card">
        <Card.Content className="order-summary-header-container">
          <p className="order-summary-header">Order Summary</p>{" "}
        </Card.Content>
        <Card.Content className="visitor-summary-content">
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
            Checkout & Pay with <img src={stripepng} className="stripe-image" />
          </p>

          <div className="flex">
            <p className="card-number">Card number</p>
            <p className="expiration">Exp date & CVC</p>
          </div>
          <form onSubmit={Checkout} className="order-summary-form">
            <CardDetails className="card-details" />
            <Button color="red" className="order-summary-button">
              Checkout & Pay
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

export default VisitorSummary;

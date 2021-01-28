// import PageHeader from "../components/PageHeader";
import React, { useEffect } from "react";
import DisplayVisitorCart from "./DisplayVisitorCart";
import VisitorSummary from "./VisitorSummary";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import PageFooter from "../components/PageFooter";

const VisitorCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => { }, [localStorage.getItem("token")]);

  return (
    <>
      {/* <div> */}
      {/* <PageHeader /> */}
      <div className="visitor-cart-elements">
        <div className="visitor-cart-cards">
          <DisplayVisitorCart products={cart} />
        </div>
        <div className="visitor-card-summary">
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <VisitorSummary stripe={stripe} elements={elements} />
            )}
          </ElementsConsumer>
        </div>
        <PageFooter/>
      </div>
      {/* </div> */}
    </>
  );
};

export default VisitorCart;

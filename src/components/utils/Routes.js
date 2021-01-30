// import all components here
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import DisplayAllUsers from "../DisplayAllUsers";
import Cart from "../Cart";
import VisitorCart from "../VisitorCart";
import UserPage from "../UserPage";
import PageHeader from "../PageHeader";

import { getProducts, getUsers } from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import UserOrder from "../UserOrder";

const Routes = (props) => {
  console.log("router props", props);
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  // const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")))
  const userInfo = JSON.parse(localStorage.getItem("user"));
  // const [token, setToken] = useState("");
  //const [role, setRole] = useState("");

  const StripePromise = loadStripe(process.env.REACT_APP_STRIPEKEY);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.allProducts);
      })
      .catch((error) => {
        setProducts(error.message);
      });
    getUsers()
      .then((response) => {
        setUsers(response.allUsers);
      })
      .catch((error) => {
        setUsers(error.message);
      });
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    // if user exists then check for id
    // if admin role set state to admin
    if (
      JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user")).id
    ) {
      JSON.parse(localStorage.getItem("user")).role === "admin"
        ? setIsAdmin(true)
        : setIsAdmin(false);
    }
  }, []);
  return (
    <>
      <PageHeader isAdmin={isAdmin} />
      <Route exact path="/">
        <Home products={products} isAdmin={isAdmin} setProducts={setProducts} />
      </Route>
      {localStorage.getItem("token") ? (
        <Route path="/cart">
          <Elements stripe={StripePromise}>
            <Cart />
          </Elements>
        </Route>
      ) : (
        <Route path="/cart">
          <Elements stripe={StripePromise}>
            <VisitorCart />
          </Elements>
        </Route>
      )}
      <Route path="/user/orders">
        <UserOrder />
      </Route>{" "}
      <Route path="/users">
        <DisplayAllUsers users={users} setUsers={setUsers} />
      </Route>
      <Route path="/userinfo">
        <UserPage userInfo={userInfo} />
      </Route>
    </>
  );
};

export default Routes;

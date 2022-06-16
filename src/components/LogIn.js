import React, { useState } from "react";
import { Button, Input, Form, Message } from "semantic-ui-react";
import { loginUser } from "../api";

const LogIn = ({ setOpen }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    await loginUser(credentials.username, credentials.password)
      .then((response) => {
        console.log("the error from logging in : ", response);
        if (response.message) {
          console.log(response);

          setLoginError(true);
        } else {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          console.log("userObject upon login:", response);
          setOpen(false);
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChanges = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    setLoginError(false);
  };

  return (
    <>
      <ul style={{ margin: "10px", color: "orangered", listStyle: "none" }}>
        <li>Admin Credentials</li>
        <li>Username: admin</li>
        <li>Password: admin</li>
      </ul>

      <Form className="logIn">
        <h2>Log in</h2>
        <Input
          style={{ width: "50%", marginTop: "15px" }}
          name="username"
          value={credentials.username}
          onChange={handleChanges}
          placeholder="username"
        />
        <br></br>
        <Input
          style={{ width: "50%" }}
          autoComplete="current-password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChanges}
          placeholder="password"
        />
        <br></br>

        <Button
          style={{ width: "50%" }}
          content="Submit"
          onClick={login}
        ></Button>
        {loginError ? (
          <Message negative size="mini" style={{ marginTop: "6px" }}>
            <p>
              Login failed due to incorrect username or password. Please try
              again.
            </p>
          </Message>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default LogIn;

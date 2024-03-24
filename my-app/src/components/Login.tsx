import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";

const Login = () => {
  const {
    signIn,
    signOut,
    getAccessToken,
    isAuthenticated,
    getBasicUserInfo,
    state,
  } = useAuthContext();
  const [signedIn, setSignedIn] = useState(false);
  function handleSignIn() {
    signIn()
      .then(() => {
        setSignedIn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      <header className="App-header">
        <h1>
          <p>Share surplus meds, spread wellness.</p>
        </h1>
        <h3>
          <a href="https://github.com/cloudintegrator/tesla/blob/main/README.md">
            About
          </a>
        </h3>
        <img src={logo} className="App-logo" alt="logo" />
        <button className="pill-btn" onClick={handleSignIn}>
          Login
        </button>
      </header>
    </div>
  );
};

export default Login;

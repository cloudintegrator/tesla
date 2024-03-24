import logo from "../logo.svg";
import "../App.css";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = ({ callBackLogin }) => {
  const { signIn, getBasicUserInfo, state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login page updating...");
    if (state.isAuthenticated) {
      console.log("User logged in...");
      callBackLogin(true);
      navigate("/home");
    }
  });

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
        <button className="pill-btn" onClick={()=>{signIn()}}>
          Login
        </button>
      </header>
    </div>
  );
};

export default Login;

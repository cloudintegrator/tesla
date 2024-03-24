import logo from "../logo.svg";
import "../App.css";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";

const Login = ({ callBackLogin }) => {
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  function handleSignIn() {
    signIn()
      .then(() => {
        callBackLogin(true);
        navigate("/home");
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

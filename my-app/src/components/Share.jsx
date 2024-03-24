import "../dashboard.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

const Share = () => {
  const { signOut, state, getBasicUserInfo } = useAuthContext();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("[Share] - Updating Share page...");
    if (state.isAuthenticated) {
      console.log("[Share] - User logged in...");
      getBasicUserInfo().then((data) => {
        setUser(data);
        console.log("[Share] - User logged in...", user?.username);
      });
    }
  }, []);

  function onHomeClick() {
    navigate("/home");
  }
  function onShareClick() {
    navigate("/share");
  }
  function onLogoutClick() {
    signOut();
  }
  return (
    <>
      <header>
        <div className="logosec">
          <div className="logo">SHARE MEDICINES</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
          />
        </div>
        <div className="message">
          <div className="circle"></div>
          <div className="dp">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
          <h2>{user?.username}</h2>
        </div>
      </header>

      <div className="main-container">
        <div className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option" onClick={() => onHomeClick()}>
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt="home"
                />
                <h4>Home</h4>
              </div>

              <div
                className="option2 nav-option"
                onClick={() => onShareClick()}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="share"
                />
                <h4>Share</h4>
              </div>
              <div
                className="nav-option logout"
                onClick={() => onLogoutClick()}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className="nav-img"
                  alt="logout"
                />
                <h4>Logout</h4>
              </div>
            </div>
          </nav>
        </div>
        <div className="main">
          <div className="report-container">
            <h1>Form to input med data</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Share;

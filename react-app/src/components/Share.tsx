import "../dashboard.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import ShareMedicine from "./ShareMedicine";
import message_icon from "../icon/messages.png";
import share_icon from "../icon/share.png";
import home_icon from "../icon/home.png";
import capsule_icon from "../icon/capsules.png";
import logout_icon from "../icon/logout.png"

const Share = () => {
  const { signOut, state, getBasicUserInfo } = useAuthContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<BasicUserInfo | null>(null);

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
  function onMessagesClick() {
    navigate("/messages");
  }
  function onLogoutClick() {
    signOut();
  }

  function onMenuClick() {
    let navcontainer = document.getElementById(
      "navcontainer"
    ) as HTMLDivElement;
    navcontainer.classList.toggle("navclose");
  }

  return (
    <>
      <header>
        <div className="logosec">
          <img
            src={capsule_icon}
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={() => onMenuClick()}
          />
          <div className="logo">SHARE MEDICINES</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={() => {
              onMenuClick();
            }}
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
          <h1>{user?.displayName}</h1>
        </div>
      </header>

      <div className="main-container">
        <div id="navcontainer" className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option" onClick={() => onHomeClick()}>
                <img src={home_icon} className="nav-img" alt="home" />
                <h4>Home</h4>
              </div>

              <div
                className="option2 nav-option"
                onClick={() => onShareClick()}
              >
                <img src={share_icon} className="nav-img" alt="share" />
                <h4>Share</h4>
              </div>
              <div
                className="option2 nav-option"
                onClick={() => onMessagesClick()}
              >
                <img src={message_icon} className="nav-img" alt="share" />
                <h4>Messages</h4>
              </div>
              <div
                className="nav-option logout"
                onClick={() => onLogoutClick()}
              >
                <img
                  src={logout_icon}
                  className="nav-img"
                  alt="logout"
                />
                <h4>Logout</h4>
              </div>
            </div>
          </nav>
        </div>
        <div className="main">
          <div className="share-container">
            <ShareMedicine />
          </div>
        </div>
      </div>
    </>
  );
};
export default Share;

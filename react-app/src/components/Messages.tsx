import "../dashboard.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { getMessages } from "../api/medicines/get-messages";
import { Medicine } from "../api/types/medicine";

const Messages = () => {
  const { signOut, state, getBasicUserInfo, getAccessToken } = useAuthContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const [messages, setMessages] = useState<Medicine[]>([]);

  useEffect(() => {
    console.log("[Messages] - Updating Share page...");
    if (state.isAuthenticated) {
      console.log("[Share] - User logged in...");
      getBasicUserInfo().then((data) => {
        setUser(data);
        console.log("[Messages] - User logged in...", user?.username);
        getMessagesForLoggedUser();
      });
    }
  }, []);

  async function getMessagesForLoggedUser() {
    let token = await getAccessToken();
    let user= await getBasicUserInfo()
    getMessages(token, user?.username).then((res) => {
      setMessages(res.data);
      console.log(messages);
    });
  }

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
          <h2>{user?.displayName}</h2>
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
                className="option2 nav-option"
                onClick={() => onMessagesClick()}
              >
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt="share"
                />
                <h4>Messages</h4>
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
          <div className="message-container">
            <h1>TODO</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Messages;

import "../dashboard.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { getMessages } from "../api/medicines/get-messages";
import { Medicine } from "../api/types/medicine";
import message_icon from "../icon/messages.png";
import share_icon from "../icon/share.png";
import home_icon from "../icon/home.png";

const Messages = () => {
  const { signOut, state, getBasicUserInfo, getAccessToken } = useAuthContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const [messages, setMessages] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    let user = await getBasicUserInfo();
    setIsLoading(true);
    getMessages(token, user?.username)
      .then((res) => {
        setMessages(res.data);
        console.log(messages);
      })
      .finally(() => {
        setIsLoading(false);
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
          <div className="logo">SHARE MEDICINES</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={() => onMenuClick()}
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
            {isLoading && <div className="loader"></div>}
            <h1>Messages</h1>
            {messages && (
              <table>
                <tbody>
                  {messages.map((obj, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="card">
                          <div className="card-container">
                            <h4>
                              <b>Requester:{obj.send_to}</b>
                            </h4>
                            <h4>
                              <b>Medicine: {obj.medicine_name}</b>
                            </h4>
                            <h4>
                              <b>Qty: {obj.medicine_qty}</b>
                            </h4>
                            <p>{obj.msg}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Messages;

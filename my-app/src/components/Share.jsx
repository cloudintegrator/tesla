import "../dashboard.css";
import { useNavigate } from "react-router-dom";
const Share = () => {
  const navigate = useNavigate();
  function onHomeClick() {
    navigate("/home");
  }
  function onShareClick() {
    navigate("/share");
  }
  function onLogoutClick() {
    navigate("/");
  }
  return (
    <body>
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
    </body>
  );
};
export default Share;

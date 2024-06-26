import "../dashboard.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { Medicine } from "../api/types/medicine";
import { getMedicines as gm } from "../api/medicines/get-medicines";
import { search } from "../api/medicines/search-medicines";
import { deleteMedicine } from "../api/medicines/delete-medicine";
import PickMedicine from "./PickMedicine";
import message_icon from "../icon/messages.png";
import share_icon from "../icon/share.png";
import home_icon from "../icon/home.png";
import capsule_icon from "../icon/capsules.png";
import logout_icon from "../icon/logout.png"
import search_icon from "../icon/search.png"

const Home = () => {
  const { signOut, state, getBasicUserInfo, getAccessToken } = useAuthContext();
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[] | null>(null);
  const [includeMine, setIncludeMine] = useState(true);
  const [seenPickMedPopup, setSeenPickMedPopup] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[Home] - Updating home page.");
    if (state.isAuthenticated) {
      console.log("[Home] - User is logged in.");
      getBasicUserInfo().then((data) => {
        setUser(data);
        console.log("[Home] - Logged in user", user?.username);
        getMedicines();
      });
    }
  }, []);

  async function getMedicines() {
    let flag = state.isAuthenticated;
    if (flag) {
      let accessToken = await getAccessToken();
      let user = await getBasicUserInfo();
      setIsLoading(true);
      gm(accessToken)
        .then((res) => {
          let data = res.data;
          let temp: Medicine[] = populateRows(includeMine, user, data);
          setMedicines(temp);
          setIsLoading(false);
        })
        .catch((e) => {
          getMedicines();
        });
    } else {
      navigate("/");
    }
  }
  function populateRows(
    includeMine: Boolean,
    user: BasicUserInfo | null,
    data: Medicine[]
  ) {
    let temp: Medicine[] = [];
    if (includeMine) {
      data.forEach((d) => {
        d.created = d.created?.substring(0, 10);
        d.medicine_validity = d.medicine_validity?.substring(0, 10);
        temp.push(d);
      });
    } else {
      data.forEach((d) => {
        if (d.email !== user?.username) {
          d.created = d.created?.substring(0, 10);
          d.medicine_validity = d.medicine_validity?.substring(0, 10);
          temp.push(d);
        }
      });
    }
    return temp;
  }
  function togglePickMedicinePopup(med) {
    console.log(med.id);
    setSelectedMed(med);
    setSeenPickMedPopup(!seenPickMedPopup);
  }

  async function handleSearchMedicine() {
    if (state.isAuthenticated) {
      setIsLoading(true);
      const input_elm = document.getElementById(
        "search-medicine-name"
      ) as HTMLInputElement;
      console.log(input_elm.value);
      let token = await getAccessToken();
      search(token, input_elm.value)
        .then((res) => {
          let data = res.data;
          let temp: Medicine[] = populateRows(includeMine, user, data);
          setMedicines(temp);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      navigate("/");
    }
  }

  async function handleDeleteMedicine(med) {
    if (state.isAuthenticated) {
      let token = await getAccessToken();
      deleteMedicine(token, med)
        .then(() => {
          getMedicines();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/");
    }
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
          <h4>{user?.displayName}</h4>
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
          <div className="searchbar">
            <input id="search-medicine-name" type="text" placeholder="Search" />
            <div className="searchbtn" onClick={handleSearchMedicine}>
              <img
                src={search_icon}
                className="icn srchicn"
                alt="search-icon"
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="isMine"
              name="Mine"
              checked={includeMine}
              onChange={(e) => {
                setIncludeMine(!includeMine);
              }}
            />
            <label>Mine</label>
          </div>
          {isLoading && <div className="loader"></div>}
          {medicines && (
            <div>
              <table className="container">
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>PUBLISHED BY</th>
                    <th>PUBLISHED ON</th>
                    <th>MEDICINE NAME</th>
                    <th>QUANTITY</th>
                    <th>VALIDITY</th>
                    <th>GET IT</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((obj, idx) => (
                    <tr key={idx}>
                      {/* <td>{obj.id}</td> */}
                      <td>{obj.email}</td>
                      <td>{obj.created?.toString()}</td>
                      <td>{obj.medicine_name?.toUpperCase()}</td>
                      <td>{obj.medicine_qty}</td>
                      <td>{obj.medicine_validity?.toString()}</td>
                      <td>
                        {!seenPickMedPopup && user?.username !== obj.email ? (
                          <button
                            className="button"
                            onClick={() => togglePickMedicinePopup(obj)}
                          >
                            Pick
                          </button>
                        ) : null}
                        {seenPickMedPopup && selectedMed?.id === obj.id ? (
                          <PickMedicine
                            selectedMed={obj}
                            callBackPickMedicine={() =>
                              togglePickMedicinePopup(obj)
                            }
                          />
                        ) : null}
                        {obj.email === user?.username && !seenPickMedPopup ? (
                          <button
                            className="button-cancel"
                            onClick={() => handleDeleteMedicine(obj)}
                          >
                            Delete
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { getMedicines as gm } from "./api/medicines/get-medicines";
import { Medicine } from "./api/types/medicine";
import Popup from "reactjs-popup";

function App() {
  const {
    signIn,
    signOut,
    getAccessToken,
    isAuthenticated,
    getBasicUserInfo,
    state,
  } = useAuthContext();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<BasicUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [token, setToken] = useState("");
  const [medicines, setMedicines] = useState<Medicine[] | null>(null);

  useEffect(() => {
    async function signInCheck() {
      setIsAuthLoading(true);
      await sleep(2000);
      const isSignedIn = await isAuthenticated();
      setSignedIn(isSignedIn);
      setIsAuthLoading(false);
      return isSignedIn;
    }
    signInCheck().then((res) => {
      if (res) {
        getUser();
        getMedicines();
      } else {
        console.log("User has not signed in");
      }
    });
  }, []);

  async function getUser() {
    setIsLoading(true);
    const userResponse = await getBasicUserInfo();
    const token = await getAccessToken();
    setToken(token);
    setUser(userResponse);
  }

  async function getMedicines() {
    const flag = await isAuthenticated();
    if (flag) {
      setIsLoading(true);
      const accessToken = await getAccessToken();
      gm(accessToken)
        .then((res) => {
          let data = res.data;
          setMedicines(data);
          console.log(data);
          setIsLoading(false);
        })
        .catch((e) => {
          getMedicines();
        });
    }
  }

  const handleSignIn = async () => {
    signIn()
      .then(() => {
        setSignedIn(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAcquire = (id) => {
    alert("I want" + id);
  };

  function ShareMedicinePopup() {
    return (
      <Popup trigger={<button className="button">Share Medicine</button>}>
        <div className="share-medicine-popup-div">
          <form>
            <label className="share-medicine-popup-label">Medicine</label>
            <input className="share-medicine-popup-input" type="text" />
            <label className="share-medicine-popup-label">Quantity</label>
            <input className="share-medicine-popup-input" type="text" />
            <label className="share-medicine-popup-label">Expiry Date</label>
            <input className="share-medicine-popup-input" type="text" />
            <button className="button">Add</button>
          </form>
        </div>
      </Popup>
    );
  }

  if (isAuthLoading) {
    return <div className="animate-spin h-5 w-5 text-white">.</div>;
  }

  if (!signedIn) {
    return (
      <div>
        <header className="App-header">
          <h1>
            <p>Unlock health: Share your unused meds.</p>
          </h1>
          <img src={logo} className="App-logo" alt="logo" />
          <button className="button" onClick={handleSignIn}>
            Login
          </button>
        </header>
      </div>
    );
  } else if (isLoading) {
    return (
      <div>
        <h1>Loading data...</h1>
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Logged in: {user?.displayName}</h1>
        {/* <h1>Token: {token}</h1> */}
        <div>
          {/* <button className="button">Share Medicine</button> */}
          <ShareMedicinePopup />
          {medicines && (
            <div>
              <table className="container">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Published By</th>
                    <th>Published On</th>
                    <th>Medicine Name</th>
                    <th>Quantity</th>
                    <th>Validity</th>
                    <th>Acquire</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((obj, idx) => (
                    <tr key={idx}>
                      <td>{obj.id}</td>
                      <td>{obj.email}</td>
                      <td>{obj.created?.toString()}</td>
                      <td>{obj.medicine_name}</td>
                      <td>{obj.medicine_qty}</td>
                      <td>{obj.medicine_validity?.toString()}</td>
                      <td>
                        <button
                          className="button"
                          onClick={() => handleAcquire(obj.id)}
                        >
                          I Want
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

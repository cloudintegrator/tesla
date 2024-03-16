import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { getMedicines as gm } from "./api/medicines/get-medicines";
import { Medicine } from "./api/types/medicine";
import { postMedicine } from "./api/medicines/post-medicines";
import { search } from "./api/medicines/search-medicines";
import { pickMedicine } from "./api/medicines/pick-medicine";

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
  const [medicines, setMedicines] = useState<Medicine[] | null>(null);
  const [seenAddMedPopup, setSeenAddMedPopup] = useState(false);
  const [seenPickMedPopup, setSeenPickMedPopup] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);
  const [includeMine, setIncludeMine] = useState(true);

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
        getBasicUserInfo().then((user) => {
          setUser(user);
        });

        getMedicines();
      } else {
        console.log("User has not signed in");
      }
    });
  }, []);

  async function getMedicines() {
    let flag = await isAuthenticated();
    let accessToken = await getAccessToken();
    let user = await getBasicUserInfo();
    if (flag) {
      setIsLoading(true);
      gm(accessToken)
        .then((res) => {
          let data = res.data;
          let temp: Medicine[] = [];
          if (includeMine) {
            setMedicines(data);
          } else {
            data.forEach((d) => {
              if (d.email !== user?.username) {
                temp.push(d);
              }
            });
            setMedicines(temp);
          }
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

  function toggleAddMedicinePopup() {
    setSeenAddMedPopup(!seenAddMedPopup);
  }
  function togglePickMedicinePopup(med) {
    console.log(med.id);
    setSelectedMed(med);
    setSeenPickMedPopup(!seenPickMedPopup);
  }

  function PickMedicinePopup(props) {
    async function handleButton(e) {
      console.log(selectedMed);
      const medicine_qty_field = document.getElementById(
        "medicine_qty"
      ) as HTMLInputElement;

      let medicine_qty = Number(medicine_qty_field.value);
      let actual_qty = selectedMed?.medicine_qty;

      if (medicine_qty !== 0) {
        let temp: Medicine = {
          id: selectedMed?.id,
          email: selectedMed?.email,
          medicine_name: selectedMed?.medicine_name,
          medicine_qty: medicine_qty,
          medicine_validity: selectedMed?.medicine_validity,
          expired: selectedMed?.expired,
        };

        setIsLoading(true);
        const token = await getAccessToken();
        pickMedicine(token, temp)
          .then((res) => {
            setIsLoading(false);
          })
          .finally(() => {
            getMedicines();
          });
      }
      props.toggle();
    }
    return (
      <div className="pick-medicine-popup-div">
        <form id="add_med_form" onSubmit={handleButton}>
          <label className="share-medicine-popup-label">Quantity</label>
          <input
            className="share-medicine-popup-input"
            id="medicine_qty"
            defaultValue={1}
            min={0}
            max={selectedMed?.medicine_qty}
            type="number"
          />
        </form>
        <button className="button" onClick={handleButton}>
          Done
        </button>
      </div>
    );
  }

  function ShareMedicinePopup(props) {
    async function handleShareMedicine(e) {
      e.preventDefault();
      const medicine_name = document.getElementById(
        "medicine_name"
      ) as HTMLInputElement;
      const medicine_qty = document.getElementById(
        "medicine_qty"
      ) as HTMLInputElement;
      const medicine_validity = document.getElementById(
        "medicine_validity"
      ) as HTMLInputElement;
      const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
      btnAdd.disabled = true;

      let created_date = new Date();
      let created_date_day = addLeadingZero(created_date.getDate());
      let created_date_month = addLeadingZero(created_date.getMonth());
      let created_date_year = created_date.getFullYear();

      let x = new Date(medicine_validity.value);
      let m = addLeadingZero(x.getMonth());
      let d = addLeadingZero(x.getDate());
      let y = x.getFullYear();

      const med: Medicine = {
        email: user?.username,
        created:
          created_date_year + "-" + created_date_month + "-" + created_date_day,
        medicine_name: medicine_name.value?.toUpperCase(),
        medicine_qty: Number(medicine_qty.value),
        medicine_validity: y + "-" + m + "-" + d,
        expired: false,
      };
      const accessToken = await getAccessToken();
      postMedicine(accessToken, med)
        .then((res) => {
          console.log(res);
          btnAdd.disabled = false;
          props.toggle();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          getMedicines();
        });
    }
    function addLeadingZero(n) {
      if (n <= 9) return "0" + n;
      else return n;
    }
    return (
      <div className="share-medicine-popup-div">
        <form id="add_med_form" onSubmit={handleShareMedicine}>
          <label className="share-medicine-popup-label">Medicine</label>
          <input
            className="share-medicine-popup-input"
            id="medicine_name"
            type="text"
            required
          />
          <label className="share-medicine-popup-label">Quantity</label>
          <input
            className="share-medicine-popup-input"
            id="medicine_qty"
            min={1}
            type="number"
            required
          />
          <label className="share-medicine-popup-label">Expiry Date</label>
          <input
            className="share-medicine-popup-input"
            id="medicine_validity"
            type="date"
            required
          />
          <button className="button" id="btnAdd" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }

  async function handleSearchMedicine() {
    setIsLoading(true);
    const input_elm = document.getElementById(
      "search-medicine-name"
    ) as HTMLInputElement;
    console.log(input_elm.value);
    let token = await getAccessToken();
    search(token, input_elm.value)
      .then((res) => {
        let data = res.data;
        if (includeMine) {
          setMedicines(data);
        } else {
          let temp: Medicine[] = [];
          data.forEach((d) => {
            if (d.email !== user?.username) {
              temp.push(d);
            }
          });
          setMedicines(temp);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
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
          <button className="button" onClick={toggleAddMedicinePopup}>
            Share Medicine
          </button>
          <br />
          <br />
          <br />
          <div className="inline fields">
            <div className="field">
              <input
                id="search-medicine-name"
                style={{ height: "40px", width: "50%" }}
                type="string"
              />
              <button className="button" onClick={handleSearchMedicine}>
                Search
              </button>
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
          </div>
          {seenAddMedPopup ? (
            <ShareMedicinePopup toggle={toggleAddMedicinePopup} />
          ) : null}
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
                      <td>{obj.medicine_name?.toUpperCase()}</td>
                      <td>{obj.medicine_qty}</td>
                      <td>{obj.medicine_validity?.toString()}</td>
                      <td>
                        {!seenPickMedPopup ? (
                          <button
                            className="button"
                            onClick={() => togglePickMedicinePopup(obj)}
                          >
                            Pick
                          </button>
                        ) : null}
                        {seenPickMedPopup && selectedMed?.id === obj.id ? (
                          <PickMedicinePopup
                            toggle={() => togglePickMedicinePopup(obj)}
                          />
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
    );
  }
}

export default App;

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { getMedicines as gm } from "./api/medicines/get-medicines";
import { Medicine } from "./api/types/medicine";

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
  const [medicines,setMedicines] = useState<Medicine[] | null>(null);

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
    setIsLoading(false);
  }

  async function getMedicines() {
    const flag = await isAuthenticated();
    if (flag) {
      setIsLoading(true);
      const accessToken = await getAccessToken();
      gm(accessToken).then((res) => {
        let data = res.data;
        setMedicines(data);
        console.log(data);
        setIsLoading(false);
      }).catch((e)=>{
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
  } else {
    return (
      <div className="App">
        <h1>Logged in: {user?.orgName}</h1>
        <h1>Token: {token}</h1>

        <div>
          <h1>Medicines</h1>
          {medicines && (
            <h1>Test</h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;

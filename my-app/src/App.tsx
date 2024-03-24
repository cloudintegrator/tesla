import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Share from "./components/Share";
import Home from "./components/Home";
import Login from "./components/Login";
function App() {
  const [signedIn, setSignedIn] = useState<Boolean>(false);
  function handleCallBackLogin(data: Boolean) {
    setSignedIn(data);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login callBackLogin={handleCallBackLogin} />}
        />
        {signedIn && <Route path="/home" element={<Home />} />}
        {signedIn && <Route path="/share" element={<Share />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

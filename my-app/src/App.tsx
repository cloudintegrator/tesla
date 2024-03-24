import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Share from "./components/Share";
import Home from "./components/Home";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

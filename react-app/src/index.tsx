
import ReactDOM from 'react-dom/client';
import React,{useState,useEffect} from 'react';
import './index.css';
import App from './App';
import { AuthProvider } from "@asgardeo/auth-react";


const authConfig = {
  signInRedirectURL: "http://localhost:3000/",
  signOutRedirectURL: "http://localhost:3000/",
  clientID: "9UylrhR4OafUeXdvpBV6tbK37aUa",
  baseUrl: "https://api.asgardeo.io/t/demoltda",
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
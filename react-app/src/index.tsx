
import ReactDOM from 'react-dom/client';
import React,{useState,useEffect} from 'react';
import './index.css';
import App from './App';
import { AuthProvider } from "@asgardeo/auth-react";


const authConfig = {
  signInRedirectURL: "http://localhost:3000/",
  signOutRedirectURL: "http://localhost:3000/",
  // signInRedirectURL: "https://cbf4bd14-4706-4786-8ae3-67cd680b4909.e1-us-east-azure.choreoapps.dev",
  // signOutRedirectURL: "https://cbf4bd14-4706-4786-8ae3-67cd680b4909.e1-us-east-azure.choreoapps.dev",
  clientID: "SvEFbs1fqcFmk9485LPUZXijwzAa",
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
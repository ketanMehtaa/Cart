import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbr8oeaU6bdbDsYJUVVu3eJj7nNMruFSs",
  authDomain: "cart-a8f76.firebaseapp.com",
  projectId: "cart-a8f76",
  storageBucket: "cart-a8f76.appspot.com",
  messagingSenderId: "553865165918",
  appId: "1:553865165918:web:8e99f1ea447e5f9f1588cf",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

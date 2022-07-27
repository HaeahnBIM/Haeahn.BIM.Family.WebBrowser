import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import App from "./App";
import User from "./User";
import Report from "./Report";
import Merge from "./Merge";
import FavList from "./components/FavList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/App" element={<App />} />
      <Route path="/User" element={<User />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/Merge" element={<Merge />} />
      <Route path="/FavList" element={<FavList />} />
    </Routes>
  </BrowserRouter>
);

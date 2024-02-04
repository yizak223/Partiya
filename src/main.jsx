import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/index.jsx";
import Auth from "./pages/Auth"
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./components/context/User.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

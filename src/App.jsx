import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import Join from "./components/Join";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/event:id" element={<Join />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

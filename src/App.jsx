import { useState } from "react";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import CreateEvent from "./components/CreateEvent";
=======
import Home from "./pages/home";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import Join from "./components/Join";
>>>>>>> origin/main
import "./App.css";

function App() {
  return (
    <>
<<<<<<< HEAD
      <Navbar />
      <CreateEvent />
      <h1>Hello world!</h1>
=======
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/event:id" element={<Join />} />
        </Routes>
      </BrowserRouter>

>>>>>>> origin/main
    </>
  );
}

export default App;

import { useState } from "react";
import Navbar from "./components/Navbar";
import CreateEvent from "./components/CreateEvent";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <CreateEvent />
      <h1>Hello world!</h1>
    </>
  );
}

export default App;

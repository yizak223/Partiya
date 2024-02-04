import React, { useState } from "react";
import Join from "../../components/Join";
import { useNavigate } from "react-router";
import "./Home.css";

function Home() {
  const [toggleJoin, setToggleJoin] = useState(false);
  const navigate = useNavigate();
  const pathToCreate = () => {
    navigate("/createEvent");
  };
  const pathToJoin = () => {
    setToggleJoin(!toggleJoin);
  };
  return (
    <>
      <div className="home">
        <div className="titelsContainer">
          <h1 className="wellcomeTitle">Partiya</h1>
          <h2 className="secondTitle">paln with us!</h2>
          <div className="homeBtns">
            <button className="btnEvent" onClick={pathToCreate}>
              Create Event
            </button>
            <button className="btnEvent" onClick={pathToJoin}>
              Join Event
            </button>
          </div>
        </div>
          {toggleJoin ? <Join /> : null}
      </div>
    </>
  );
}

export default Home;

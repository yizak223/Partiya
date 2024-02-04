import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, itemName }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Item {itemName}</h1>
        </div>
        <div className="body">
          <p>This item bring: ...</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          {/* <button>Continue</button> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
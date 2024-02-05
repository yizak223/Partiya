import React, { useEffect, useState } from "react";
import "./Modal.css";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { auth } from "../../config/fireBaseConfig";


function Modal({ setOpenModal, itemName, addItemToUser }) {

  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //       const userRef = doc(db, "users", user.uid);
  //       const userSnap = await getDoc(userRef);
  //       const itemsDisplay = userSnap.data().items;
  //       setItemsDisplay(itemsDisplay);
  //       console.log(itemsDisplay);

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
        
  //       setNameBring(currentUser.nickname)
  //     }
  //   })
  // }, [])
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
          <p>This item bring:</p>
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
          <button onClick={() => { addItemToUser(itemName) }}>Add me</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
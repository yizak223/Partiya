import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../config/fireBaseConfig";
import {
  doc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { UserContext } from "../../components/context/User";
import "../Join/Join.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function Join() {
  const navgate = useNavigate()
  const [eventPINs, setEventPINs] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists) {
          const userData = userDoc.data();
          const eventPINsArray = userData.eventPIN || [];
          //add query to eventPIN
          setEventPINs(eventPINsArray);
          console.log(eventPINs);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting user document:", error);
      }
    };

    getUserData();
  }, []);

  const addPinToUser = async (pin) => {
    try {
      const newUserRef = doc(db, "users", user.id);
      const updatedEventPINs = [...eventPINs, pin];
      setEventPINs(updatedEventPINs);
      await updateDoc(newUserRef, {
        eventPIN: updatedEventPINs,
      });
      console.log("PIN Code Added To User!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const join = (e) => {
    e.preventDefault();
    const pin = e.target.eventPIN.value;
    console.log(pin);
    addPinToUser(pin);
    navgate(`/event/${pin}`)

  };

  return (
    <div className="containerJoin">
      <form onSubmit={join}>
        <h2>Enter PIN Code</h2>
        <input
          className="inputPin"
          name="eventPIN"
          type="text"
          placeholder="Enter PIN Code"
        />
        <button className="BtnPin" type="submit">
          Join
        </button>
      </form>
    </div>
  );
}

export default Join;

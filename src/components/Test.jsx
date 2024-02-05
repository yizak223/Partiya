import React, { useEffect, useState } from "react";
import { auth, db } from "../config/fireBaseConfig";
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "@firebase/firestore";
import { useParams } from "react-router-dom";

function Test() {
  const [users, setUsers] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const get = async () => {
      try {
        const ref = collection(db, "users");
        const mydocs = await getDocs(ref);
        const filtered = mydocs.docs.filter((item) => {
          return item.data().eventPIN.includes("555");
        });
        const nicknames = filtered.map((doc) => doc.data().nickname);
        setUsers(nicknames);
        console.log("Updated users:", nicknames);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    get();
  }, [eventId]);

  return (
    <>
      {users.map((user, index) => (
        <div key={index}>{user}</div>
      ))}
    </>
  );
}

export default Test;

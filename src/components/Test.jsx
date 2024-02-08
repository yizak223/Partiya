import React, { useEffect, useState } from "react";
import { auth, db } from "../config/fireBaseConfig";
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "@firebase/firestore";
import { useParams } from "react-router-dom";

function Test() {
  const [users, setUsers] = useState([]);
  const { eventId } = useParams();

  // useEffect(() => {
  //   const get = async () => {
  //     try {
  //       const ref = collection(db, "users");
  //       const mydocs = await getDocs(ref);
  //       const filtered = mydocs.docs.filter((item) => {
  //         console.log(item.data().eventPIN);
  //         return item.data().eventPIN.includes(eventId);
  //       });
  //       const nicknames = filtered.map((doc) => doc.data().nickname);
  //       setUsers(nicknames);
  //       console.log("Updated users:", nicknames);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     }
  //   };

  //   get();
  // }, [eventId]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const nicknames = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.eventPIN && data.eventPIN.includes(eventId)) {
          nicknames.push(data.nickname);
        }
      });
      setUsers(nicknames);
      console.log("Updated users:", nicknames);
    });
  
    return () => unsubscribe();
  }, [eventId]);
  

  // useEffect(() => {
  //   const ref = collection(db, "users");
  //   const unsubscribe = onSnapshot(ref, (mydocs) => {
  //     const filtered = mydocs.docs.filter((doc) => {
  //       console.log(doc.data());
  //       return doc.data().eventPIN.includes(eventId);
  //     });
  //     const nicknames = filtered.map((doc) => doc.data().nickname);
  //     setUsers(nicknames);
  //     console.log("Updated users:", nicknames);
  //   });

  //   return () => unsubscribe();
  // }, [eventId]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      {users.map((user, index) => (
        <p
          className="userName"
          key={index}
          style={{ backgroundColor: getRandomColor() }}
        >
          {user.charAt(0)}
        </p>
      ))}
    </>
  );
}

export default Test;

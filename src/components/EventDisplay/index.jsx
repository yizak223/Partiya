import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  getDoc,
  where,
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { UserContext } from "../context/User";
import { useContext } from "react";
import { db, auth } from "../../config/fireBaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import "./EventDisplat.css";
import Test from "../test";
import Modal from "../Modal";

function EventDisplay() {
  const { eventId } = useParams();
  const { user, currentUser } = useContext(UserContext);

  const [NameBring, setNameBring] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState([]);
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);
  const [itemsDisplay, setItemsDisplay] = useState(null);

  useEffect(() => {
    const renderItemsUser = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          const itemsDisplay = userSnap.data().items;
          setItemsDisplay(itemsDisplay);
          console.log(itemsDisplay);

          // const collectionRef = collection(db, 'users');
          // const qUser = query(collectionRef, where("items", "==", itemName));

          // const unsub = onSnapshot((qUser), (snapshot) =>
          // setItemsDisplay(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
          // return unsub
        }
      });
    };
    renderItemsUser();
  }, []);

  useEffect(() => {
    console.log("Event ID:", eventId);
    const fetchData = async () => {
      try {
        const eventDoc = doc(db, "events", eventId);
        const docSnapshot = await getDoc(eventDoc);
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          console.log("Fetched event data:", docData);
          setEvent(docData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };
    fetchData();
  }, [eventId]);

  // const getItemUser = async ()=> {
  //   try {
  //     const userRef = doc(db, "users", user.id)
  //     const userDoc = await getDoc(userRef)
  //     if (userDoc.exists) {
  //       const userData = userDoc.data()
  //       const eventPINsArray = userData.eventPIN || []
  //       //add query to eventPIN
  //       setEventPINs(eventPINsArray)
  //       console.log(eventPINs);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.error("Error getting user document:", error);
  //   }
  // }

  const addItemToUser = async (itemNameArgument) => {
    try {
      const newWhoBringsRef = doc(db, "events", eventId);
      const newWhoBrings = [...NameBring, currentUser.nickname];

      setNameBring(newWhoBrings);

      await updateDoc(newWhoBringsRef, {
        items: {
          whoBrings: {
            arrayUnion: newWhoBrings,
          },
        },
      });

      console.log("user was added ", newWhoBrings);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const bigShow = (itemName) => {
    setItemName(itemName);
  };

  return (
    <div className="evantContainer">
      <h1 id="headlineEavent">{event?.name}</h1>
      <div className="itemsContainer">
        <div className="namesClass">
          <Test />
        </div>
        {modalOpen && (
          <Modal
            NameBring={NameBring}
            addItemToUser={addItemToUser}
            itemName={itemName}
            setOpenModal={setModalOpen}
          />
        )}
        {event?.items &&
          event.items.map((item, index) => (
            <div
              onClick={() => {
                bigShow(item.itemName);
                setModalOpen(true);
                console.log(1);
              }}
              className="itemContainer"
              key={index}
            >
              <p>{item.amount}</p>
              <p>{item.itemName}</p>
              <p>{item.whoBrings}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventDisplay;

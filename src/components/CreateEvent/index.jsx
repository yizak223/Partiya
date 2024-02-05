import { useState, useContext, useEffect } from "react";
import { callOpenAIAPI } from "../../config/openAiConfig";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/fireBaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../components/context/User";
import { useNavigate } from "react-router";
import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState([]);
  const [amount, setAmount] = useState();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [eventID, setEventID] = useState();
  const {user} = useContext(UserContext);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const answer = ` ${formData.activity} at ${formData.place}, in ${formData.location} for ${formData.numOfP} people from ${formData.from} till ${formData.to}`;
    const response = await callOpenAIAPI(answer);
    const newItems = response.map((item) => {
      return { itemName: item, whoBrings: [] };
    });
    console.log(response);
    setItems(newItems);
    console.log({items})

  };

  const removeItem = (itemIndex) =>{
    setItems(prevData => (
      prevData.filter((item, index) => index !== itemIndex)
    ))
  }
  const newItemHandler = (e) =>{
    setNewItem(e.target.value);
  }
  
  const submitNewItem = (e) =>{
    e.preventDefault();
    setItems([...items, {itemName: newItem, whoBrings: []}])
    setNewItem('');
  }

  const submitAmount = (index) => (e) => {
    e.preventDefault();
    const updatedItems = [...items];
    updatedItems[index].amount = amount; 
    setItems(updatedItems);
    setAmount(''); 
    console.log({items});
  };
  
  const amountHandler = (e) =>{
    setAmount(e.target.value);
  }


  useEffect(() => {
    if (eventID && userEvents.length > 0) {
      addEvent();
      navigate(`/event/${eventID}`);
    }
  }, [eventID, userEvents]); 
  
  const addEventToDB = async () => {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...formData,
        managerID: user.id,
        items: items,
      });
      const eventId = docRef.id;
      console.log("Event has been added to 'events' with the ID:", eventId);
      setEventID(eventId);
      addEvent(eventId);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  
  const addEvent = async (eventId) => {
    try {
      if (!eventId) {
        console.error('Event ID is undefined');
        return;
      }
  
      const newUserRef = doc(db, 'users', user.id);
      const updatedEventPINs = [...userEvents, eventId];
      setUserEvents(updatedEventPINs);
      await updateDoc(newUserRef, {
        eventPIN: updatedEventPINs,
      });
      console.log('PIN Code Added To User!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  return (
    <>
    <div className="createEvent">
      <h1>Let's plan out our activity!</h1>
      <form onSubmit={submitHandler}>
        <label>The Name</label>
        <input
          type="text"
          name="name"
          placeholder="Pratiya"
          onChange={changeHandler}
        />

        <label>Kind of activity</label>
        <input
          type="text"
          name="activity"
          placeholder="Pratiya"
          onChange={changeHandler}
        />

        <label>The Place</label>
        <input
          type="text"
          name="place"
          placeholder="Sea, Forest, hiils..."
          onChange={changeHandler}
        />

        <label>The Location</label>
        <input
          type="text"
          name="location"
          placeholder="country / city"
          onChange={changeHandler}
        />

        <label>How many</label>
        <input
          type="number"
          name="numOfP"
          placeholder="20, 5, 10..."
          onChange={changeHandler}
        />

        <label className="dates">Dates</label>
        <label>From</label>
        <input type="date" name="from" onChange={changeHandler} />
        <label>To</label>
        <input type="date" name="to" onChange={changeHandler} />
        <button type="submit">Generate</button>
      </form>
    </div>

    <div>
    {items.length > 0 ? (
        <div className="itemsCreateDisp">
          {items.map((item, index) => {
            return (
              <div key={index} className="itemCreateDisp">
                <p>{item.itemName}</p>
                <form onSubmit={submitAmount(index)}>
                  <input className="createInput" type="number" placeholder="Amount" onChange={amountHandler}/>
                  <button id="createBtn">+</button>
                </form>
                <button onClick={() => removeItem(index)}><i className="bi bi-x"></i></button>
              </div>
            );
          })}
          <form onSubmit={submitNewItem}>
            <input type="text" id="addInput" placeholder="Add another item:" onChange={newItemHandler}/>
            <button id="addBtn">Add </button>
          </form>
        </div>
      ) : null}
      <button id="startBtn" onClick={addEventToDB}>Let's start the party!</button>
    </div>

    </>
  );
}

export default CreateEvent;

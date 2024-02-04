import { useState, useContext, useEffect } from "react";
import { callOpenAIAPI } from "../../config/openAiConfig";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/fireBaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../components/context/User";

function CreateEvent() {
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
    // Check if the event ID is defined and user events array is not empty
    if (eventID && userEvents.length > 0) {
      addEvent();
    }
  }, [eventID, userEvents]); // Run this effect whenever event ID or user events array changes
  
  const addEventToDB = async () => {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...formData,
        managerID: user.id,
        items: items,
      });
      const eventId = docRef.id; // Get event ID
      console.log("Event has been added to 'events' with the ID:", eventId);
      setEventID(eventId); // Set event ID in state
      // Now, you can call addEvent right after setting the eventID
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
    <div>
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

        <label>Dates</label>
        <label>From</label>
        <input type="date" name="from" onChange={changeHandler} />
        <label>To</label>
        <input type="date" name="to" onChange={changeHandler} />
        <button type="submit">Generate</button>
      </form>

      {items.length > 0 ? (
        <div>
          {items.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.itemName}</p>
                <button onClick={() => removeItem(index)}><i className="bi bi-x"></i></button>
                <form onSubmit={submitAmount(index)}>
                  <input type="number" placeholder="Amount" onChange={amountHandler}/>
                  <button>Add amount</button>
                </form>
              </div>
            );
          })}
          <form onSubmit={submitNewItem}>
            <input type="text" placeholder="Add another item:" onChange={newItemHandler}/>
            <button>Add +</button>
          </form>
        </div>
      ) : <h1>no items{console.log({items})}</h1>}
      <button onClick={addEventToDB}>Let's start the party!</button>
    </div>
  );
}

export default CreateEvent;

import React from "react";
import { useState } from "react";
import { callOpenAIAPI } from "../../config/openAiConfig";

function CreateEvent() {
  const [formData, setFormData] = useState([]);

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const answer = ` ${formData.activity} at ${formData.place}, in ${formData.location} for ${formData.numOfP} people from ${formData.from} till ${formData.to}`;
    const response = await callOpenAIAPI(answer);
    setItems(response);
    console.log(response);
  };

  const removeItem = (itemIndex) =>{
    setItems(prevData => (
      prevData.filter((item, index) => index !== itemIndex)
    ))
  }

  const addItem = (e) =>{
    e.preventDefault();
    setItems([...items, newItem])
    setNewItem('');
  }

  const newItemHandler = (e) =>{
    setNewItem(e.target.value);
  }

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
            return <p key={index}>{item}<button onClick={() => removeItem(index)}><i class="bi bi-x"></i></button></p>;
          })}
          <form onSubmit={addItem}>
            <input type="text" placeholder="Add another item:" onChange={newItemHandler}/>
            <button>Add +</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default CreateEvent;

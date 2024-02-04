import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getDoc, doc } from '@firebase/firestore'
import { UserContext } from '../context/User'
import { useContext } from 'react'
import { db } from '../../config/fireBaseConfig'
import './EventDisplat.css'
import Modal from '../Modal'

function EventDisplay() {
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState()
  const [itemName, setItemName] = useState('')
  const { eventId } = useParams()
  const { user } = useContext(UserContext)
  console.log(eventId);
  const bigShow = (itemName) => {
      setItemName(itemName)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventDoc = doc(db, 'events', eventId)
        const docSnapshot = await getDoc(eventDoc)
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data()
          console.log(docData);
          setEvent(docData)
          console.log(event);
        }
        else {
          console.log("No such document!");
        }
      }
      catch (error) {
        console.log("Error getting document:", error);
      }
    };
    fetchData()
  }, [])
  console.log(user);
  return (
    <div>

      <h1>{event?.name}</h1>
      <div>
        {modalOpen && <Modal itemName={itemName} setOpenModal={setModalOpen} />}
        {event?.items.map((item, index) => (
          <div onClick={() => {
            bigShow(item.itemName)
            setModalOpen(true)
            console.log(1);
          }} className='itemContainer' key={index}>
            <p>{item.amount}</p>
            <p>{item.itemName}</p>
            <p>{item.whoBrings}</p>
            {/* <button onClick={()=>{bigShow(item.itemName)}}>bigShow</button> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventDisplay

import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../components/context/User'
import { onAuthStateChanged } from '@firebase/auth'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../config/fireBaseConfig'
import '../UserEvents/userEvent.css';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router';

export default function UserEvents() {
    const navigate = useNavigate()
    const { user, currentUser } = useContext(UserContext)
    const [events, setEvents] = useState([])
    useEffect(() => {
        console.log(user?.id);
        console.log();
        const renderEvents = () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    const events = userSnap.data().eventPIN;
                    setEvents(events);
                    console.log(events);
                }
            })
        }
        renderEvents()
    }, [user])

    return (
        <div>
            <div className="App">
            <h1> {currentUser?.nickname} events</h1>
            {
                !events ?
                    <div>
                        <h1>Still Don't have event</h1>
                    </div>
                    : null
            }
            {
                events?.map((event, index) => {
                    return (
                        <div onClick={()=>{navigate(`/event/${event}`)}} className='eventContainer' key={index}>
                            <h2>{event}</h2>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

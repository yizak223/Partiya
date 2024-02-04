import React, { useState } from 'react'
import Join from '../../components/Join'
import { useNavigate } from 'react-router'
import './Home.css'


function Home() {
  const [toggleJoin, setToggleJoin] = useState(false)
  const navigate = useNavigate()
  const pathToCreate = () => {
    navigate('/createEvent')
  }
  const pathToJoin = () => {
    setToggleJoin(!toggleJoin)
  }
  return (
    <>
      <div className="home">
        <h1 className='wellcomeTitle'>Welcome to Partiya!</h1>
        <h2 className='secondTitle'>
          {/* Welcome to our Exits App -  */}
          where your journey begins. <br />
          Explore and navigate exits smartly and efficiently,
          ensuring a successful day from the moment you step out of your home</h2>
        <div className="homeBtns">
          <button className='btnEvent' onClick={pathToCreate}>Create Event</button><br />
          <button className='btnEvent' onClick={pathToJoin}>Join Event</button>
        </div>
        <div>
        </div>
      </div>
      {toggleJoin ? <Join /> : null}
    </>

  )
}

export default Home

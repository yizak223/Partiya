import React, { useState } from 'react'
import Join from '../../components/Join'
import { useNavigate } from 'react-router'
import '../home/Home.css'


function Home() {
  const [toggleJoin, setToggleJoin]= useState(false)
    const navigate = useNavigate()
  const pathToCreate = ()=>{
    navigate('/createEvent')
  }
  const pathToJoin = ()=>{
    setToggleJoin(!toggleJoin)
  }
    return (
    <div className="home">
      <h1 className='wellcomeTitle'>Welcome to Partiya!</h1>
      <div className="homeBtns">
        <button className='btnEvent' onClick={pathToCreate}>Create Event</button><br />
        <button className='btnEvent' onClick={pathToJoin}>Join Event</button>
        {toggleJoin? <Join/> :null}
      </div>
    </div>
  )
}

export default Home

import React from 'react'
import '../Join/Join.css'

function Join() {
  const join =(e)=>{
    e.prevenDefault()
  }
  return (
    <div className='containerJoin'>
      <form onSubmit={join}>
        <h2>Great! please enter the PIN Code</h2>
        <input  className='inputPin' type="text" placeholder='Enter PIN Code'/>
        <button className='BtnPin' type="submit">Join</button>
      </form>
    </div>
  )
}

export default Join

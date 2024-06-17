import React from 'react';
import nothing_here from './assets/Nothing-here.jpg'

const NotFound = (props) => {
    
    console.log("Error")
  return (
    <div className='container d-flex my-5' style={{flexDirection:"column", alignItems: "center", justifyContent:"center", maxWidth:"1000px"}}>
      <h2>{props.message}</h2>
      <a href="/" style={{textDecoration:"none", color: "black"}}>Head Over To Home Page</a>
      <img src={nothing_here} alt="" />
    </div>
  )
}

export default NotFound;

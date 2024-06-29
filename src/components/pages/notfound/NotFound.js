import React from 'react';
import nothing_here from '../../assets/Nothing-here.jpg'
import "./NotFound.css"

const NotFound = (props) => {
    
    console.log("Error")
  return (
    <div className="not-found">
      <h2>{props.message}</h2>
      <a href="/">Head Over To Home Page</a>
      <img src={nothing_here} alt="not found" />
    </div>
  )
}

export default NotFound;

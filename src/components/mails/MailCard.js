import React from 'react'
import hourglass from '../assets/hourglass.gif'
import success_tick from '../assets/success-tick.jpg'

export default function MailCard(props) {
  return (
    <div className="d-flex" >
      <div style={{flexGrow:"7"}}>
     <ol className="list-group" style={{listStyleType: "none"}}>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">Date:</div>
      {props.date}
    </div>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">Subject:</div>
      {props.subject}
    </div>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">E-Mail content:</div>
      {props.content}
    </div>
  </li>
</ol> 
    </div>
    <div className="d-flex justify-content-center" style={{border:"1px solid #ced4da",borderRadius:"5px", flexGrow:"3", alignItems:"center", flexDirection:"column"}}>
    <p>Delivery Status</p>
    <img src={props.status ? success_tick : hourglass} alt="not sent" style={{height:"105px"}}/>
    </div>
    </div>
  )
}

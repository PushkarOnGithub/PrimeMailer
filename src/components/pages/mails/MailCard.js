import React from "react";
import "./MailCard.css";

export default function MailCard(props) {
  return (
    <div className="mail-card">
      <div className="mail-card-info">
        <i className="fa-regular fa-user"></i>
        <div className="mail-card-user-info">
          <span className="name">{props.draft.name}</span>
          <span className="email">{props.draft.email}</span>
          <span className="date">{props.draft.date}</span>
        </div>
      </div>
      <div className="mail-card-email-content">
        <span className="subject">{props.draft.subject}</span>
        <span className="body">{props.draft.html}</span>
      </div>
      <div className="mail-card-delivery-status">
        <span> Status </span>
        {props.draft.status ? (
          <span className="delivered">Delivered</span>
        ) : (
          <span className="pending"> Pending </span>
        )}
      </div>
    </div>
  );
}

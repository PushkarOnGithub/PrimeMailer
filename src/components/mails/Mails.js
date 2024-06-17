import React, { useEffect, useState } from "react";
import MailCard from "./MailCard";
import NotFound from "../NotFound";

const REACT_APP_SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export default function Mails() {
  const [mails, setMails] = useState(null);
  useEffect(() => {
    const getMails = async () => {
      try{
        let response = await fetch(`${REACT_APP_SERVER_HOST}/mails/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        response = await response.json();
        console.log((response.drafts));
        if(response.success) setMails(Array.from(response.drafts));
      }
      catch{
        console.log("Unable to reach server")
      }
    };
    getMails();
  }, []);

  return (
    <>
    {!mails || mails.length === 0 ? (<NotFound message="Drafts Will Appear Here Once You Have One" />) : (
      <div
          className="container my-5 d-flex justify-content-center"
          style={{ flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <h2>Mail History</h2>
          {mails.map((draft, index)=>{
            return (<>
                <h6>Draft {index+1}:</h6>
                <MailCard date={new Date(draft.date).toString().split("GMT")[0]} content={draft.html} status={draft.status} subject={draft.subject} />
            </>)
          })}
        </div>
    )}
      </>
    );
}

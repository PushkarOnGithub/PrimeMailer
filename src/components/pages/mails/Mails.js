import React, { useEffect, useState } from "react";
import MailCard from "./MailCard";
import NotFound from "../notfound/NotFound";
import "./Mails.css";

const REACT_APP_SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export default function Mails() {
  const [mails, setMails] = useState("");
  useEffect(() => {
    const getMails = async () => {
      try {
        let response = await fetch(`${REACT_APP_SERVER_HOST}/mails/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
        });
        response = await response.json();
        if (response.success) setMails(Array.from(response.drafts));
      } catch {
        console.log("Unable to reach server");
      }
    };
    getMails();
  }, []);

  return (
    <>
      {!mails || mails.length === 0 ? (
        <NotFound message="Start Writing Mails To See Them Here" />
      ) : (
        <>
          <h2>Mail History</h2>
          <div className="mail-container">
            {mails.map((draft) => {
              return (
                <>
                  <MailCard draft={draft} />
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

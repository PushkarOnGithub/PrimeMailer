import React from "react";
import MailCard from "./MailCard";
import NotFound from "../notfound/NotFound";
import "./Mails.css";
import useFetchData from "../../../hooks/useFetchData";
import Loading from "../../loading/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const REACT_APP_SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export default function Mails() {
  const navigate = useNavigate();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authToken: localStorage.getItem("authToken"),
    },
  };
  const { data, loading, error } = useFetchData(
    `${REACT_APP_SERVER_HOST}/mails/get`,
    options
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    navigate("/")
    toast.error(error);
    return;
  }

  if (!data || data.drafts.length === 0) {
    return <NotFound message="Start Writing Mails To See Them Here" />;
  }

  return (
    <>
      <>
        <h2>Mail History</h2>
        <div className="mail-container">
          {data &&
            Array.from(data.drafts).map((draft) => {
              return (
                <>
                  <MailCard draft={draft} />
                </>
              );
            })}
        </div>
      </>
    </>
  );
}

import React from "react";
import loading from "../assets/loading.gif";
import "./Loading.css"

export default function Loading() {
  return (
    <>
      <img
      className="loading"
        src={loading}
        alt="loading"
      />
    </>
  );
}

import React, { useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SimpleModal from "../modal/SimpleModal";

export default function Navbar() {
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const sidebar_toggle_button = document.getElementById("toggle-sidebar");

    document.addEventListener("click", (event) => {
      const clickedElement = event.target;
      // Check if the clicked element is not part of the sidebar
      if (sidebar_toggle_button.contains(clickedElement)) {
        sidebar.classList.add("show");
      } else if (!sidebar.contains(clickedElement)) {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("show");
      }
    });
  }, []);

  const isLoggedIn = () => {
    return localStorage.getItem("authToken") != null;
  };

  const navigate = useNavigate();
  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("picture");
    navigate("/");
    toast.success("Logged Out Successfully", { theme: "colored" });
  };

  return (
    <>
      <SimpleModal handleLogoutConfirm={handleLogoutConfirm} />
      <header className="header">
        <nav className="navbar">
          <div className="nav-logo">
            <Link className="nav-logo-link" to="/">
              {" "}
              PrimeMailer{" "}
            </Link>
          </div>
          <div className="nav-links">
            <ul className="nav-list">
              <li className="nav-list-item">
                <Link className="nav-list-item-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-list-item">
                <Link className="nav-list-item-link" to="/compose">
                  Write
                </Link>
              </li>
              {isLoggedIn() && (
                <li className="nav-list-item">
                  <Link className="nav-list-item-link" to="/mails">
                    Mails
                  </Link>
                </li>
              )}
              <li className="nav-list-item">
                <Link className="nav-list-item-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          {isLoggedIn() ? (
            <button className="nav-list-item simple-modal-open-button" style={{border:"none"}}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          ) : (
            <div className="nav-user-logo nav-list-item">
              <Link className="nav-list-item-link" to="/login">
              <i className="fa-solid fa-user-plus"></i>
              </Link>
            </div>
          )}
          <div className="nav-toggle-button">
            <button id="toggle-sidebar">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
      </header>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-account-info-name">
          <h3>welcome</h3>
          <h1>{isLoggedIn() ? localStorage.getItem("name") : "User"}</h1>
          {/* <hr> */}
        </div>
        <ul className="sidebar-list">
          <li className="nav-list-item">
            <Link className="sidebar-list-item-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link className="sidebar-list-item-link" to="/compose">
              Write
            </Link>
          </li>
          {isLoggedIn() ? (
            <li className="nav-list-item">
              <Link className="sidebar-list-item-link" to="/mails">
                Mails
              </Link>
            </li>
          ) : (
            <li className="nav-list-item">
              <Link className="sidebar-list-item-link" to="/login">
                Login
              </Link>
            </li>
          )}
          <li className="nav-list-item">
            <Link className="sidebar-list-item-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        {isLoggedIn() && (
          <button className="sidebar-logout-button nav-list-item simple-modal-open-button">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            Logout
          </button>
        )}
      </div>
    </>
  );
}

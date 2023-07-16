import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "./Alert";

const Navbar = () => {
  useEffect(() => {
    document.addEventListener("click", function (event) {
      // if the clicked element isn't child of the navbar, you must close it if it is open
      if (
        !event.target.closest("#navbar") &&
        document
          .getElementById("navbarSupportedContent")
          .classList.contains("show")
      ) {
        document.getElementById("navbar-toggle-button").click();
      }
    });
  });
  let location = useLocation();
  const navigate = useNavigate();
  const confirmationRef = useRef(null);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("picture");
    navigate("/");
    toast.success("Logged Out Successfully", { theme: "colored" });
  };
  const handleLogout = () => {
    confirmationRef.current.click();
  };
  return (
    <>
      <Alert />
      <nav
        className={`navbar navbar-expand-lg navbar-${"dark"} bg-${"dark"}`}
        style={{position: "sticky", top: 0, zIndex:1 }}
        id="navbar">
        <div className="container-fluid">
          <Link
            className="navbar-brand "
            to="/"
            style={{ fontSize: "30px"}}>
            PrimeMailer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="navbar-toggle-button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/mails" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/mails">
                  Mails
                </Link>
              </li> */}
              <li
                className={`"nav-item" ${
                  localStorage.getItem("authToken") ? "d-none" : ""
                }`}>
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/login">
                  Login
                </Link>
              </li>
              <li
                className={`"nav-item" ${
                  localStorage.getItem("authToken") ? "d-none" : ""
                }`}>
                <Link
                  className={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown" >
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  {`${
                    localStorage.getItem("name")
                      ? localStorage.getItem("name")[0].toUpperCase() +
                        localStorage.getItem("name").slice(1)
                      : "Welcome"
                  }`}
                  <img
                    src={localStorage.picture}
                    alt=""
                    style={{ width: "30px", borderRadius: "15px" }}
                    className={`${
                      !localStorage.getItem("authToken") ? "d-none" : ""
                    }`}
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    {localStorage.getItem("name") ? (
                      <Link
                        className="dropdown-item"
                        onClick={handleLogout}
                        to="/">
                        Logout
                      </Link>
                    ) : (
                      <>
                        <Link
                          className="dropdown-item"
                          onClick={() => {
                            navigate("/login");
                          }}
                          to="/login">
                          Login
                        </Link>
                        <Link
                          className="dropdown-item"
                          onClick={() => {
                            navigate("/signup");
                          }}
                          to="/signup">
                          Signup
                        </Link>
                      </>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}

      <button
        ref={confirmationRef}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1">
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel1"
                style={{ fontSize: "25px", color: "red" }}>
                Are You Sure?
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning mx-3"
                onClick={handleLogoutConfirm}
                data-bs-dismiss="modal">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

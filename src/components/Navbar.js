import React, { useContext } from "react";
import { themecontext } from "../contexts/themeState";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "./Alert";

const Navbar = () => {
  const host = "http://127.0.0.1:3000";
  const { theme, setTheme } = useContext(themecontext);
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    localStorage.removeItem('picture');
    navigate("/");
    toast.success("Logged Out Successfully", { theme: "colored" });
  }
  return (
    <>
    <Alert/>
      <nav className={`navbar navbar-expand-lg navbar-${"dark"} bg-${"dark"}`}>
        <div className="container-fluid">
          <Link className="navbar-brand " to="/" style={{ fontSize: "30px" }}>
            <img
              src="/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            PrimeMailer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/mails" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/mails">
                  Mails
                </Link>
              </li>
              <li className={`"nav-item" ${localStorage.getItem('authToken') ? "d-none": ""}`} >
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/login"

                  >
                  Login
                </Link>
              </li>
              <li className={`"nav-item" ${localStorage.getItem('authToken') ? "d-none": ""}`}>
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
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  {`Welcome ${localStorage.getItem('name')?localStorage.getItem('name')[0].toUpperCase()+localStorage.getItem('name').slice(1):""}`}
                  <img src={localStorage.picture} alt="" style={{width: "30px", borderRadius:"15px"}} className={`${!localStorage.getItem('authToken') ? "d-none": ""}`}/>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li >
                    {localStorage.getItem('name')?(<Link className="dropdown-item" onClick={handleLogout} to='/'>
                      Logout
                    </Link>):
                    (<Link className="dropdown-item" onClick={()=>{navigate("/login")}} to='/login'>
                      Login
                    </Link>)}
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

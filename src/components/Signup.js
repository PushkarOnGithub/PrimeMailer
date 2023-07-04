import React, { useState } from "react";
import SignInWithGoogle from "./SignInWithGoogle";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host = "http://127.0.0.1:5000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    // console.log(credentials);
  };
  const handleSignupByCredentials = async (event) => {
    event.preventDefault();
    let response = await fetch(`${host}/api/auth/signup/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    response = await response.json();
    if (response.success) {
      localStorage.setItem("authToken", response.authToken);
      localStorage.setItem("name", response.name);
      localStorage.setItem("picture", response.picture);
      console.log("Signup");
      console.log(response.authToken);
      navigate("/");
      // showAlert("Signed Up SuccessFully", "success");
    } else {
      // showAlert("Invalid Details", "danger");
    }
  };
  return (
    <>
      <h1
        style={{ textAlign: "center", margin: "4% 0 -2% 0", fontSize: "40px" }}>
        Signup into PrimeMailer
      </h1>
      <div
        className="container"
        style={{
          textAlign: "center",
          width: "35%",
          padding: "5%",
          maxWidth: "40%",
          minWidth: "200px",
        }}>
        <form
          style={{ textAlign: "left" }}
          onSubmit={handleSignupByCredentials}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ margin: "7px 0 0 0" }}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={handleOnChange}
              aria-describedby="emailHelp"
              placeholder="Your Name"
              style={{ textIndent: "3%", minWidth: "200px" }}
            />
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ margin: "7px 0 0 0" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleOnChange}
              aria-describedby="emailHelp"
              placeholder="Your Email"
              style={{ textIndent: "3%", minWidth: "200px" }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              style={{ margin: "-2px 0 0 0" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
              placeholder="Your Password"
              style={{ textIndent: "3%", minWidth: "200px" }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <SignInWithGoogle location="Signup" />
    </>
  );
};

export default Signup;

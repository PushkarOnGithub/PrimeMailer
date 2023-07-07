import React, { useState } from "react";
import SignInWithGoogle from "./SignInWithGoogle";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "./Alert";
import qs from 'querystring';

const host = "http://127.0.0.1:5000";

const handleRedirectGoogle= async(payload, navigate) => {
  let response = await fetch(`${host}/api/auth/login/withgoogle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"success": payload.success, "authToken": payload.authToken, "name": payload.name, "picture": payload.picture}),
  });
  response = await response.json();
  // console.log("response : " ,response)
  if (response.success) {
    localStorage.setItem("authToken", response.authToken);
    localStorage.setItem("name", response.name);
    localStorage.setItem("picture", response.picture);
    console.log("Login");
    console.log(response.authToken);
    navigate("/");
    toast.success("Logged In Successfully", { theme: "colored" })
    await new Promise((r) => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
  }
  else{
    toast.error("Invalid Credentials");
    navigate('/login');
    await new Promise((r) => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
  }
  }


const Login = () => {
  let location = useLocation();
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  if(location.search){
    console.log("url", JSON.parse((qs.parse(location.search.slice(1))).payload))
    const payload = JSON.parse((qs.parse(location.search.slice(1))).payload);
  handleRedirectGoogle(payload, navigate);}

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    // console.log(credentials);
  };
  const handleLogInByCredentials = async (event) => {
    event.preventDefault();
    let response = await toast.promise(fetch(`${host}/api/auth/login/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }),{
      pending:"Trying to Log in",
      success:"Logged in Successfully",
      error:"Invalid Credentials"
    });
    console.log(credentials)
    response = await response.json();
    if (response.success) {
      localStorage.setItem("authToken", response.authToken);
      localStorage.setItem("name", response.name);
      localStorage.setItem("picture", response.picture);
      console.log("Login");
      console.log(response.authToken);
      // await new Promise(r => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
      navigate("/");
    }
  };

  return (
    <>
      <h1
        style={{ textAlign: "center", margin: "4% 0 -2% 0", fontSize: "40px" }}>
        Login into PrimeMailer
      </h1>
      <Alert/>
      <div
        className="container"
        style={{
          textAlign: "center",
          width: "35%",
          padding: "5%",
          maxWidth: "40%",
          minWidth: "200px",
        }}>
        <form style={{ textAlign: "left" }} onSubmit={handleLogInByCredentials}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
      <SignInWithGoogle location="Login" />
    </>
  );
};

export default Login;

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
    let response = await fetch(`${host}/api/auth/login/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    console.log(credentials)
    response = await toast.promise(response.json(),{pending:"Trying to log in"})
    if (response.success) {
      localStorage.setItem("authToken", response.authToken);
      localStorage.setItem("name", response.name);
      localStorage.setItem("picture", response.picture);
      console.log("Login");
      console.log(response.authToken);
      toast.success("Logged in Successfully", {theme: "colored"})
      await new Promise(r => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
      navigate("/");
    }
    else{
      if(response.error === "User not registered"){
        toast.error("You have to Signup First")
        await new Promise(r => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
        navigate("/signup")
      }else{
        toast.error("Invalid Credentials", {theme:"colored"})
    }}
  };

  return (
    <>
      <h1
        style={{ textAlign: "center", margin: "5vb 0 2vb 0", fontSize: "40px" }}>
        Login into PrimeMailer
      </h1>
      <Alert/>
      <div
        className="container"
        style={{
          textAlign: "center",
          justifyContent: 'center',
          width: "35%",
          padding: "5%",
          maxWidth: "40%",
          minWidth: "300px",
          backgroundColor: 'white',
          boxShadow:'0 6px 6px 0 rgba(0, 0, 255, 0.05), 0 6px 6px 0 rgba(0, 0, 255, 0.05)',
          marginBottom:"20px"
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
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
      <SignInWithGoogle location="Login" />
    </>
  );
};

export default Login;
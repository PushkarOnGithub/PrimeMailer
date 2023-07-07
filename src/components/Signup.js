import React, { useState } from "react";
import SignInWithGoogle from "./SignInWithGoogle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "./Alert";

const Signup = () => {
  const host = "http://127.0.0.1:5000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: ""
  });
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const [showOTP, setShowOTP] = useState(false);

  const handleSendOTP = async (event) => {
    event.preventDefault();
    console.log(credentials);
    let OTPresponse = await fetch(`${host}/api/auth/signup/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    OTPresponse = await OTPresponse.json();
    // if otp is not sent or wrong OTP
    if (!OTPresponse.success) {
      toast.error("Invalid OTP", { theme: "colored" });
      return
    }
    // if OTP is correct
    localStorage.setItem("authToken", OTPresponse.authToken);
    localStorage.setItem("name", OTPresponse.name);
    localStorage.setItem("picture", OTPresponse.picture);
    console.log("Signup");
    console.log(OTPresponse.authToken);
    toast("Signed Up SuccessFully", { theme: "colored" });
    await new Promise(r => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
    navigate("/");
  };
  const handleSignupByCredentials = async (event) => {
    event.preventDefault();
    let response = await toast.promise(fetch(`${host}/api/auth/signup/credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }), {
      success: "OTP Sent",
      pending: "Sending OTP",
      error: "OTP not sent"
    });
    response = await response.json();
    // if everything is correctly filled and user dont exist show OTP form
    if (!response.success) {
      if (response.error === "Email already Registered") {
        toast.warn("You are already registered !!", { theme: "colored" });

        await new Promise((r) => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
        navigate("/login");
        return;
      } else {
        toast.error("Invalid Credentials !!", { theme: "colored" });
        return;
      }
    }
    setShowOTP(true);
  };
  return (
    <>
      <h1
        style={{ textAlign: "center", margin: "4% 0 -2% 0", fontSize: "40px" }}>
        Signup into PrimeMailer
      </h1>
      <Alert />
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
          onSubmit={showOTP ? handleSendOTP : handleSignupByCredentials}>
          <div className="mb-3">
            <label className="form-label" style={{ margin: "7px 0 0 0" }}>
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
              minLength={3}
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
              minLength={5}
            />
            <div className={showOTP ? "" : "d-none"}>
              <label className="form-label" style={{ margin: "-2px 0 0 0" }}>
                OTP
              </label>
              <input
                type="text"
                name="OTP"
                className="form-control"
                value={credentials.OTP}
                onChange={handleOnChange}
                placeholder="Your Password"
                style={{ textIndent: "3%", minWidth: "200px" }}
                minLength={6}
              />
            </div>
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

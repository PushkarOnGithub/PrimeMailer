import React from "react";
import SignInWithGoogle from "../../pages/google/SignInWithGoogle";
import Alert from "../../alert/Alert";

const Login = () => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "5vb 0 2vb 0",
          fontSize: "40px",
        }}>
        Login into PrimeMailer
      </h1>
      <Alert />
      <SignInWithGoogle location="Login" />
    </>
  );
};

export default Login;

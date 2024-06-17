import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import loading from "../assets/loading.gif";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export default function Callback() {

  const location = useLocation();

  useEffect(() => {
    const fetchTokens = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');
      console.log(code);
      if (code) {
        try {
          let res = await fetch(`${SERVER_HOST}/auth/google/callback`, {
            method: "POST", headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({ "code": code})
          });
          res = await res.json();

          if (res.success) {
            localStorage.setItem("authToken", res.authToken);
            localStorage.setItem("name", res.name);
            localStorage.setItem("picture", res.picture);
            console.log("Login");
            console.log(res.authToken);

            // Redirect to a protected route or home page
            // navigate("/");
            window.location.href = '/';
            toast.success("Logged In Successfully", { theme: "colored" });
            await new Promise((r) => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
          }
          else {
            throw new Error("Unable to Login");
          }

        } catch (error) {
          toast.error("Invalid Credentials");
          // Redirect to a login again
          window.location.href = '/login';
          // navigate('/login');
          console.error('Error fetching tokens:', error);
          await new Promise((r) => setTimeout(r, 3000)); // sleep for 3 seconds so that the alert can be seen
        }
      }
    };

    fetchTokens();
  }, [location.search]);

  return <><img src={loading} alt="loading" style={{height: '100px' ,width: '100px', position: 'fixed', top:'45vh', left:'48vw'}}  /></>;
};


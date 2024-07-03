import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loading from '../../loading/Loading';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export default function Callback() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');
      // console.log(code);
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
            // console.log("Login");
            // console.log(res.authToken);

            // Redirect to a protected route or home page
            navigate("/");
            toast.success("Logged In Successfully", { theme: "colored" });
          }
          else {
            throw new Error("Unable to Login");
          }

        } catch (error) {
          toast.error("Invalid Credentials");
          // Redirect to a login again
          navigate('/login');
          console.error('Error fetching tokens:', error);
        }
      }
    };

    fetchTokens();
  }, [location.search, navigate]);

  return <> <Loading/> </>;
};


import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'

const Alert = () => {
  return (
    <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        limit={3}
        p
      />
  )
}

export default Alert;

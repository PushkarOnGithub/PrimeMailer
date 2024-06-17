import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'

const Alert = () => {
  return (
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
  )
}

export default Alert;

import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeState from "./contexts/themeState";
import Composer from "./components/Composer";

function App() {
  return (
    <ThemeState>
      <Router>
        <Navbar />
        <Composer/>
        <Routes></Routes>
      </Router>
    </ThemeState>
  );
}

export default App;

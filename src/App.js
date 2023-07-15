import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeState from "./contexts/themeState";
import Home from "./components/Home";
import Login from './components/Login'
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <ThemeState>
      <Router>
        <Navbar/>
        <div className="content" style={{ paddingBottom: '100px', flexGrow: 1, overflowY: 'auto' }}>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route path = "*" element = {<NotFound/>}/>
          </Routes>
          </div>
          <Footer/>
      </Router>
    </ThemeState>
    </>
  );
}

export default App;

import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Composer from "./components/editor/Composer";
import Login from './components/login/Login'
import About from "./components/about/About"
import NotFound from "./components/NotFound";
import Footer from "./components/footer/Footer";
import Callback from "./components/google/Callback";
import Mails from "./components/mails/Mails";
// import Test from "../useless files/Test";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div className="content" style={{ paddingBottom: '100px', flexGrow: 1, overflowY: 'auto' }}>
        <Routes>
          <Route exact path='/' element={<Composer/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/callback' element={<Callback/>}/>
          <Route exact path='/mails' element={<Mails/>}/>
          <Route path = "*" element = {<NotFound message="You might lost your way"/>}/>
          {/* <Route exact path='/' element={<Test/>}/> */}
          </Routes>
          </div>
          <Footer/>
      </Router>
    </>
  );
}

export default App;

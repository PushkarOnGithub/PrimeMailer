import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Composer from "./components/editor/Composer";
import Login from './components/pages/login/Login'
import About from "./components/pages/about/About"
import NotFound from "./components/pages/notfound/NotFound";
import Callback from "./components/pages/google/Callback";
import Mails from "./components/pages/mails/Mails";
import Layout from "./components/Layout/Layout";
import Home from "./components/pages/home/Home";

function App() {
  return (
    <>
      <Router>
        <Layout>
        <div className="content">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/compose' element={<Composer/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/callback' element={<Callback/>}/>
          <Route exact path='/mails' element={<Mails/>}/>
          <Route path = "*" element = {<NotFound message="You might lost your way"/>}/>
          </Routes>
          </div>
          </Layout>
      </Router>
    </>
  );
}

export default App;

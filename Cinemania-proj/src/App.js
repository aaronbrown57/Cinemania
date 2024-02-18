import { useState,useEffect,useContext } from 'react';
// import {BrowserRouter as Router, Route,Routes}from react-router-dom;
import { BrowserRouter as Router, Route, Link, Routes, UNSAFE_useScrollRestoration } from 'react-router-dom';

import './App.css';

import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import axios from 'axios';





  const App = () => {
    const [userData, setUserData] = useState({
      token: undefined,
    user: undefined,
    });
  



   //I used the current routes
   return (
    // <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
    
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/authView" element={<AuthenticatedView />} />  */}
          
        </Routes>
    
      </Router>
    // </UserContext.Provider>
   )

  }
 
export default App;

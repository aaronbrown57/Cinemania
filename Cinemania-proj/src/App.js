import { useState,useEffect,useContext } from 'react';
// import {BrowserRouter as Router, Route,Routes}from react-router-dom;
import { BrowserRouter as Router, Route, Link, Routes, UNSAFE_useScrollRestoration } from 'react-router-dom';

import './App.css';

import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AuthView from './Components/AuthView/AuthView';
import axios from 'axios';
import AdminView from './Components/Admin/AdminView';





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
          <Route path='/AuthView' element={<AuthView/>}/>
          <Route path='/admin' element={<AdminView/>}/>
          {/* <Route path="/authView" element={<AuthenticatedView />} />  */}
          
        </Routes>
    
      </Router>
    // </UserContext.Provider>
   )

  }
 
export default App;

//mongodb+srv://aaronbrown:vaVAeEdShNSD1UKf@4050.zybm3er.mongodb.net/


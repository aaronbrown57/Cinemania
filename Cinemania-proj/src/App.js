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
import ConfirmAccountCreation from './Components/ConfirmAccountCreation';
// Importing new components
import SelectShowtime from './Components/SelectShowtime';
import SelectSeats from './Components/SelectSeats';
import OrderSummary from './Components/OrderSummary';
import CheckoutForm from './Components/CheckoutForm';
import OrderConfirmation from './Components/OrderConfirmation';
import SelectTicketAge from './Components/SelectTicketAge';
import ManagePromos from "./Components/ManagePromos"
import ManageMovies from "./Components/ManageMovies.js"


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
         <Route path="/ConfirmAccountCreation" element={<ConfirmAccountCreation/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/AuthView/:userId" element={<AuthView/>} />
          <Route path='/admin' element={<AdminView/>}/>
          <Route path='/logout' element={<Home />} />
          {/* Adding new routes for the movie ticket booking process */}
          <Route path='/select-showtime' element={<SelectShowtime />} />
          <Route path='/select-seats' element={<SelectSeats />} />
          <Route path="/select-ticket-age" element={<SelectTicketAge />} />
          <Route path='/order-summary' element={<OrderSummary />} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />
          {/* Routes for Admin processes */}
          <Route path='/manage-movies' element={<ManageMovies />} />
          <Route path='/manage-promos' element={<ManagePromos />} />
        </Routes>
    
      </Router>
    // </UserContext.Provider>
   )

  }
 
export default App;


import { useState, useEffect, useContext } from 'react';
// import {BrowserRouter as Router, Route,Routes}from react-router-dom;
import { BrowserRouter as Router, Route, Link, Routes, UNSAFE_useScrollRestoration } from 'react-router-dom';

import './App.css';

import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
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
import { UserContext } from './context/UserContext.js';
import Edit from "./Components/Edit.js";


const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    });
  
   // UseEffect to check if the user is already logged in
   useEffect(() => {
    const checkLoggedIn = async () => {

      // Retrieve token from local storage
      let token = localStorage.getItem("auth-token");

       // If token is null, set it to an empty string
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

       // Validate the token on the server
      const tokenResponse = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

       // If the token is valid/true, fetch user data
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users", {
          headers: { "x-auth-token": token },
        });

        // Set user data in the state
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

      // Call the checkLoggedIn function when the component mounts
    checkLoggedIn();
   }, []);



   //I used the current routes
   return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
    
        <Routes>
         <Route path="/ConfirmAccountCreation" element={<ConfirmAccountCreation/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/AuthView/:userId" element={<AuthView/>} />
          <Route path='/admin' element={<AdminView/>}/>
          <Route path='/logout' element={<Home />} />
          <Route path='/edit' element={<Edit />}/>
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


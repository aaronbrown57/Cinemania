import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavMenu from "../Navigation/NavMenu";

const AdminView = () => {
  const location = useLocation();
  const isAdmin = location.state && location.state.isAdmin;
  const navigate = useNavigate();

  if (isAdmin) {
    return (
      <div className="App">
         <h1 className='web-name' >Cinemania </h1>
        <NavMenu loggedIn={true} admin={true}></NavMenu>
        <h1>Welcome to Admin!</h1>
      </div>
    );
  } else {
    navigate('/');
    return null;
  }
};

export default AdminView;


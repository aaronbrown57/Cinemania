import React from "react";
import NavMenu from "../Navigation/NavMenu";
const AdminView = () => {
    return(
        <div className="App">
        <NavMenu loggedIn={true} admin={true}></NavMenu>
        <h1>Welcome to Admin!</h1>
    </div>
    )
}
export default AdminView;
import React from "react";
import NavMenu from "../Navigation/NavMenu";
const AdminView = () => {
    return(
        <div className="App">
        <NavMenu loggedIn={true} admin={true}></NavMenu>
        <h1>This is the Admin View</h1>
    </div>
    )
}
export default AdminView;
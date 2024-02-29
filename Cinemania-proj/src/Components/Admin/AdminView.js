import React from "react";
import NavMenu from "../Navigation/NavMenu";
import MovieDisplay from "../MovieDisplays/MovieDisplay";
const AdminView = () => {
    return(
        <div className="App">
        <NavMenu loggedIn={true} admin={true}></NavMenu>
        <h1>Welcome Admin_User!</h1>
        <MovieDisplay isAdmin={true}/>
    </div>
    )
}
export default AdminView;
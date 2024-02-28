import NavMenu from '../Navigation/NavMenu';
const AuthView = (loggedIn) => {

       
  return (
    <div className="App">
        <NavMenu loggedIn={true} admin={false}></NavMenu>
        <h1>Welcome back Username!</h1>
    </div>
  );
    
}
export default AuthView;
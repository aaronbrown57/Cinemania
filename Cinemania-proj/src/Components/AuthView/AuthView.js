import NavMenu from '../Navigation/NavMenu';
const AuthView = (loggedIn) => {

       
  return (
    <div className="App">
        <NavMenu loggedIn={true}></NavMenu>
    </div>
  );
    
}
export default AuthView;
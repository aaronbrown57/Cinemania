import NavMenu from '../Navigation/NavMenu';
import MovieDisplay from '../MovieDisplays/MovieDisplay';
const AuthView = (loggedIn) => {

       
  return (
    <div className="App">
        <NavMenu loggedIn={true} admin={false}></NavMenu>
        <h1>Welcome back Username!</h1>
        <MovieDisplay></MovieDisplay>
    </div>
  );
    
}
export default AuthView;
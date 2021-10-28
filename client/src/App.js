import React, {useState, useEffect} from 'react';
import Body from './components/layout/body/Body'
import Home from './components/pages/home/Home'
import Category from './components/pages/category/Category'
import SignUp from './components/pages/SignUp/SignUp';
import Login from './components/pages/Login/Login';
import Profile from './components/pages/profile/Profile';
import {auth, signOutFunc} from './firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import {Redirect} from 'react-router-dom';




import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState('');
 
  useEffect(()=>{
    onAuthStateChanged(auth, user=>{
       setUser(user);
       console.log(user);
    })
  },[])


  return (
      <Router>
        <UserContext.Provider value={[user, setUser]} >
          <Body loggedIn={user? true:false}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/EjKBA/signUp" component={SignUp}/>
            <Route exact path="/EjKBA/logIn" component={Login}/>
            <Route exact path="/EjKBA/profile" component={Profile}/>
            <Route exact path="/EjKBA/logOut" render={()=>{
              signOutFunc();
              return(
                <div>
                <Redirect to='/?message=logout_Successfully'/>
                </div>
              )
            }}/>
            <Route exact path="/EjKBA/category" component={Category} />
          </Switch>
          </Body>
        </UserContext.Provider>
      </Router>
  );
}

export default App;

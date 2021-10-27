import React, {useState, useEffect} from 'react';
import Body from './components/layout/body/Body'
import Home from './components/pages/home/Home'
import Category from './components/pages/category/Category'
import SignUp from './components/pages/SignUp/SignUp';
import Login from './components/pages/Login/Login';
import {auth} from './firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState('');
 
  useEffect(()=>{
    let unsubscribe = onAuthStateChanged(auth, user=>{
       setUser(user);
    })
    return unsubscribe;
  },[])


  return (
      <Router>
        <UserContext.Provider value={[user, setUser]} >
          <Body loggedIn={false}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/EjKBA/signUp" component={SignUp}/>
            <Route exact path="/EjKBA/login" component={Login}/>
            <Route exact path="/EjKBA/category" component={Category} />
          </Switch>
          </Body>
        </UserContext.Provider>
      </Router>
  );
}

export default App;

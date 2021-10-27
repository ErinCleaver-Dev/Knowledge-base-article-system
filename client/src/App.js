import React, {useState} from 'react';
import Body from './components/layout/body/Body'
import { styled } from '@mui/material/styles';
import Home from './components/pages/home/Home'
import Category from './components/pages/catagory/Category'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState([]);
 

  return (
      <Router>
        <UserContext.Provider value={[user, setUser]} >
          <Body loggedIn={true}>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category" component={Category} />
          </Switch>
          </Body>
        </UserContext.Provider>
      </Router>
  );
}

export default App;

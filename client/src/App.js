import React, {useState, useEffect} from 'react';
import Body from './components/layout/body/Body'
import Home from './components/pages/home/Home'
import Category from './components/pages/category/Category'
import Search from './components/pages/search/Search'
import SignUp from './components/pages/userprofile/signUp/SignUp';
import Login from './components/pages/userprofile/login/Login';
import Profile from './components/pages/userprofile/profile/Profile';
import CreateArticle from './components/pages/articles/CreateArticle';
import EditArticle from './components/pages/articles/EditArticle';
import FeedbackAndSupp from './components/pages/userHistory/FeedbackAndSupp';
import UserArticles from './components/pages/articles/UserArticles';
import SavedArticles from './components/pages/userHistory/SavedArticles';
import ViewedArticles from './components/pages/userHistory/ViewedArticles';
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
       //console.log(user);
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
            <Route exact path="/EjKBA/create_article" component={CreateArticle}/>
            <Route exact path="/EjKBA/edit_article/:user_id/:article_id" component={EditArticle}/>
            <Route exact path="/EjKBA/user_articles" component={UserArticles}/>
            <Route exact path="/EjKBA/saved_articles" component={SavedArticles}/>
            <Route exact path="/EjKBA/view_history" component={ViewedArticles}/>
            <Route exact path="/EjKBA/search" component={Search}/>
            <Route exact path="/EjKBA/feedback_support" component={FeedbackAndSupp}/>
          </Switch>
          </Body>
        </UserContext.Provider>
      </Router>
  );
}

export default App;

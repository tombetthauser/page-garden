import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authenticate } from './store/session';

import ProtectedRoute from './components/auth/ProtectedRoute';
import SignUpForm from './components/auth/SignUpForm';
import LoginForm from './components/auth/LoginForm';
import PageCreate from './components/PageCreate';
import PostCreate from './components/PostCreate';
import UsersList from './components/UsersList';
import PagesList from './components/PagesList';
import NavBar from './components/NavBar';
import User from './components/User';
import Page from './components/Page';
import Post from './components/Post';
import PageEdit from './components/PageEdit';
import PostEdit from './components/PostEdit';
import Home from './components/Home';
// import PostsList from './components/PostsList';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <h1>Minstagram 🏄‍♂️</h1> */}
      {/* 
        Other Fantastic Name:
          Shoestagram Kickstagram Footstagram Spacetagram Altstagram Fosstagram 
          Nonstagram Whatstagram Notstagram Unstagram Dogstagram Grimstagram 
          Spinstagram Winstagram Betagram Deltagram Minstagram Xstagram Breadstagram 
          Catstagram Duckstagram Kushtagram
      */}
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}><LoginForm/></Route>
        <Route path='/sign-up' exact={true}><SignUpForm/></Route>
        <Route path='/pages' exact={true}><PagesList/></Route>
        <Route path='/pages/new' exact={true}><PageCreate/></Route>
        <Route path='/pages/:pageId' exact={true}><Page/></Route>
        <Route path='/pages/:pageId/edit' exact={true}><PageEdit/></Route>
        <Route path='/pages/:pageId/posts/new' exact={true}><PostCreate/></Route>
        <Route path='/pages/:pageId/posts/:postId' exact={true}><Post/></Route>
        <Route path='/pages/:pageId/posts/:postId/edit' exact={true}><PostEdit/></Route>
        <ProtectedRoute path='/users' exact={true} ><UsersList/></ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} ><User /></ProtectedRoute>
        <Route path='/home' exact={true}><Home /></Route>
        <Route path='/404' exact={true}>
          <>
            <h2>404 🦆</h2>
            <p>The page or post you seek does not exist...</p>
          </>
        </Route>
        <Route path='/:pageUrl' exact={true}><Page /></Route>
        <Route path='/:pageUrl/new' exact={true}><PostCreate /></Route>
        <Route path='/:pageUrl/:postId' exact={true}><Post /></Route>
        <Route path='/:pageUrl/:postId/edit' exact={true}><PostEdit /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

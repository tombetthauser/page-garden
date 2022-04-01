import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authenticate } from './store/session';

import ProtectedRoute from './components/auth/ProtectedRoute';
import SignUpForm from './components/auth/SignUpForm';
import LoginForm from './components/auth/LoginForm';
import PageCreate from './components/PageCreate';
// import PostCreate from './components/PostCreate';
import UsersList from './components/UsersList';
import PagesList from './components/PagesList';
import User from './components/User';
import Page from './components/Page';
import Post from './components/Post';
import PageEdit from './components/PageEdit';
import PostEdit from './components/PostEdit';
import Splash from './components/Splash';
import Home from './components/Home';
import UserEdit from './components/UserEdit';
import PostsList from './components/PostsList';
// import NewPostCreate from './components/NewPostCreate';
import PostCreateAWS from './components/PostCreateAWS';
import PageRedirect from './components/PageRedirect';

// import UploadPicture from './components/UploadPicture';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <Switch>
        {/* <Route path='/test' exact={true}><NewPostCreate/></Route> */}
        {/* <Route path='/test' exact={true}><UploadPicture/></Route> */}
        <Route path='/login' exact={true}><LoginForm/></Route>
        <Route path='/sign-up' exact={true}><SignUpForm/></Route>
        <Route path='/pages' exact={true}><PagesList/></Route>
        <Route path='/posts' exact={true}><PostsList/></Route>
        <ProtectedRoute path='/pages/new' exact={true}><PageCreate/></ProtectedRoute>
        <Route path='/pages/:pageId' exact={true}><PageRedirect/></Route>
        <Route path='/pages/:pageId/edit' exact={true}><PageEdit/></Route>
        {/* <Route path='/pages/:pageId/posts/new' exact={true}><PostCreate/></Route> */}
        <Route path='/pages/:pageId/posts/:postId' exact={true}><Post/></Route>
        <Route path='/pages/:pageId/posts/:postId/edit' exact={true}><PostEdit/></Route>
        <Route path='/users' exact={true} ><UsersList/></Route>
        <Route path='/users/:userId' exact={true} ><User /></Route>
        <Route path='/users/:userId/edit' exact={true} ><UserEdit /></Route>
        {/* <Route path='/home' exact={true}><Home /></Route> */}
        <Route path='/404' exact={true}>
          <>
            <h2>404 🦆</h2>
            <p>The page or post you seek does not exist...</p>
          </>
        </Route>
        <Route path='/home' exact={true}><Home /></Route>
        <Route path='/:pageUrl' exact={true}><Page /></Route>
        <ProtectedRoute path='/:pageUrl/new' exact={true}><PostCreateAWS /></ProtectedRoute>
        {/* <ProtectedRoute path='/:pageUrl/newaws' exact={true}><PostCreateAWS /></ProtectedRoute> */}
        <Route path='/:pageUrl/:postId' exact={true}><Post /></Route>
        <ProtectedRoute path='/:pageUrl/:postId/edit' exact={true}><PostEdit /></ProtectedRoute>
        <Route path='/' exact={true}><Splash /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

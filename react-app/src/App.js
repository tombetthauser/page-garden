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
      <Switch>
        <Route path='/' exact={true}><Splash /></Route>
        <Route path='/home' exact={true}><Home /></Route>
        <Route path='/login' exact={true}><LoginForm/></Route>
        <Route path='/sign-up' exact={true}><SignUpForm/></Route>
        <ProtectedRoute path='/users/edit' exact={true} ><UserEdit /></ProtectedRoute>

        <ProtectedRoute path='/dev/pages' exact={true}><PagesList /></ProtectedRoute>
        <ProtectedRoute path='/dev/posts' exact={true}><PostsList /></ProtectedRoute>
        <ProtectedRoute path='/dev/pages/:pageId/posts/:postId' exact={true}><Post/></ProtectedRoute>
        <ProtectedRoute path='/dev/users' exact={true} ><UsersList/></ProtectedRoute>
        <ProtectedRoute path='/dev/users/:userId' exact={true} ><User /></ProtectedRoute>
        <ProtectedRoute path='/dev/:pageUrl/:postId' exact={true}><Post /></ProtectedRoute>

        <ProtectedRoute path='/pages/new' exact={true}><PageCreate/></ProtectedRoute>
        <Route path='/pages/:pageId' exact={true}><PageRedirect/></Route>
        <Route path='/pages/:pageId/edit' exact={true}><PageEdit/></Route>

        <ProtectedRoute path='/:pageUrl/new' exact={true}><PostCreateAWS /></ProtectedRoute>
        <ProtectedRoute path='/:pageUrl/:postId/edit' exact={true}><PostEdit /></ProtectedRoute>
        
        <Route path='/:pageUrl' exact={true}><Page /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

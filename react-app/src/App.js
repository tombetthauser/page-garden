import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';

import UsersList from './components/UsersList';
import User from './components/User';
import PagesList from './components/PagesList';
import Page from './components/Page';
import PageCreate from './components/PageCreate';
import PostsList from './components/PostsList';
import Post from './components/Post';
import PostCreate from './components/PostCreate';
import PageEdit from './components/PageEdit';
import PostEdit from './components/PostEdit';

import { authenticate } from './store/session';

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
      <h1>📸 Minstagram Beta</h1>
      <NavBar />
      <hr/>
      <Switch>
        <Route path='/login' exact={true}><LoginForm/></Route>
        <Route path='/sign-up' exact={true}><SignUpForm/></Route>
        <Route path='/pages' exact={true}><PagesList/></Route>
        <Route path='/pages/new' exact={true}><PageCreate/></Route>
        <Route path='/pages/:pageId' exact={true}><Page/></Route>
        <Route path='/pages/:pageId/edit' exact={true}><PageEdit/></Route>
        <Route path='/posts' exact={true}><PostsList/></Route>
        <Route path='/posts/new' exact={true}><PostCreate/></Route>
        <Route path='/posts/:postId' exact={true}><Post/></Route>
        <Route path='/posts/:postId/edit' exact={true}><PostEdit/></Route>
        <ProtectedRoute path='/users' exact={true} ><UsersList/></ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} ><User /></ProtectedRoute>
        <ProtectedRoute path='/' exact={true} ><h3>Welcome back!</h3></ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

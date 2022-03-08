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
      <h1>Minstagram 🏄‍♂️</h1>
      {/* <h1>Shoestagram 👟</h1> */}
      {/* <h1>Kickstagram 👟</h1> */}
      {/* <h1>Footstagram 👟</h1> */}
      {/* <h1>Spacetagram</h1> */}
      {/* <h1>Altstagram</h1> */}
      {/* <h1>Fosstagram</h1> */}
      {/* <h1>Nonstagram</h1> */}
      {/* <h1>Whatstagram</h1> */}
      {/* <h1>Notstagram</h1> */}
      {/* <h1>Unstagram</h1> */}
      {/* <h1>Dogstagram</h1> */}
      {/* <h1>Grimstagram</h1> */}
      {/* <h1>Spinstagram</h1> */}
      {/* <h1>Winstagram</h1> */}
      {/* <h1>Betagram</h1> */}
      {/* <h1>Deltagram</h1> */}
      {/* <h1>Minstagram</h1> */}
      {/* <h1>Xstagram</h1> */}
      {/* <h1>🥪 Breadstagram</h1> */}
      {/* <h1>Catstagram</h1> */}
      {/* <h1>Duckstagram</h1> */}
      {/* <h1>Kushtagram</h1> */}
      <NavBar />
      <hr/>
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
        <Route path='/home' exact={true}>
          <p>
            Welcome to Minstagram.<br/>
            No likes, no follows, no snitches.<br/>
            Good luck finding anything!
          </p>
        </Route>
        <Route path='/:pageUrl' exact={true}><Page /></Route>
        <Route path='/:pageUrl/:postId' exact={true}><Post /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

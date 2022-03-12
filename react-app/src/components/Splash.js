import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const Splash = () => {
  const currUser = useSelector(state => state.session.user)

  return (
    <splash>
      <h1 class="center-text">Minstagram</h1>
      <p class="center-text">
        Welcome to Minstagram.<br />
        No likes, no follows, no snitches.<br />
        Good luck finding anything!
      </p>
      <p>
        {!currUser ? <NavLink to='/login' exact={true} activeClassName='active'>login</NavLink> : null}
        {!currUser ? <vr /> : null}
        {!currUser ? <NavLink to='/sign-up' exact={true} activeClassName='active'>sign up</NavLink> : null}
        {currUser ? <NavLink to={`/home`} exact={true} activeClassName='active'>home</NavLink> : null}
        {currUser ? <vr /> : null}
        {currUser ? <LogoutButton /> : null}
      </p>
      {/* <p class="instagram-link">
        miss the bs? head back to<a href="http://instagram.com">Instagram</a>
      </p> */}
    </splash>
  )
}

export default Splash;
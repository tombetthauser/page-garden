
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const currUser = useSelector(state => state.session.user);

  return (
    <nav>
      { currUser ? <h3>Welcome back {currUser.username}!</h3> : null }
      <ul>
        { currUser ? <li><NavLink to='/home' exact={true} activeClassName='active'>Home</NavLink></li> : null }
        { !currUser ? <li><NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink></li> : null }
        { !currUser ? <li><NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink></li> : null }
        <li><NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink></li>
        <li><NavLink to='/pages' exact={true} activeClassName='active'>Pages</NavLink></li>
        {/* <li><NavLink to='/posts' exact={true} activeClassName='active'>Posts</NavLink></li> */}
        { currUser ? <li><NavLink to='/pages/new' exact={true} activeClassName='acti{ve'>New Page</NavLink></li> : null}
        {/* { currUser ? <li><NavLink to='/posts/new' exact={true} activeClassName='acti{ve'>New Post</NavLink></li> : null} */}
        { currUser ? <li><LogoutButton /></li> : null }
      </ul>
    </nav>
  );
}

export default NavBar;

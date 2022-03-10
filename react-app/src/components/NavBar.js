import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const currUser = useSelector(state => state.session.user);

  return (
    <navbar>
      {currUser ? <NavLink to="/" exact={true} activeClassName='active'>{currUser.username}</NavLink> : null }
      { !currUser ? <NavLink to='/login' exact={true} activeClassName='active'>login</NavLink> : null }
      { !currUser ? <NavLink to='/sign-up' exact={true} activeClassName='active'>sign up</NavLink> : null }
      <NavLink to='/users' exact={true} activeClassName='active'>users</NavLink>
      <NavLink to='/pages' exact={true} activeClassName='active'>pages</NavLink>
      { currUser ? <NavLink to='/pages/new' exact={true} activeClassName='acti{ve'>new page</NavLink> : null}
      { currUser ? <LogoutButton /> : null }
    </navbar>
  );
}

export default NavBar;

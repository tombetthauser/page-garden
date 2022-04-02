import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  if (user) return <Redirect to={`/home`} />;

  return (
    <div class="styled-form">
      <h1>Signup</h1>
      <form onSubmit={onSignUp}>
        <div>{errors.map((error, ind) => (<div key={ind}>{error}</div>))}</div>
        <div><label>User Name</label><input type='text' name='username' onChange={updateUsername} value={username}></input></div>
        <div><label>Email</label><input type='text' name='email' onChange={updateEmail} value={email}></input></div>
        <breakline></breakline>
        <div><label>Password</label><input type='pas sword'name='password'onChange={updatePassword}value={password}></input></div>
        <div><label>Repeat Password</label> <input type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} required={true} ></input> </div>
        <button class="blue-button" type='submit'>Sign Up</button>
      </form>
      <NavLink to="/">back</NavLink><vr/><NavLink to="/login">login</NavLink>
    </div>
  );
};

export default SignUpForm;

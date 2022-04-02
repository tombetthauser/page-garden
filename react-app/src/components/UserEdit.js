import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { login } from '../store/session';

const UserEdit = () => {
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordHash, setPasswordHash] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async () => {
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.hashed_password);
    })();
  }, [user]);

  const createUser = ( userId, username, email, password ) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        username: username,
        email: email,
        password: password
      }),
    });

    if (response.ok) {
      onLogin()
      history.push(`/home`)
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createUser(
      user.id,
      username,
      email,
      password,
    ));
    if (data) {
      setErrors(data)
    }
  };

  const updateUsername = (e) => {setUsername(e.target.value)};
  const updateEmail = (e) => {setEmail(e.target.value)};
  const updatePassword = (e) => {setPassword(e.target.value)};

  return (
    <useredit>
      <h1>User Edit</h1>

      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>


      <form onSubmit={onSubmit}>
        <div><label>Username</label><input type='text' name='username' onChange={updateUsername} value={username}></input></div>
        <div><input type='hidden' name='email' onChange={updateEmail} value={email}></input></div>
        <div><label>Confirm Password</label><input type='password' name='password' onChange={updatePassword} value={password}></input></div>

        <button type='submit'>update user</button>
      </form> 

    </useredit>
  );
};

export default UserEdit;

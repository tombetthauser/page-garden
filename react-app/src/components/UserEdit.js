import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';

const UserEdit = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
      setUsername(userData.username);
      setEmail(userData.email);
      setPasswordHash(userData.hashed_password);
    })();
  }, [userId]);

  const createUser = ( userId, username, email ) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        username: username,
        email: email
      }),
    });

    if (response.ok) {
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
      userId,
      username,
      email,
    ));
    if (data) {
      setErrors(data)
    }
  };

  const updateUsername = (e) => {setUsername(e.target.value)};
  const updateEmail = (e) => {setEmail(e.target.value)};
  // const updateUrl = (e) => {setUrl(e.target.value)};
  // const updateTitle = (e) => {setTitle(e.target.value)};
  // const updateText = (e) => {setText(e.target.value)};
  // const updateLocation = (e) => {setLocation(e.target.value)};
  // const updateLink1Text = (e) => {setLink1Text(e.target.value)};
  // const updateLink1Url = (e) => {setLink1Url(e.target.value)};
  // const updateLink2Text = (e) => {setLink2Text(e.target.value)};
  // const updateLink2Url = (e) => {setLink2Url(e.target.value)};
  // const updateLink3Text = (e) => {setLink3Text(e.target.value)};
  // const updateLink3Url = (e) => {setLink3Url(e.target.value)};
  // const updateContact = (e) => {setContact(e.target.value)};
  // ...

  return (
    <useredit>
      <h1>User Edit</h1>
      {/* { user ? <div>{user.username}</div> : null } */}
      {/* { user ? <div>{user.email}</div> : null } */}

      <form onSubmit={onSubmit}>
        <div><label>username: </label><input type='text' name='username' onChange={updateUsername} value={username}></input></div>
        <div><label>email: </label><input type='text' name='email' onChange={updateEmail} value={email}></input></div>

        <button type='submit'>submit update</button>
      </form> 


      {/* 
      <form onSubmit={onSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div><label>Url</label><input type='text' name='url' onChange={updateUrl} value={url}></input></div>
        <div><label>Title</label><input type='text' name='title' onChange={updateTitle} value={title}></input></div>
        <div><label>Text</label><input type='text' name='text' onChange={updateText} value={text}></input></div>
        <div><label>Location</label><input type='text' name='location' onChange={updateLocation} value={location}></input></div>
        <div><label>Link 1 Url</label><input type='text' name='link1Url' onChange={updateLink1Url} value={link1Url}></input></div>
        <div><label>Link 1 Text</label><input type='text' name='link1Text' onChange={updateLink1Text} value={link1Text}></input></div>
        <div><label>Link 2 Url</label><input type='text' name='link2Url' onChange={updateLink2Url} value={link2Url}></input></div>
        <div><label>Link 2 Text</label><input type='text' name='link2Text' onChange={updateLink2Text} value={link2Text}></input></div>
        <div><label>Link 3 Url</label><input type='text' name='link3Url' onChange={updateLink3Url} value={link3Url}></input></div>
        <div><label>Link 3 Text</label><input type='text' name='link3Text' onChange={updateLink3Text} value={link3Text}></input></div>
        <div><label>Contact</label><input type='text' name='contact' onChange={updateContact} value={contact}></input></div>

        <button type='submit'>Update Page!</button>
      </form> 
      */}
    </useredit>
  );
};

export default UserEdit;

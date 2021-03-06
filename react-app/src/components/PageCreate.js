import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, NavLink } from 'react-router-dom';

const PageCreate = () => {
  const [errors, setErrors] = useState([]);
  // const [userId, setUserId] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [link1Text, setLink1Text] = useState('');
  const [link1Url, setLink1Url] = useState('');
  const [link2Text, setLink2Text] = useState('');
  const [link2Url, setLink2Url] = useState('');
  const [link3Text, setLink3Text] = useState('');
  const [link3Url, setLink3Url] = useState('');
  const [contact, setContact] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const currUserId = useSelector(state => {
    return state.session.user ? state.session.user.id : null;
  })

  const createPage = ( userId, url, title, text, location, link1Text, link1Url, link2Text, link2Url, link3Text, link3Url, contact) => async (dispatch) => {
    const response = await fetch('/api/pages/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        url: url,
        title: title,
        text: text,
        location: location,
        link1Text: link1Text,
        link1Url: link1Url,
        link2Text: link2Text,
        link2Url: link2Url,
        link3Text: link3Text,
        link3Url: link3Url,
        contact: contact
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
    const data = await dispatch(createPage(
      currUserId,
      url,
      title,
      text,
      location,
      link1Text,
      link1Url,
      link2Text,
      link2Url,
      link3Text,
      link3Url,
      contact
    ));
    if (data) {
      setErrors(data)
    }
  };

  // const updateUserId = (e) => {setUserId(e.target.value)};
  const updateUrl = (e) => {setUrl(e.target.value)};
  const updateTitle = (e) => {setTitle(e.target.value)};
  const updateText = (e) => {setText(e.target.value)};
  const updateLocation = (e) => {setLocation(e.target.value)};
  const updateLink1Text = (e) => {setLink1Text(e.target.value)};
  const updateLink1Url = (e) => {setLink1Url(e.target.value)};
  const updateLink2Text = (e) => {setLink2Text(e.target.value)};
  const updateLink2Url = (e) => {setLink2Url(e.target.value)};
  const updateLink3Text = (e) => {setLink3Text(e.target.value)};
  const updateLink3Url = (e) => {setLink3Url(e.target.value)};
  const updateContact = (e) => {setContact(e.target.value)};
  // ...

  return (
    <div class="styled-form">
      <h1>New Page</h1>
      <form onSubmit={onSubmit}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        {/* <div><label>User Id</label><input type='text' name='userId' onChange={updateUserId} value={userId}></input></div> */}
        <div><label>Url</label><input type='text' name='url' onChange={updateUrl} value={url} placeholder='required'></input></div>
        <div><label>Title</label><input type='text' name='title' onChange={updateTitle} value={title} placeholder='optional'></input></div>
        {/* <div><label>Text</label><input type='text' name='text' onChange={updateText} value={text} placeholder='optional'></input></div> */}
        <div><label>Text</label><textarea class="textbox-input" type='text' name='text' onChange={updateText} value={text} placeholder="optional"></textarea></div>

        <details>
          <summary>more...</summary>
          <div><label>Location</label><input type='text' name='location' onChange={updateLocation} value={location} placeholder='optional'></input></div>
          <div><label>Link 1 Url</label><input type='text' name='link1Url' onChange={updateLink1Url} value={link1Url} placeholder='optional'></input></div>
          <div><label>Link 1 Text</label><input type='text' name='link1Text' onChange={updateLink1Text} value={link1Text} placeholder='optional'></input></div>
          <div><label>Link 2 Url</label><input type='text' name='link2Url' onChange={updateLink2Url} value={link2Url} placeholder='optional'></input></div>
          <div><label>Link 2 Text</label><input type='text' name='link2Text' onChange={updateLink2Text} value={link2Text} placeholder='optional'></input></div>
          <div><label>Link 3 Url</label><input type='text' name='link3Url' onChange={updateLink3Url} value={link3Url} placeholder='optional'></input></div>
          <div><label>Link 3 Text</label><input type='text' name='link3Text' onChange={updateLink3Text} value={link3Text} placeholder='optional'></input></div>
          <div><label>Contact</label><input type='text' name='contact' onChange={updateContact} value={contact} placeholder='optional'></input></div>
        </details>
        <button class="blue-button" type='submit'>Create Page!</button>
      </form>
      <NavLink to={`/home`}>cancel new page</NavLink>
      {/* <vr /><NavLink to="/home">home</NavLink> */}
    </div>
  );
};

export default PageCreate;

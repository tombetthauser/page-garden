import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';
// import { createPost } from '../../store/posts';

const PostCreate = () => {
  const [errors, setErrors] = useState([]);

  const [pageId, setPageId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [date, setDate] = useState('');

  const history = useHistory();
  // ...

  // const name = useSelector(state => state.session.name);
  const dispatch = useDispatch();

  const createPost = ( pageId, imageUrl, title, text, location, linkText, linkUrl, date ) => async (dispatch) => {
    // console.log([pageId, imageUrl, title, text, location, linkText, linkUrl, date], "<~~~~~~~~~~~~~~~~~")
    const response = await fetch('/api/posts/test', {
    // const response = await fetch('/api/pages/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageId: pageId,
        imageUrl: imageUrl,
        title: title,
        text: text,
        location: location,
        linkText: linkText,
        linkUrl: linkUrl,
        date: date,
      }),
      // body: JSON.stringify({
      //   userId: '1',
      //   url: pageId,
      //   title: pageId,
      //   text: 'text-TESTTT',
      //   location: 'location-TESTTT',
      //   link1Text: 'link1Text-TESTTT',
      //   link1Url: 'link1Url-TESTTT',
      //   link2Text: 'link2Text-TESTTT',
      //   link2Url: 'link2Url-TESTTT',
      //   link3Text: 'link3Text-TESTTT',
      //   link3Url: 'link3Url-TESTTT',
      //   contact: 'contact-TESTTT'
      // }),    
    });

    if (response.ok) {
      history.push("/posts")
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
    const data = await dispatch(createPost(
      pageId,
      imageUrl,
      title,
      text,
      location,
      linkText,
      linkUrl,
      date,
    ));
    if (data) {
      setErrors(data)
    }
  };

  // const updateUserId = (e) => {setUserId(e.target.value)};
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


  const updatePageId = (e) => {setPageId(e.target.value)};
  const updateImageUrl = (e) => {setImageUrl(e.target.value)};
  const updateTitle = (e) => {setTitle(e.target.value)};
  const updateText = (e) => {setText(e.target.value)};
  const updateLocation = (e) => {setLocation(e.target.value)};
  const updateLinkText = (e) => {setLinkText(e.target.value)};
  const updateLinkUrl = (e) => {setLinkUrl(e.target.value)};
  const updateDate = (e) => {setDate(e.target.value)};

  // ...

  return (
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      {/* <div><label>User Id</label><input type='text' name='userId' onChange={updateUserId} value={userId}></input></div>
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
      <div><label>Contact</label><input type='text' name='contact' onChange={updateContact} value={contact}></input></div> */}

      <div><label>PageId</label><input type='text' name='pageId' onChange={updatePageId} value={pageId}></input></div>
      <div><label>ImageUrl</label><input type='text' name='imageUrl' onChange={updateImageUrl} value={imageUrl}></input></div>
      <div><label>Title</label><input type='text' name='title' onChange={updateTitle} value={title}></input></div>
      <div><label>Text</label><input type='text' name='text' onChange={updateText} value={text}></input></div>
      <div><label>Location</label><input type='text' name='location' onChange={updateLocation} value={location}></input></div>
      <div><label>LinkText</label><input type='text' name='linkText' onChange={updateLinkText} value={linkText}></input></div>
      <div><label>LinkUrl</label><input type='text' name='linkUrl' onChange={updateLinkUrl} value={linkUrl}></input></div>
      <div><label>Date</label><input type='text' name='date' onChange={updateDate} value={date}></input></div>

      <button type='submit'>Create Post!</button>
    </form>
  );
};

export default PostCreate;

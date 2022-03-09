import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

const PostCreate = () => {
  const [errors, setErrors] = useState([]);
  const { pageUrl } = useParams();

  const [pageId, setPageId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [date, setDate] = useState('');
  
  // const [page, setPage] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  // const { pageId } = useParams()

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/pages/urls/${pageUrl}`);
      const responsePage = await response.json();
      // setPage(responsePage);
      setPageId(responsePage.id);
      }
    )();
  })

  const createPost = ( pageId, imageUrl, title, text, location, linkText, linkUrl, date ) => async (dispatch) => {
    const response = await fetch('/api/posts/new', {
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
    });

    if (response.ok) {
      history.push(`/pages/${pageId}`)
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

  // const updatePageId = (e) => {setPageId(e.target.value)};
  const updateImageUrl = (e) => {setImageUrl(e.target.value)};
  const updateTitle = (e) => {setTitle(e.target.value)};
  const updateText = (e) => {setText(e.target.value)};
  const updateLocation = (e) => {setLocation(e.target.value)};
  const updateLinkText = (e) => {setLinkText(e.target.value)};
  const updateLinkUrl = (e) => {setLinkUrl(e.target.value)};
  const updateDate = (e) => {setDate(e.target.value)};

  return (
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      {/* <div><label>PageId</label><input type='text' name='pageId' onChange={updatePageId} value={pageId}></input></div> */}
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

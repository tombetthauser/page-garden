import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

const PageEdit = () => {
  const [page, setPage] = useState({});
  const { pageId } = useParams();

  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(page.userId);
  const [url, setUrl] = useState(page.url);
  const [title, setTitle] = useState(page.title);
  const [text, setText] = useState(page.text);
  const [location, setLocation] = useState(page.location);
  const [link1Text, setLink1Text] = useState(page.link1Text);
  const [link1Url, setLink1Url] = useState(page.link1Url);
  const [link2Text, setLink2Text] = useState(page.link2Text);
  const [link2Url, setLink2Url] = useState(page.link2Url);
  const [link3Text, setLink3Text] = useState(page.link3Text);
  const [link3Url, setLink3Url] = useState(page.link3Url);
  const [contact, setContact] = useState(page.contact);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pageId) return;
    (async () => {
      const response = await fetch(`/api/pages/${pageId}`);
      const page = await response.json();
      setPage(page);

      setUserId(page.userId);
      setUrl(page.url);
      setTitle(page.title);
      setText(page.text);
      setLocation(page.location);
      setLink1Text(page.link1Text);
      setLink1Url(page.link1Url);
      setLink2Text(page.link2Text);
      setLink2Url(page.link2Url);
      setLink3Text(page.link3Text);
      setLink3Url(page.link3Url);
      setContact(page.contact);
    })();
  }, [pageId]);

  const createPage = ( userId, url, title, text, location, link1Text, link1Url, link2Text, link2Url, link3Text, link3Url, contact) => async (dispatch) => {
    const response = await fetch(`/api/pages/${page.id}`, {
      method: 'PUT',
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
    const data = await dispatch(createPage(
      userId,
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
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      {/* <div><label>User Id</label><input type='text' name='userId' onChange={updateUserId} value={userId}></input></div> */}
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
  );
};

export default PageEdit;

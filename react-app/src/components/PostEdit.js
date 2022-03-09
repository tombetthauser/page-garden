import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

const PostEdit = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const [errors, setErrors] = useState([]);
  // const [userId, setUserId] = useState(page.userId);
  // const [url, setUrl] = useState(page.url);
  // const [title, setTitle] = useState(page.title);
  // const [text, setText] = useState(page.text);
  // const [location, setLocation] = useState(page.location);
  // const [link1Text, setLink1Text] = useState(page.link1Text);
  // const [link1Url, setLink1Url] = useState(page.link1Url);
  // const [link2Text, setLink2Text] = useState(page.link2Text);
  // const [link2Url, setLink2Url] = useState(page.link2Url);
  // const [link3Text, setLink3Text] = useState(page.link3Text);
  // const [link3Url, setLink3Url] = useState(page.link3Url);
  // const [contact, setContact] = useState(page.contact);

  const [pageId, setPageId] = useState(post.pageId);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [location, setLocation] = useState(post.location);
  const [linkText, setLinkText] = useState(post.linkText);
  const [linkUrl, setLinkUrl] = useState(post.linkUrl);
  const [date, setDate] = useState(post.date);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const post = await response.json();
      setPost(post);
      // setPageId(post.pageId);

      // setUserId(page.userId);
      // setUrl(page.url);
      // setTitle(page.title);
      // setText(page.text);
      // setLocation(page.location);
      // setLink1Text(page.link1Text);
      // setLink1Url(page.link1Url);
      // setLink2Text(page.link2Text);
      // setLink2Url(page.link2Url);
      // setLink3Text(page.link3Text);
      // setLink3Url(page.link3Url);
      // setContact(page.contact);

        setPageId(post.pageId);
        setImageUrl(post.imageUrl);
        setTitle(post.title);
        setText(post.text);
        setLocation(post.location);
        setLinkText(post.linkText);
        setLinkUrl(post.linkUrl);
        setDate(post.date);
    })();
  }, [postId]);

  const createPage = ( 
      // userId, url, title, text, location, link1Text, link1Url, link2Text, link2Url, link3Text, link3Url, contact
      pageId, imageUrl, title, text, location, linkText, linkUrl, date
    ) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // userId: userId,
        // url: url,
        // title: title,
        // text: text,
        // location: location,
        // link1Text: link1Text,
        // link1Url: link1Url,
        // link2Text: link2Text,
        // link2Url: link2Url,
        // link3Text: link3Text,
        // link3Url: link3Url,
        // contact: contact

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
      history.goBack();
      // history.push(`/pages/${pageId}/posts/${postId}`)
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
      // userId,
      // url,
      // title,
      // text,
      // location,
      // link1Text,
      // link1Url,
      // link2Text,
      // link2Url,
      // link3Text,
      // link3Url,
      // contact

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

  // const updatePageId = (e) => { setPageId(e.target.value) };
  const updateImageUrl = (e) => { setImageUrl(e.target.value) };
  const updateTitle = (e) => { setTitle(e.target.value) };
  const updateText = (e) => { setText(e.target.value) };
  const updateLocation = (e) => { setLocation(e.target.value) };
  const updateLinkText = (e) => { setLinkText(e.target.value) };
  const updateLinkUrl = (e) => { setLinkUrl(e.target.value) };
  const updateDate = (e) => { setDate(e.target.value) };

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

      {/* <div><label>PageId</label><input type='text' name='pageId' onChange={updatePageId} value={pageId}></input></div> */}
      <div><label>ImageUrl</label><input type='text' name='imageUrl' onChange={updateImageUrl} value={imageUrl}></input></div>
      <div><label>Title</label><input type='text' name='title' onChange={updateTitle} value={title}></input></div>
      <div><label>Text</label><input type='text' name='text' onChange={updateText} value={text}></input></div>
      <div><label>Location</label><input type='text' name='location' onChange={updateLocation} value={location}></input></div>
      <div><label>LinkText</label><input type='text' name='linkText' onChange={updateLinkText} value={linkText}></input></div>
      <div><label>LinkUrl</label><input type='text' name='linkUrl' onChange={updateLinkUrl} value={linkUrl}></input></div>
      <div><label>Date</label><input type='text' name='date' onChange={updateDate} value={date}></input></div>


      <button type='submit'>Update Post!</button>
    </form>
  );
};

export default PostEdit;

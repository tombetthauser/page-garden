import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';

const PostEdit = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [errors, setErrors] = useState([]);
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

  const createPage = (pageId, imageUrl, title, text, location, linkText, linkUrl, date) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
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
      history.goBack();
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
    const data = await dispatch(createPage(pageId,imageUrl,title,text,location,linkText,linkUrl,date));
    if (data) setErrors(data);
  };
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

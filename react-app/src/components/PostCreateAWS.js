import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams, NavLink } from 'react-router-dom';

const PostCreateAWS = () => {
  // ~~~~~~~~~~~~~~ General Setup ~~~~~~~~~~~~~~
  const { pageUrl } = useParams();
  const history = useHistory();
  const [pageId, setPageId] = useState([]);
  
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('#');
  const [imageLoading, setImageLoading] = useState(false);

  // ~~~~~~~~~~~~~~ Controlled Inputs ~~~~~~~~~~~~~~
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  const [imageRotation, setImageRotation] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [date, setDate] = useState('');
  
  const controlImageUrl = (e) => { setImageUrl(e.target.value) };
  const controlDescription = (e) => { setDescription(e.target.value) };
  const controlAspectRatio = (e) => { setAspectRatio(e.target.value) };
  const controlImageRotation = (e) => { setImageRotation(e.target.value) };
  const controlTitle = (e) => { setTitle(e.target.value) };
  const controlText = (e) => { setText(e.target.value) };
  const controlLocation = (e) => { setLocation(e.target.value) };
  const controlLinkText = (e) => { setLinkText(e.target.value) };
  const controlLinkUrl = (e) => { setLinkUrl(e.target.value) };
  const controlDate = (e) => { setDate(e.target.value) };



  // ~~~~~~~~~~~~~~ Handle Submit ~~~~~~~~~~~~~~
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/pages/urls/${pageUrl}`);
      const responsePage = await response.json();
      setPageId(responsePage.id);
    }
    )();
  })

  // ~~~~~~~~~~~~~~ Handle Submit ~~~~~~~~~~~~~~
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("imageUrl", imageUrl)
    formData.append("image", image);
    formData.append("title", title)
    formData.append("description", description)
    formData.append("pageId", pageId)
    formData.append("aspectRatio", aspectRatio)
    formData.append("imageRotation", imageRotation)
    formData.append("text", text)
    formData.append("location", location)
    formData.append("linkText", linkText)
    formData.append("linkUrl", linkUrl)
    formData.append("date", date)


    setImageLoading(true);
    const res = await fetch('/api/posts/new', {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push(`/pages/${pageId}`);
    }
    else {
      setImageLoading(false);
      const data = await res.json()
      setErrors(data.errors);
      console.log("ERROR");
    }
  };
  
  // ~~~~~~~~~~~~~~ Image Update ~~~~~~~~~~~~~~
  const updateImage = (e) => {
    // This needs a multiline function so it's not in component...
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };
  
  // ~~~~~~~~~~~~~~ The Component ~~~~~~~~~~~~~~
  return (
    <div class='styled-form'>
      <div>
          {errors?.map((error, ind) => (
            <div key={ind}>&gt; {error}</div>
          ))}
      </div>
      <h1>New Post</h1>
      <form onSubmit={onSubmit}>
        {imagePreview === "#" ? <label>Image</label> : null }
        { imagePreview === "#" ? null : <img src={imagePreview} alt="image preview"/> }
        { imagePreview === "#" ? <input class="image-input" type="file" accept="image/*" onChange={updateImage} /> : null }
        { imagePreview === "#" ? null : <button onClick={() => setImagePreview("#")}>remove image</button> }
        {imagePreview === "#" ? null : <><br /><br /></> }
        
        {/* <div><label>Description</label><input type='text' name='description' onChange={controlDescription} value={description}></input></div> */}
        {/* <div><label>ImageUrl</label><input type='text' name='imageUrl' onChange={controlImageUrl} value={imageUrl}></input></div> */}
        {/* <div><label>AspectRatio</label><input type='text' name='aspectRatio' onChange={controlAspectRatio} value={aspectRatio}></input></div> */}
        {/* <div><label>ImageRotation</label><input type='text' name='imageRotation' onChange={controlImageRotation} value={imageRotation}></input></div> */}
        <div><label>Title</label><input type='text' name='title' onChange={controlTitle} value={title} placeholder='optional'></input></div>
        <div><label>Text</label><input type='text' name='text' onChange={controlText} value={text} placeholder='optional'></input></div>
        <div><label>Location</label><input type='text' name='location' onChange={controlLocation} value={location} placeholder='optional'></input></div>
        <div><label>LinkText</label><input type='text' name='linkText' onChange={controlLinkText} value={linkText} placeholder='optional'></input></div>
        <div><label>LinkUrl</label><input type='text' name='linkUrl' onChange={controlLinkUrl} value={linkUrl} placeholder='optional'></input></div>
        <div><label>Date</label><input type='text' name='date' onChange={controlDate} value={date} placeholder='optional'></input></div>

        <button class="blue-button" type="submit">Create New Post!</button>
        { imageLoading ? <p>Loading...</p> : null }
      </form>
      <NavLink to={`/pages/${pageId}`}>cancel new post</NavLink>
      {/* <vr /><NavLink to="/home">home</NavLink> */}
    </div>
  );
};

export default PostCreateAWS;
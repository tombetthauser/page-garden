import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

const PostCreateAWS = () => {
  // const [errors, setErrors] = useState([]);
  // const { pageUrl } = useParams();
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('#');
  const [imageLoading, setImageLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [pageId, setPageId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  const [imageRotation, setImageRotation] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [date, setDate] = useState('');

  const history = useHistory();

  useEffect(() => {
    // (async () => {
      // const response = await fetch(`/api/pages/urls/${pageUrl}`);
      // const responsePage = await response.json();
      // setPageId(responsePage.id);
    // }
    // )();
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    alert("Hello!");
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <post-create-aws>
      <form onSubmit={onSubmit}>
        { imagePreview ? <img src={imagePreview} alt="image preview"/> : null }

        <input type="file" accept="image/*" onChange={updateImage} />
        
        <div><label>Title</label><input type='text' name='title' onChange={setTitle} value={title}></input></div>
        <div><label>Description</label><input type='text' name='title' onChange={setDescription} value={description}></input></div>
        <div><label>Id</label><input type='text' name='title' onChange={setId} value={id}></input></div>
        <div><label>PageId</label><input type='text' name='title' onChange={setPageId} value={pageId}></input></div>
        <div><label>ImageUrl</label><input type='text' name='title' onChange={setImageUrl} value={imageUrl}></input></div>
        <div><label>AspectRatio</label><input type='text' name='title' onChange={setAspectRatio} value={aspectRatio}></input></div>
        <div><label>ImageRotation</label><input type='text' name='title' onChange={setImageRotation} value={imageRotation}></input></div>
        <div><label>Text</label><input type='text' name='title' onChange={setText} value={text}></input></div>
        <div><label>Location</label><input type='text' name='title' onChange={setLocation} value={location}></input></div>
        <div><label>LinkText</label><input type='text' name='title' onChange={setLinkText} value={linkText}></input></div>
        <div><label>LinkUrl</label><input type='text' name='title' onChange={setLinkUrl} value={linkUrl}></input></div>
        <div><label>Date</label><input type='text' name='title' onChange={setDate} value={date}></input></div>


        <button type="submit">Submit</button>
        { imageLoading ? <p>Loading...</p> : null }
      </form>
    </post-create-aws>
  );
};

export default PostCreateAWS;
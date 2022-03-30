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
        <input
          type="file"
          accept="image/*"
          onChange={updateImage}
        />
        <div><label>Title</label><input type='text' name='title' onChange={setTitle} value={title}></input></div>
        <div><label>Description</label><input type='text' name='title' onChange={setDescription} value={description}></input></div>

        <button type="submit">Submit</button>
        {imageLoading ? <p>Loading...</p> : null}
      </form>
    </post-create-aws>
  );
};

export default PostCreateAWS;
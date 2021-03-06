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

    // const imageUrl = await uploadImage(e)

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



  // From the image upload test component...
  // const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      // formData.append("title", title);
      // console.log(formData["image"])
      // // formData.append("test", "TEST from upload Image formData append!");
      
      setImageLoading(true); 
      const res = await fetch('/api/posts/test', {
          method: "POST",
          body: formData,
      });
      if (res.ok) {
          await res.json();
          setImageLoading(false);
          console.log(`\n\n\n${{res: res}}\n\n\n`)
          history.push("/posts");
      }
      else {
          setImageLoading(false);
          console.log("error")
      }
  }
  
  const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
  }

  return (
    <postcreate>
      {/* old image form  */}
      {/* <form onSubmit={handleImageSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={updateImage}
        />
        <div><label>Title</label><input type='text' name='title' onChange={updateTitle} value={title}></input></div>

        <button type="submit">Submit</button>
        {imageLoading ? <p>Loading...</p> : null}
      </form> */}


      <form onSubmit={onSubmit}>
        {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        
        {/* <input
          type="file"
          accept="image/*"
          onChange={updateImage}
        />

        {imageLoading ? <p>Loading...</p> : null} */}

        <div><label>ImageUrl</label><input type='text' name='imageUrl' onChange={updateImageUrl} value={imageUrl}></input></div>

        <div><label>Title</label><input type='text' name='title' onChange={updateTitle} value={title}></input></div>
        <div><label>Text</label><input type='text' name='text' onChange={updateText} value={text}></input></div>
        <div><label>Location</label><input type='text' name='location' onChange={updateLocation} value={location}></input></div>
        <div><label>LinkText</label><input type='text' name='linkText' onChange={updateLinkText} value={linkText}></input></div>
        <div><label>LinkUrl</label><input type='text' name='linkUrl' onChange={updateLinkUrl} value={linkUrl}></input></div>
        <div><label>Date</label><input type='text' name='date' onChange={updateDate} value={date}></input></div>

        <button type='submit'>Create Post!</button>
      </form>
    </postcreate>
  );
};

export default PostCreate;

















    // // from test image upload form component





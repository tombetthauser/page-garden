import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';

const PostCreateAWS = () => {
  // const [errors, setErrors] = useState([]);
  // const { pageUrl } = useParams();

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

  return (
    <post-create-aws>
      I'm the Post Create with AWS Component!
    </post-create-aws>
  );
};

export default PostCreateAWS;
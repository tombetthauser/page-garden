import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const PostCreateAWS = () => {
  // ~~~~~~~~~~~~~~ General Setup ~~~~~~~~~~~~~~
  const { pageId } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/pages/${pageId}`);
      const responsePage = await response.json();
      history.push(`/${responsePage.url}`)
    }
    )();
  })

  // ~~~~~~~~~~~~~~ The Component ~~~~~~~~~~~~~~
  return (<></>);
};

export default PostCreateAWS;
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';

function Page() {
  const [page, setPage] = useState({});
  const [posts, setPosts] = useState([]);
  const { pageId, pageUrl } = useParams();
  
  const history = useHistory();
  
  const currUserId = useSelector(state => {
    if (state.session.user) {
      return state.session.user.id;
    } 
  })

  useEffect(() => {
    if (!pageId && !pageUrl) return;
    if (pageUrl) {
      (async () => {
        const response = await fetch(`/api/pages/urls/${pageUrl}`);
        const page = await response.json();
        setPage(page);

        const response2 = await fetch(`/api/pages/${page.id}/posts`);
        const response2Data = await response2.json();
        setPosts(response2Data.posts)
      })();
    } else {
      (async () => {
        const response = await fetch(`/api/pages/${pageId}`);
        const page = await response.json();
        setPage(page);
  
        const response2 = await fetch(`/api/pages/${pageId}/posts`);
        const response2Data = await response2.json();
        setPosts(response2Data.posts)
      })();
    }
  }, [pageId, pageUrl]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/pages/${page.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_id: page.id }),
    });
    if (res.ok) history.push(`/pages`);
  };

  const postComponents = posts.map((post) => {
    return (
      <li key={post.id}>
        {/* This post link will need to change to a /pageUrl/postId url structure when viewing through minstagram/pageUrl */}
        {/* <NavLink to={`/pages/${pageId || page.id}/posts/${post.id}`}>  */}
        <NavLink to={`/${page.url}/${post.id}`}> 
          {post.imageUrl ? <img src={post.imageUrl} /> : null}
          {post.title ? <h3>{post.title}</h3> : null}
          {post.text ? <p>{post.text}</p> : null}
        </NavLink>
      </li>
    );
  })

  if (!page) return null;
  console.log(page)

  return (
    <>
      <ul>
          <li><strong>id</strong>: {page.id}</li>
          <li><strong>userId</strong>: {page.userId}</li>
          <li><strong>url</strong>: {page.url}</li>
          <li><strong>title</strong>: {page.title}</li>
          <li><strong>text</strong>: {page.text}</li>
          <li><strong>location</strong>: {page.location}</li>
          <li><strong>link1Text</strong>: {page.link1Text}</li>
          <li><strong>link1Url</strong>: {page.link1Url}</li>
          <li><strong>link2Text</strong>: {page.link2Text}</li>
          <li><strong>link2Url</strong>: {page.link2Url}</li>
          <li><strong>link3Text</strong>: {page.link3Text}</li>
          <li><strong>link3Url</strong>: {page.link3Url}</li>
          <li><strong>contact</strong>: {page.contact}</li>
      </ul>
      { currUserId && page.userId == currUserId ? <li><NavLink to={`/pages/${pageId}/posts/new`} exact={true} activeClassName='acti{ve'>New Post</NavLink></li> : null }
      {/* <button onClick={handleDelete}>delete page</button> */}
      {/* <NavLink to={`/pages/${page.id}/edit`}>edit page</NavLink> */}
      { currUserId && currUserId == page.userId ? <button onClick={handleDelete}>delete page</button> : null }
      { currUserId && currUserId == page.userId ? <NavLink to={`/pages/${page.id}/edit`}>edit page</NavLink> : null }
      <hr/>
      { currUserId && currUserId == page.userId ? <NavLink to={`/pages/${page.id}/posts/new`}>add post</NavLink> : null }
      <hr/>
      <h2>{page.title ? page.title : 'Page'} Posts:</h2>
      <ul>
        {postComponents}
      </ul>
    </>
  )
}

export default Page;
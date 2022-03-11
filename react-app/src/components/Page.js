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

    if (page && page.title) {
      document.querySelector("title").innerHTML = page.title
    }

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
  }, [page, pageId, pageUrl]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/pages/${page.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_id: page.id }),
    });
    if (res.ok) history.push(`/home`);
  };

  const postComponents = posts.map((post) => {
    return (
      <li class="post-li" key={post.id}>
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
    <page>
      { page.title ? <h1>{page.title}</h1> : null }
      { page.text ? <p class="page-text">{page.text}</p> : null }
      { page.location ? <p class="page-location">📍 {page.location}</p> : null }
      <ul class="links-ul">
        { page.link1Url ? <li><a href={page.link1Url} target="new">{page.link1Text || page.link1Url}</a></li> : null }
        { page.link2Url ? <li><a href={page.link2Url} target="new">{page.link2Text || page.link2Url}</a></li> : null }
        { page.link3Url ? <li><a href={page.link3Url} target="new">{page.link3Text || page.link3Url}</a></li> : null }
      </ul>
      { page.contact ? <p class="page-contact">{page.contact}</p> : null }
      {/* <ul>
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
      </ul> */}
      <ul class="user-links-ul">
        {currUserId && currUserId == page.userId ? <li><NavLink to={`/${page.url}/new`}>add post</NavLink></li> : null } <vr/>
        {currUserId && currUserId == page.userId ? <li><NavLink to={`/home`}>home</NavLink></li> : null } <vr/>
        {currUserId && currUserId == page.userId ? <li><NavLink to={`/pages/${page.id}/edit`}>edit page</NavLink></li> : null } <vr/>
        {currUserId && currUserId == page.userId ? <li><button onClick={handleDelete}>delete page</button></li> : null }
      </ul>
      {/* { currUserId && page.userId == currUserId ? <li><NavLink to={`/pages/${pageId}/posts/new`} exact={true} activeClassName='acti{ve'>New Post</NavLink></li> : null } */}
      {/* { currUserId && currUserId == page.userId ? <NavLink to={`/pages/${page.id}/edit`}>edit page</NavLink> : null }
      { currUserId && currUserId == page.userId ? <button onClick={handleDelete}>delete page</button> : null } */}
      <ul class="posts-ul">
        {postComponents}
      </ul>
    </page>
  )
}

export default Page;
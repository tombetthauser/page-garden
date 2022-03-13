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
  
  const handleMoveToTop = (movePost) => {
    const isConfirmed = window.confirm("This can't be undone, are you sure?")
    if (isConfirmed) {
      (async () => {
        // delete old version of post
        await await fetch(`/api/posts/${movePost.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page_id: movePost.id }), // <------ this doesn't seem to be necessary since the id is sent via the api route, maybe this isnt safe though since anyone could delete anything...
        });
        
        // create new duplicate post
        await await fetch(`/api/posts/new`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            pageId: movePost.pageId,
            imageUrl: movePost.imageUrl,
            title: movePost.title,
            text: movePost.text,
            location: movePost.location,
            linkText: movePost.linkText,
            linkUrl: movePost.linkUrl,
            date: movePost.date,
          }),
        });
        
        // redirect back to page
        // history.push(`/pages/${movePost.pageId}`)
      })();
    }
  }
  
  const handlePostDelete = (deletePost) => {
    const isConfirmed = window.confirm("This can't be undone, are you sure?")
    if (isConfirmed) {
      (async () => {
        await await fetch(`/api/posts/${deletePost.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page_id: deletePost.id }), // <------ this doesn't seem to be necessary since the id is sent via the api route, maybe this isnt safe though since anyone could delete anything...
        });
      })();
    }
  }

  const handleLogout = () => {
    (async () => {
      await fetch('/api/auth/logout');
      history.go(0);
    })();
  }

  const postComponents = posts.map((post) => {
    return (
      <li class="post-li" key={post.id}>
          {post.title ? <h2>{post.title}</h2> : null}

          {post.imageUrl ? (<div class="postimg-div" style={{ backgroundImage: `url(${post.imageUrl}`}}></div>) : null}
          {/* {post.imageUrl ? (<div style={{ display: "block", height: '500px', width: "500px", backgroundPosition: "center", backgroundSize: "cover", backgroundImage: `url(${post.imageUrl}`}}></div>) : null} */}
          {/* {post.imageUrl ? (<div style={`height: 100%; width: 100%; background-image: url(${post.imageUrl});`}></div>) : null} */}
          {/* {post.imageUrl ? <img src={post.imageUrl} /> : null} */}

          {post.text ? <p>{post.text}</p> : null}
        { currUserId && currUserId == page.userId ? (
          <ul class="user-links-ul">
            <li><button class="movetop-button" onClick={() => handleMoveToTop(post)}>move to top</button></li>
            <vr/>
            <li><NavLink to={`/${page.url}/${post.id}/edit`}>edit post</NavLink></li>
            <vr/>
            <li><button class="movetop-button" onClick={() => handlePostDelete(post)}>delete post</button></li>
          </ul>
        ) : null }
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
      { currUserId && currUserId == page.userId ? (
        <ul class="user-links-ul">
          <li><NavLink to={`/${page.url}/new`}>add post</NavLink></li>
          <vr/>
          <li><NavLink to={`/home`}>home</NavLink></li>
          <vr/>
          <li><button onClick={handleLogout}>logout</button></li>
          <vr/>
          <li><NavLink to={`/pages/${page.id}/edit`}>edit page</NavLink></li>
          <vr/>
          <li><button onClick={handleDelete}>delete page</button></li>
        </ul>
      ) : null }
      <ul class="posts-ul">
        {postComponents}
      </ul>
    </page>
  )
}

export default Page;
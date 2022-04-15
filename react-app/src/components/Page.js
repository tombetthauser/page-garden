import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useHistory, NavLink } from 'react-router-dom';

function Page() {
  const [page, setPage] = useState({});
  const [posts, setPosts] = useState([]);
  const [secretClick, setSecretClick] = useState(false);
  const { pageId, pageUrl } = useParams();


  const search = useLocation().search; 
  const view = new URLSearchParams(search).get('view');
  
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

        if (page && page.title) { document.querySelector("title").innerHTML = page.title }
      })();
    } else {
      (async () => {
        const response = await fetch(`/api/pages/${pageId}`);
        const page = await response.json();
        setPage(page);
  
        const response2 = await fetch(`/api/pages/${pageId}/posts`);
        const response2Data = await response2.json();
        setPosts(response2Data.posts)

        if (page && page.title) { document.querySelector("title").innerHTML = page.title }
      })();
    }

    // addSMSPrieviewHeaderMetas();
  }, [pageId, pageUrl]);

  const handleDelete = async (e) => {
    const isConfirmed = window.confirm("This can't be undone, are you sure?")
    if (isConfirmed) {
      e.preventDefault();
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page_id: page.id }),
      });
      if (res.ok) history.push(`/home`);
    }
  };
  
  const addSMSPrieviewHeaderMetas = () => {
    const header = document.getElementsByName("header");

    const meta1 = document.createElement("meta");
    const meta2 = document.createElement("meta");
    const meta3 = document.createElement("meta");

    meta1.setAttribute("property", "og:title");
    meta1.setAttribute("content", page.title);
    
    meta2.setAttribute("property", "og:image");
    meta2.setAttribute("content", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/page-facing-up_1f4c4.png");
    
    meta3.setAttribute("property", "og:url");
    meta3.setAttribute("content", `https://page.garden/${page.url}`);

    header.appendChild(meta1);
    header.appendChild(meta2);
    header.appendChild(meta3);

    // <meta property="og:title" content="Sample Preview" />
    // <meta property="og:image" content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/seedling_1f331.png" />
    // <meta property="og:url" content="http://google.com" />
  }

  const handleMoveToTop = (movePost) => {
    const isConfirmed = window.confirm("This can't be undone, are you sure?")
    if (isConfirmed) {
      (async () => {
        // delete old version of post
        await await fetch(`/api/posts/${movePost.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            page_id: movePost.id,
            clobber: true,
          }), // <------ this doesn't seem to be necessary since the id is sent via the api route, maybe this isnt safe though since anyone could delete anything...
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
        history.go(0);
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
        history.go(0);
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
    if (secretClick) {
      setSecretClick(false);
    }

    return (
      <li class="post-li" key={post.id}>
        {post.title ? <h2>{post.title}</h2> : null}
        {post.imageUrl ? <img src={post.imageUrl} /> : null}
        {post.text ? <p>{post.text}</p> : null}
        {currUserId && currUserId == page.userId && view !== 'preview' ? (
          <ul class="user-links-ul">
            <li><button class="movetop-button hover-underline" onClick={() => handleMoveToTop(post)}>move to top</button></li><vr/>
            <li><NavLink class="hover-underline" to={`/${page.url}/${post.id}/edit`}>edit post</NavLink></li><vr/>
            <li><button class="movetop-button hover-underline" onClick={() => handlePostDelete(post)}>delete post</button></li>
          </ul>
        ) : null }
      </li>
    );
  })

  if (!page) return null;
  console.log(page)

  window.addEventListener('click', function (evt) {
    if (evt.detail === 5) {

      history.push('/');
      history.go(0);
    }
  });

  const handleShareClick = event => {
    if (navigator.share) {
      alert("HELLO")
      navigator.share({
        title: 'WebShare API Demo',
        url: 'google.com'
      }).then(() => {
        alert('Thanks for sharing!');
      })
        .catch(console.error);
    } else {
      // fallback
    }
  };

  return (
    <page>
      <div class="pageheader">
        { page.title ? <h1>{page.title}</h1> : null }
        { page.text ? <p class="page-text">{page.text}</p> : null }
        { page.location ? <p class="page-location">{page.location}</p> : null }
        <ul class="links-ul">
          { page.link1Url ? <li><a href={page.link1Url} target="new">{page.link1Text || page.link1Url}</a></li> : null }
          { page.link2Url ? <li><a href={page.link2Url} target="new">{page.link2Text || page.link2Url}</a></li> : null }
          { page.link3Url ? <li><a href={page.link3Url} target="new">{page.link3Text || page.link3Url}</a></li> : null }
        </ul>
        { page.contact ? <p class="page-contact">{page.contact}</p> : null }
        { currUserId && currUserId == page.userId && view !== 'preview' ? (
          <div>
            <ul class="user-links-ul">
              <li><NavLink class="add-post" to={`/${page.url}/new`}>add post</NavLink></li>
              <hr/>
              <li><NavLink class="hover-underline" to={`/home`}>home</NavLink></li><vr/>
              <li><button class="hover-underline" onClick={handleLogout}>logout</button></li><vr/>
              <li><NavLink class="hover-underline" to={`/pages/${page.id}/edit`}>edit page</NavLink></li><vr/>
              <li><a class="hover-underline" href={`/${page.url}?view=preview`}>preview</a></li><vr/>
              <li><button class="hover-underline" onClick={handleDelete}>delete page</button></li>
              {navigator.share ? <><vr/><li><button class="hover-underline" onClick={handleShareClick}>share</button></li></> : null}
            </ul>
            {/* <NavLink class="blue-button" to={`/${page.url}/new`}>add post</NavLink> */}
          </div>
        ) : null }
      </div>
      <ul class="posts-ul">
        {postComponents}
      </ul>
    </page>
  )
}

export default Page;
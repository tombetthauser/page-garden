import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useHistory, NavLink } from 'react-router-dom';

function Magick() {
  const [magick, setMagick] = useState({});
  // const [page, setPage] = useState({});
  // const [posts, setPosts] = useState([]);
  // const [previewImage, setPreviewImage] = useState("");
  // const [secretClick, setSecretClick] = useState(false);
  // const { pageId, pageUrl } = useParams();


  const search = useLocation().search; 
  const view = new URLSearchParams(search).get('view');
  
  const history = useHistory();
  
  // const currUserId = useSelector(state => {
  //   if (state.session.user) {
  //     return state.session.user.id;
  //   } 
  // })

  useEffect(() => {
    // if (!pageId && !pageUrl) return;

    // document.querySelector("#sms-image").setAttribute("content", "")

    (async () => {
      const response = await fetch(`/api/static/test.jpg`);
      const data = await response.json();
      setMagick(data);
      // const page = await response.json();
      // setPage(page);

      // const response2 = await fetch(`/api/pages/${page.id}/posts`);
      // const response2Data = await response2.json();
      // await setPosts(response2Data.posts)

      // if (page && page.title) {
      //   document.querySelector("title").innerHTML = page.title;
      //   document.querySelector("#sms-title").setAttribute(`content`, page.title);
      //   document.querySelector("#sms-url").setAttribute(`content`, `https://page.garden/${page.url}`);
      // }
    })();
  }, []);

  // const handleDelete = async (e) => {
  //   const isConfirmed = window.confirm("This can't be undone, are you sure?")
  //   if (isConfirmed) {
  //     e.preventDefault();
  //     const res = await fetch(`/api/pages/${page.id}`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ page_id: page.id }),
  //     });
  //     if (res.ok) history.push(`/home`);
  //   }
  // };
  
  // const setSMSPreview = () => {
  //   // const smsTitle =  document.querySelector("#sms-title");
  //   // const smsImage =  document.querySelector("#sms-image");
  //   // const smsUrl =  document.querySelector("#sms-url");

  //   let previewImageUrl = '';
  //   const previewTitle = page.title ? page.title : page.url;
  //   const previewUrl = `https://page.garden/${page.url}`;

  //   // if (page.title) smsTitle.setAttribute("content", page.title);

  //   if (posts) {
  //     let i = 0;
  //     let currPost = posts[i];
  //     while (currPost && !currPost.imageUrl && i < posts.length) {
  //       i += 1
  //       currPost = posts[i]
  //     }
  //     if (currPost && currPost.imageUrl) {
  //       // smsImage.setAttribute("content", currPost.imageUrl);
  //       previewImageUrl = currPost.imageUrl
  //     }
  //   }

  //   // smsUrl.setAttribute("content", `https://page.garden/${page.url}`);
  //   const oldHead = document.querySelector("#head").innerHTML

  //   document.querySelector("#head").innerHTML = `NewHead <meta property="og:title" content="${previewTitle}" /><meta property="og:image" content="${previewImageUrl}" /><meta property="og:url" content="${previewImageUrl}" /> ${oldHead}`
  //   // + `${document.querySelector("#head").innerHTML}`
  //   // + `<meta property="og:title" content="${previewTitle} />`
  //   // + `<meta property="og:image" content="${previewImageUrl} />`
  //   // + `<meta property="og:url" content="${previewImageUrl} />`
  // }

  // const handleMoveToTop = (movePost) => {
  //   const isConfirmed = window.confirm("This can't be undone, are you sure?")
  //   if (isConfirmed) {
  //     (async () => {
  //       // delete old version of post
  //       await await fetch(`/api/posts/${movePost.id}`, {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ 
  //           page_id: movePost.id,
  //           clobber: true,
  //         }), // <------ this doesn't seem to be necessary since the id is sent via the api route, maybe this isnt safe though since anyone could delete anything...
  //       });
        
  //       // create new duplicate post
  //       await await fetch(`/api/posts/new`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ 
  //           pageId: movePost.pageId,
  //           imageUrl: movePost.imageUrl,
  //           title: movePost.title,
  //           text: movePost.text,
  //           location: movePost.location,
  //           linkText: movePost.linkText,
  //           linkUrl: movePost.linkUrl,
  //           date: movePost.date,
  //         }),
  //       });
        
  //       // redirect back to page
  //       // history.push(`/pages/${movePost.pageId}`)
  //       history.go(0);
  //     })();
  //   }
  // }
  
  // const handlePostDelete = (deletePost) => {
  //   const isConfirmed = window.confirm("This can't be undone, are you sure?")
  //   if (isConfirmed) {
  //     (async () => {
  //       await await fetch(`/api/posts/${deletePost.id}`, {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ page_id: deletePost.id }), // <------ this doesn't seem to be necessary since the id is sent via the api route, maybe this isnt safe though since anyone could delete anything...
  //       });
  //       history.go(0);
  //     })();
  //   }
  // }

  // const handleLogout = () => {
  //   (async () => {
  //     await fetch('/api/auth/logout');
  //     history.go(0);
  //   })();
  // }

  // const postComponents = posts.map((post) => {
  //   if (secretClick) {
  //     setSecretClick(false);
  //   }

  //   if (previewImage === "" && post.imageUrl) {
  //     document.querySelector("#sms-image").setAttribute("content", post.imageUrl);
  //     setPreviewImage(post.imageUrl);
  //   }

  //   return (
  //     <li class="post-li" key={post.id}>
  //       {post.title ? <h2>{post.title}</h2> : null}
  //       {post.imageUrl ? <img src={post.imageUrl} /> : null}
  //       {post.text ? <p>{post.text}</p> : null}
  //       {currUserId && currUserId == page.userId && view !== 'preview' ? (
  //         <ul class="user-links-ul">
  //           <li><button class="movetop-button hover-underline" onClick={() => handleMoveToTop(post)}>move to top</button></li><vr/>
  //           <li><NavLink class="hover-underline" to={`/${page.url}/${post.id}/edit`}>edit post</NavLink></li><vr/>
  //           <li><button class="movetop-button hover-underline" onClick={() => handlePostDelete(post)}>delete post</button></li>
  //         </ul>
  //       ) : null }
  //     </li>
  //   );
  // })

  // if (!page) return null;
  // console.log(page)

  // window.addEventListener('click', function (evt) {
  //   if (evt.detail === 5) {

  //     history.push('/');
  //     history.go(0);
  //   }
  // });

  // const handleShareClick = event => {
  //   if (navigator.share) {
  //     alert("HELLO")
  //     navigator.share({
  //       title: 'WebShare API Demo',
  //       url: 'google.com'
  //     }).then(() => {
  //       alert('Thanks for sharing!');
  //     })
  //       .catch(console.error);
  //   } else {
  //     // fallback
  //   }
  // };

  return (
    <page>
      HELLO MAGICK
      {magick ? <p>{`${magick.test}`}</p> : null }
      {/* <div class="pageheader">
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
          </div>
        ) : null }
      </div>
      <ul class="posts-ul">
        {postComponents}
      </ul> */}
    </page>
  )
}

export default Magick;
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';

function Post() {
  const [post, setPost] = useState({});
  const [page, setPage] = useState({});
  const { postId, pageId } = useParams();
  const history = useHistory();

  const currUserId = useSelector((state) => {
    if (state.session.user) {
      return state.session.user.id
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const post = await response.json();
      setPost(post);
      
      const response2 = await fetch(`/api/pages/${pageId}`);
      const page = await response2.json();
      setPage(page);
    })();
  }, [postId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id }),
    });
    if (res.ok) history.push(`/posts`);
  };
  
  if (!post) return null;

  return (
    <>
      <img src={post.imageUrl} />
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <ul>
        <li><strong>id</strong>: {post.id}</li>
        <li><strong>pageId</strong>: {post.pageId}</li>
        <li><strong>imageUrl</strong>: {post.imageUrl}</li>
        <li><strong>title</strong>: {post.title}</li>
        <li><strong>text</strong>: {post.text}</li>
        <li><strong>location</strong>: {post.location}</li>
        <li><strong>linkText</strong>: {post.linkText}</li>
        <li><strong>linkUrl</strong>: {post.linkUrl}</li>
        <li><strong>date</strong>: {post.date}</li>
      </ul>
      {/* these need to get the userId from the page associated with the pageId */}
      {/* this is going to be easiest to do with an association on the model */}
      {/* this might not be a normal thing in sqlalchemy? */}
      {/* just add a user_id column to posts and rebuild db... */}
      {currUserId == page.userId ? <button onClick={handleDelete}>delete post</button> : null}
      {currUserId == page.userId ? <NavLink to={`/posts/${post.id}/edit`}>edit post</NavLink> : null}
    </>
  )
}

export default Post;
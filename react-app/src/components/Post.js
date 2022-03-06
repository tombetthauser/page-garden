import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';

function Post() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const post = await response.json();
      setPost(post);
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
      <button onClick={handleDelete}>delete page</button>
    </>
  )
}

export default Post;
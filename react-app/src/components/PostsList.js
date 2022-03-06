import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/posts/');
      const responseData = await response.json();
      setPosts(responseData.posts)
    }
    fetchData();
  }, []);

  const postComponents = posts.map((post) => {
    return (
      <li key={post.id}>
        <NavLink to={`/posts/${post.id}`}>
          {post.imageUrl ? <img src={post.imageUrl} /> : null}
          {post.title ? <h3>{post.title}</h3> : null}
          {post.text ? <p>{post.text}</p> : null}
        </NavLink>
      </li>
    );
  })

  return (
    <>
      <h1>Post List:</h1>
      <ul>{postComponents }</ul>
    </>
  );
}

export default PostsList;
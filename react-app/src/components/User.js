import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const [pages, setPages] = useState([]);
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      
      const response2 = await fetch(`/api/users/${userId}/pages`);
      const data = await response2.json();
      console.log(data.pages.map(page => page.url))
      setPages(data.pages);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const pageComponents = pages.map(currentPage => {
    return (
      <li key={currentPage.id}>
        <NavLink to={`/${currentPage.url}`}>{currentPage.url}</NavLink>
      </li>
    )
  })

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <hr/>
      <ul>{pageComponents}</ul>
    </>
  );
}
export default User;

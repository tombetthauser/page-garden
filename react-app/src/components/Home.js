import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import LogoutButton from './auth/LogoutButton';



function Home() {
  const [user, setUser] = useState({});
  const [pages, setPages] = useState([]);
  // const { userId }  = useParams();
  const currUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${currUser.id}`);
      const user = await response.json();
      setUser(user);

      const response2 = await fetch(`/api/users/${currUser.id}/pages`);
      const data = await response2.json();
      console.log(data.pages.map(page => page.url))
      setPages(data.pages);
    })();
  }, []);

  if (!currUser) {
    return <Redirect to="/"></Redirect>
  }

  const pageComponents = pages.sort((a, b) => a.url.length < b.url.length).map(currentPage => {
    return (
      <li key={currentPage.id}>
        <NavLink to={`/${currentPage.url}`}>{currentPage.url}</NavLink>
      </li>
    )
  })

  return (
    <home>
      {/* <NavBar /> */}
      <h1>{user.username}</h1>
      <h2>{user.email}</h2>
      <h3>your pages:</h3>
      <ul>{pageComponents}</ul>
      <NavLink class="blue-button" to="/pages/new">Create New Page!</NavLink>
      {currUser ? <LogoutButton class="bottom-link" /> : null}
      <vr/>
      <NavLink class="bottom-link" to={`/users/edit`}>edit profile</NavLink>
    </home>
  );
}
export default Home;

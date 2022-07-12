import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import LogoutButton from './auth/LogoutButton';



function Home() {
  const [user, setUser] = useState({});
  const [pages, setPages] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
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
      setPageLoaded(true);
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

  const closeWelcome = event => {
    const welcomeDiv = document.querySelector(".welcome-homepage")
    welcomeDiv.style.display = "none";
  }

  const welcomeMessage = (
    <>
      <p className='no-pages'>( no pages yet )</p>
      <div class="welcome-homepage">
        <p>
          Welcome to page garden, a minimal instagram replacement that I built mainly for personal use.
        </p><p>
          I use it as a simple way to make pages about art, home improvement projects, hiking, my family etc that are easy to update from my phone and share with people. But you can use it for anything you want if you want. All you have to do is...
        </p><ul>
          <li>make a page</li>
          <li>add a title / description</li>
          <li>add some pictures / words</li>
          <li>share it with somebody</li>
        </ul><p>
          In any case welcome again and enjoy!
        </p>
        <a onClick={closeWelcome} class="homepage-close">👍</a>
      </div>
    </>
  )

  if (pageLoaded) {
    return (
      <home>
        {/* <NavBar /> */}
        <h1>{user.username}</h1>
        <h2>{user.email}</h2>
        <h3>your pages:</h3>
        { pages.length == 0 && pageLoaded ? welcomeMessage : null }
        <ul>{pageComponents}</ul>
        <NavLink className="blue-button" to="/pages/new">Create New Page!</NavLink>
        {currUser ? <LogoutButton className="bottom-link" /> : null}
        <vr/>
        <NavLink class="bottom-link" to={`/users/edit`}>edit profile</NavLink>
      </home>
    );
  } else {
    return (<></>);
  }
}
export default Home;

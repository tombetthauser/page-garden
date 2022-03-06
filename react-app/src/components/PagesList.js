import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function PagesList() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/pages/');
      const responseData = await response.json();
      setPages(responseData.pages)
    }
    fetchData();
  }, []);

  const pageComponents = pages.map((page) => {
    return (
      <li key={page.id}>
        <NavLink to={`/pages/${page.id}`}>{"> "}{page.title}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>Page List:</h1>
      <ul>{pageComponents}</ul>
    </>
  );
}

export default PagesList;
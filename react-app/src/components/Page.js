import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from 'react-router-dom';

function Page() {
  const [page, setPage] = useState({});
  const { pageId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!pageId) return;
    (async () => {
      const response = await fetch(`/api/pages/${pageId}`);
      const page = await response.json();
      setPage(page);
    })();
  }, [pageId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/pages/${page.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_id: page.id }),
    });
    if (res.ok) history.push(`/pages`);
  };

  if (!page) return null;

  return (
    <>
      <ul>
          <li><strong>id</strong>: {page.id}</li>
          <li><strong>userId</strong>: {page.userId}</li>
          <li><strong>url</strong>: {page.url}</li>
          <li><strong>title</strong>: {page.title}</li>
          <li><strong>text</strong>: {page.text}</li>
          <li><strong>location</strong>: {page.location}</li>
          <li><strong>link1Text</strong>: {page.link1Text}</li>
          <li><strong>link1Url</strong>: {page.link1Url}</li>
          <li><strong>link2Text</strong>: {page.link2Text}</li>
          <li><strong>link2Url</strong>: {page.link2Url}</li>
          <li><strong>link3Text</strong>: {page.link3Text}</li>
          <li><strong>link3Url</strong>: {page.link3Url}</li>
          <li><strong>contact</strong>: {page.contact}</li>
      </ul>
      <button onClick={handleDelete}>delete page</button>
      <NavLink to={`/pages/${page.id}/edit`}>edit page</NavLink>
    </>
  )
}

export default Page;
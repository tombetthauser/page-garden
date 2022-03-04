import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Page() {
  const [page, setPage] = useState({});
  const { pageId } = useParams();

  useEffect(() => {
    if (!pageId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/pages/${pageId}`);
      const page = await response.json();
      setPage(page);
    })();
  }, [pageId]);

  if (!page) {
    return null;
  }

  return (
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
  )
}

export default Page;
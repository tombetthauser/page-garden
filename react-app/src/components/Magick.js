import React, { useState, useEffect } from "react";

function Magick() {
  const [magick, setMagick] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/pages/magick/test.jpg`);
      // const response = await fetch(`/api/pages/magick/test-red.jpg`);
      const data = await response.json();
      setMagick(data);
    })();
  }, []);

  return (
    <page>
      HELLO MAGICK
      { console.log({magick}) }
      {magick ? <p>{`${magick.test}`}</p> : null }
    </page>
  )
}

export default Magick;
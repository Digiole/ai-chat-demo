import { useEffect } from 'react';

function Root() {
  useEffect(() => {
    window.location.href = 'https://www.getai.support/';
    return null; // Return null to prevent rendering unnec
  }, []);

  return <div></div>;
}

export default Root;

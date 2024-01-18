import React, { useState } from 'react';

const WindowResize = () => {
  const [resize, setresize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
  });

  React.useEffect(() => {
    const resizeListener = () => {
      const Mobile = window.innerWidth < 660;

      setresize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: Mobile,
      });
    };
    resizeListener();
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return resize;
};

export default WindowResize;

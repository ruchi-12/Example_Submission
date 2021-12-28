import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src= {process.env.REACT_APP_LOGO_URL + "logo.svg"}
      {...props}
    />
  );
};

export default Logo;

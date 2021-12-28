import React from 'react';

const DashboardLogo = (props) => {
  return (
    <img
      alt="Logo"
      src= {'/static/' + "logo.svg"}
      {...props}
    />
  );
};

export default DashboardLogo;

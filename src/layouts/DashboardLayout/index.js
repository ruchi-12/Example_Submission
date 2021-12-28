import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    justifyContent:'center',
    height: '100vh',
    overflow: 'scroll',
    width: '100%'
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Outlet />
    </div>
  );
};

export default DashboardLayout;


import React from 'react';
import classes from './home.css'
import Auth from '../../container/Auth/Auth'

const home = (props) => {
  return (
    <div className={classes.Home}>
      <div className={classes.ContentBox}>
        <h1 className={classes.Heading}>Eat healther equal better life!</h1>
        <Auth />
      </div>
    </div>
  );
}

export default home;
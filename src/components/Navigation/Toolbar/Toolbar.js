import React from 'react';
import classes from './Toolbar.css';
import NavigationList from '../NavigationList/NavigationList'

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <nav>
      <NavigationList />
    </nav>
  </header>
);

export default toolbar;
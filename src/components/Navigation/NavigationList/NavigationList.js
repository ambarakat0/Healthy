import React, { useContext } from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationList.css';

import { AuthContext } from '../../../context/auth-context';

const NavigationBar = (props) => {
	const { token } = useContext(AuthContext).initialState;
	let isAuthenticated = token !== null;
	let log = <NavigationItem link="/logout">Log out</NavigationItem>;
	if (!isAuthenticated && localStorage.getItem('token') === null) {
		log = <NavigationItem link="/login">Log in</NavigationItem>;
	}

	return (
		<ul className={classes.NavigationList}>
			<NavigationItem link="/meals">Find Meal</NavigationItem>
			<NavigationItem link="/calculator">Calories Calculator</NavigationItem>
			<NavigationItem link="/profile">Profile</NavigationItem>
			{log}
		</ul>
	);
};

export default NavigationBar;

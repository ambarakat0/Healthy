import React from 'react';
import classes from './Icon.css';

const icon = (props) => {
	return (
		<svg className={classes.Icon}>
			<use href={props.href}></use>
		</svg>
	);
};

export default icon;

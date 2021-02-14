import React from 'react';
import classes from './element.css';

const element = (props) => {
	return (
		<div className={classes.Element}>
			<h2 className={classes.Title}>{props.title}:</h2>
			<p className={classes.Value}>{props.value}</p>
		</div>
	);
};

export default element;

import React from 'react';
import classes from './Button.css';

const button = (props) => {
	const buttonClasses = [classes.Button, props.addedClass].join(' ');

	return (
		<button
			disabled={props.disabled}
			className={buttonClasses}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default button;

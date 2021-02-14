import React from 'react';
import classes from './ButtonSvg.css';

const btnSvg = (props) => {
	return (
		<button onClick={props.clicked} className={classes.Button}>
			<svg className={classes.Icon}>
				<use href={props.href}></use>
			</svg>
		</button>
	);
};

export default btnSvg;

import React from 'react';
import classes from './InfoPopup.css';
import Button from '../UI/button/Button';

const infoPopup = (props) => {
	return (
		<div className={classes.InfoContainer}>
			<div className={classes.Info}>
				<p className={classes.Text}>{props.info}</p>
				<Button clicked={props.clicked}>Okay</Button>
			</div>
		</div>
	);
};

export default infoPopup;

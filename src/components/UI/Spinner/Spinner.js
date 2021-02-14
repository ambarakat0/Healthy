import React from 'react';
import classes from './Spinner.css';
import Icon from '../../Icon/Icon';
import icons from '../../../assets/icons.svg';

const spinner = () => (
	<div className={classes.Spinner}>
		<Icon href={`${icons}#icon-spinner`} />
	</div>
);

export default spinner;

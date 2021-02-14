import React from 'react';
import classes from './Ingredient.css';
import Icon from '../Icon/Icon';
import icons from '../../assets/icons.svg';

const ingredient = (props) => {
	return (
		<li className={classes.Ingredient}>
			<Icon href={`${icons}#icon-checkmark`} />
			<span className={classes.Margin}>{props.quantity}</span>
			<span style={{ marginRight: '.5rem' }}>{props.unit}</span>{' '}
			{props.description}
		</li>
	);
};

export default ingredient;

import React, { useContext } from 'react';
import classes from './Meal.css';
import icons from '../../assets/icons.svg';
import Button from '../../components/UI/button/Button';
import ButtonSvg from '../UI/button/ButtonSvg/ButtonSvg';

import { RecipesContext } from '../../context/recipes-context';
import { LoadRecipe } from '../../context/loadRecipe-context';

const meal = (props) => {
	const toggleFav = useContext(RecipesContext).toggleFav;
	const loadRecipe = useContext(LoadRecipe).fetchRecipe;

	const onLoadRecipeHandler = () => {
		loadRecipe(props.id);
	};

	const toggleFavHandler = () => {
		toggleFav(props.id);
	};

	let href = `${icons}#icon-star-empty`;

	if (props.favorite) {
		href = `${icons}#icon-star-full`;
	}

	let buttonFav = (
		<ButtonSvg
			href={href}
			clicked={toggleFavHandler}
			className={classes.FavIconBtn}
		></ButtonSvg>
	);

	if (props.disappear) {
		buttonFav = null;
	}

	return (
		<li className={classes.Meal}>
			<img className={classes.Image} src={props.src} alt={props.title} />
			<h3 className={classes.Title}>{props.title}</h3>
			{buttonFav}
			<div className={classes.PublisherContainer}>
				<p className={classes.PublisherLabel}>Publisher</p>
				<p className={classes.PublisherName}>{props.publisher}</p>
			</div>
			<Button addedClass={classes.Button} clicked={onLoadRecipeHandler}>
				see more
			</Button>
		</li>
	);
};

export default meal;

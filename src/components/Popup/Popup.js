import React, { useContext, useRef, useState } from 'react';
import classes from './Popup.css';
import Icon from '../Icon/Icon';
import ButtonSvg from '../UI/button/ButtonSvg/ButtonSvg';
import icons from '../../assets/icons.svg';
import Ingredient from './Ingredient';
import { LoadRecipe } from '../../context/loadRecipe-context';

const popup = (props) => {
	const closePopup = useContext(LoadRecipe).closePopup;
	const [serving, setServing] = useState(props.details.servings);
	const servingRef = useRef(serving);

	const incServing = () => {
		if (serving >= 1) {
			setServing((prevState) => prevState + 1);
		}
		console.log(servingRef.current);
	};

	const decServing = () => {
		if (serving > 1) {
			setServing((prevState) => prevState - 1);
		}
		console.log(servingRef.current);
	};

	return (
		<div className={classes.Popup}>
			<div
				onClick={closePopup}
				style={{ width: '100v2', height: '100vh' }}
			></div>
			<div className={classes.PopupContent}>
				<figure className={classes.Figure}>
					<img
						className={classes.Img}
						src={props.details.image}
						alt={props.details.title}
					/>
				</figure>
				<div className={classes.Content}>
					<h2 className={classes.Title}>
						<span className={classes.TitleSpan}>{props.details.title}</span>
					</h2>
					<div className={classes.ServingsAndTime}>
						<div className={classes.Time}>
							<Icon href={`${icons}#icon-clock`} />
							<span>{props.details.cookingTime} minutes</span>
						</div>
						<div className={classes.Servings}>
							<Icon href={`${icons}#icon-users`} />
							<span>{serving} Servings</span>
						</div>
						<div className={classes.Btns}>
							<ButtonSvg
								clicked={incServing}
								href={`${icons}#icon-circle-up`}
							></ButtonSvg>
							<ButtonSvg
								clicked={decServing}
								href={`${icons}#icon-circle-down`}
							></ButtonSvg>
						</div>
					</div>
					<div className={classes.IngredientsContainer}>
						<h3 className={classes.IngredientsHeading}>Recipe ingredients</h3>
						<ul className={classes.Ingredients}>
							{props.details.ingredients.map((ing) => (
								<Ingredient
									key={Math.random(20)}
									quantity={(
										(ing.quantity * serving) /
										servingRef.current
									).toFixed(2)}
									unit={ing.unit}
									description={ing.description}
								/>
							))}
						</ul>
					</div>
					<div className={classes.HowToCook}>
						<p className={classes.HowToCookText}>
							This recipe was carefully designed and tested by
							<span>{props.details.publisher}</span>
						</p>
						<a
							className={classes.HowToCookLink}
							href={props.details.sourceUrl}
							target="_blank"
						>
							<span>How to cook it</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default popup;

import React, { useEffect, useState, useContext } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Popup from '../../components/Popup/Popup';
import Meal from '../../components/Meal/Meal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Element from './element/element';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { LoadRecipe } from '../../context/loadRecipe-context';

import classes from './Profile.css';

const profile = (props) => {
	const [userData, setUserData] = useState({});
	const [favMeals, setFavMeals] = useState([]);
	const [loading, setLoading] = useState(false);

	const detailsRecipe = useContext(LoadRecipe).recipe;
	const popup = useContext(LoadRecipe).popup;

	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('userId');
	//-----Fetching data-------//
	useEffect(() => {
		setLoading(true);
		const queryParams =
			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get(
				'https://healthy-aaace-default-rtdb.firebaseio.com/profile.json' +
					queryParams
			)
			.then((res) => {
				for (let key in res.data) {
					const userData = { ...res.data[key] };
					delete userData.userId;
					setUserData(userData);
				}
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		return () => setUserData({});
	}, []);

	//-----Fetching Favorite meals-------//
	useEffect(() => {
		setLoading(true);
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
		axios
			.get(
				'https://healthy-aaace-default-rtdb.firebaseio.com/fav-meals.json' +
					queryParams
			)
			.then((res) => {
				console.log(res.data);
				for (let key in res.data) {
					const favMeals = [...res.data[key].recipes];
					setFavMeals(favMeals);
				}
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		return () => setFavMeals([]);
	}, []);

	//-----Display data-------//
	let userDataContainer = null;
	if (userData) {
		const contentArr = [];
		for (let key in userData) {
			contentArr.push([key, userData[key]]);
		}
		userDataContainer = (
			<div className={classes.DataContainer}>
				{contentArr.map((el) => (
					<Element key={el[0]} title={el[0]} value={el[1]} />
				))}
			</div>
		);
	}

	//-----Display data-------//
	let favMealsContainer = null;
	if (favMeals) {
		favMealsContainer = (
			<div className={classes.FavMealsMealsContainer}>
				<h2 className={classes.FavMealsMealsHeading}>Your Favorites meals</h2>
				<ul className={classes.FavMealsMeals}>
					{favMeals.map((rec) => (
						<Meal
							key={rec.id}
							id={rec.id}
							src={rec.image}
							title={rec.title}
							publisher={rec.publisher}
							favorite={rec.isFav}
							disappear={true}
							// clicked={() => onClickSwitchFav(rec.id)}
						/>
					))}
				</ul>
			</div>
		);
	}

	if (loading) {
		userDataContainer = <Spinner />;
		favMealsContainer = null;
	}

	let popupContainer = null;

	if (popup && detailsRecipe.ingredients) {
		popupContainer = <Popup details={detailsRecipe} />;
	}

	let isAuthenticated = token !== null;
	let RedirectComponent = null;
	if (!isAuthenticated) {
		RedirectComponent = <Redirect to="/auth" />;
	}

	return (
		<React.Fragment>
			<Toolbar />
			{RedirectComponent}
			{popupContainer}
			{userDataContainer}
			{favMealsContainer}
		</React.Fragment>
	);
};

export default profile;

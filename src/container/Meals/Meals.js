import React, {
	Fragment,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import classes from './Meals.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Button from '../../components/UI/button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Meal from '../../components/Meal/Meal';
import Popup from '../../components/Popup/Popup';
import InfoPopup from '../../components/InfoPopup/InfoPopup';
import { RecipesContext } from '../../context/recipes-context';
import { AuthContext } from '../../context/auth-context';
import { LoadRecipe } from '../../context/loadRecipe-context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { useStore } from '../../Hooks/store';

const meals = (props) => {
	//----------------State---------------//
	const [page, setPage] = useState(1);
	const [serachInputValue, setSerachInputValue] = useState('');
	const [saved, setSaved] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [error, setError] = useState(false);
	// const dispatch = useStore()[1];

	const { userId, token } = useContext(AuthContext).initialState;
	const detailsRecipe = useContext(LoadRecipe).recipe;
	const popup = useContext(LoadRecipe).popup;
	const recipes = useContext(RecipesContext).recipes;
	const errorLoading = useContext(RecipesContext).error;
	const loading = useContext(RecipesContext).loading;
	const fetchRecipes = useContext(RecipesContext).fetchRecipes;

	const searchRef = useRef(null);
	const recipeRef = useRef();

	useEffect(() => {
		if (recipes.length > 0) {
			recipeRef.current = recipes;
		}
	}, [recipes.length]);

	//----------------Loading Meals from recipes context---------------//
	const onInputChange = (e) => {
		setSerachInputValue(e.target.value);
	};

	let query = null;
	const onSubmitHandler = (e) => {
		e.preventDefault();
		query = serachInputValue;
		fetchRecipes(query);
		setPage(1);
		setSerachInputValue('');
	};

	//----------------Change page---------------//
	const moveToNext = () => {
		setPage((prevState) => prevState + 1);
		searchRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};
	const moveToPrev = () => {
		setPage((prevState) => prevState - 1);
		searchRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	//----------------Add fav meal---------------//
	// const onClickSwitchFav = (id) => {
	// 	// setFav((prevState) => !prevState);
	// 	dispatch('TOGGLE_FAV', id);
	// };

	//----------------loading 12 meals per page---------------//
	let list = null;
	const getSearchResultPage = () => {
		const start = (page - 1) * 12;
		const end = page * 12;
		return recipes.slice(start, end);
	};

	const renderMeals = () => {
		if (recipes.length > 0) {
			list = (
				<ul className={classes.Meals}>
					{getSearchResultPage().map((rec) => (
						<Meal
							key={rec.id}
							id={rec.id}
							src={rec.image}
							title={rec.title}
							publisher={rec.publisher}
							favorite={rec.isFav}
							// clicked={() => onClickSwitchFav(rec.id)}
						/>
					))}
				</ul>
			);
		}
	};

	renderMeals();

	//----------------Adding next & prev button acc to numPage---------------//
	let button = null;

	let numPages = Math.ceil(recipes.length / 12);
	if (page === 1 && numPages > 1) {
		button = (
			<div className={classes.PaginationBtnContainer}>
				<Button className={classes.Btn} clicked={moveToNext}>
					Next
				</Button>
			</div>
		);
	}

	if (page === numPages && numPages > 1) {
		button = (
			<div className={classes.PaginationBtnContainer}>
				<Button
					style={{ marginRight: 'auto' }}
					className={classes.Btn}
					clicked={moveToPrev}
				>
					Previous
				</Button>
			</div>
		);
	}

	if (page < numPages && page !== 1) {
		button = (
			<div className={classes.PaginationBtnContainer}>
				<Button
					addedClass={classes.PaginationBtnPrev}
					type="text"
					clicked={moveToPrev}
				>
					Previous
				</Button>
				<Button
					addedClass={classes.PaginationBtnNext}
					type="text"
					clicked={moveToNext}
				>
					Next
				</Button>
			</div>
		);
	}

	//----------------adding loading spinner till ---------------//
	if (loading) {
		list = <Spinner />;
	}

	//----------------make popup appear---------------//
	let popupContainer = null;

	if (popup && detailsRecipe.ingredients) {
		popupContainer = <Popup details={detailsRecipe} />;
	}

	let isAuthenticated = token !== null;
	const onSendFavMealsHandler = () => {
		if (!isAuthenticated) {
			alert('please login');
			return;
		}
		setSaveLoading(true);
		const favRecipes = {
			recipes: recipes.filter((rec) => rec.isFav),
			userId: userId,
		};
		axios
			.post(
				'https://healthy-aaace-default-rtdb.firebaseio.com/fav-meals.json',
				favRecipes
			)
			.then((res) => {
				setSaved(true);
				setSaveLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});
	};

	let disabled = true;
	if (recipeRef.current !== undefined && recipes.length > 1) {
		recipeRef.current.forEach((el, i) => {
			if (el.isFav !== recipes[i].isFav) {
				disabled = false;
			}
		});
	}

	const onCloseModelHandler = () => {
		setError(false);
		setSaved(false);
		setSaveLoading(false);
	};

	let saveDisplay = null;
	if (error || saved) {
		saveDisplay = (
			<InfoPopup clicked={onCloseModelHandler} info={'saved to your profile'} />
		);
	}
	let savingSpinner = null;
	if (saveLoading) {
		savingSpinner = <Spinner />;
	}
	const errorMessage =
		'Something is going wrong!, try again please, and check of spelling';

	return (
		<Fragment>
			{Redirect}
			<Toolbar />
			{popupContainer}
			{saveDisplay}
			<div className={classes.Container}>
				<form onSubmit={onSubmitHandler} className={classes.Search}>
					<input
						ref={searchRef}
						className={classes.Input}
						onChange={(e) => onInputChange(e)}
						type="text"
						placeholder="Search for recipes"
						value={serachInputValue}
					/>
					<Button addedClass={classes.Button}>Search</Button>
				</form>
				{errorLoading ? <p className={classes.Error}>{errorMessage}</p> : null}
				<div className={classes.Saving}>
					<Button disabled={disabled} clicked={onSendFavMealsHandler}>
						Save your favorite meals to your profile
					</Button>
					{savingSpinner}
				</div>
				{list}
				{button}
			</div>
		</Fragment>
	);
};
export default meals;

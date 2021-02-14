import axios from 'axios';
import React, { useState } from 'react';
// import { updateObject } from '../shared/utility';

export const RecipesContext = React.createContext({
	recipes: [],
	laoding: false,
	error: false,

	fetchRecipes: () => {},
	toggleFav: () => {},
});

export default (props) => {
	const [recipesState, setRecipes] = useState({
		recipes: [],
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchRecipesStart = () => {
		setLoading(true);
		setError(false);
	};

	const fetchRecipesSuccess = (fetchedRecipes) => {
		setLoading(false);
		setError(false);
		setRecipes(fetchedRecipes);
	};

	const fetchRecipesFail = (error) => {
		setLoading(false);
		setError(true);
	};

	const fetchRecipes = async (query) => {
		fetchRecipesStart();
		try {
			const res = await axios.get(
				`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=bfa2bbd8-275c-4157-84d4-97476e67e670`
			);

			const fetchedRecipes = res.data.data.recipes.map((rec) => {
				return {
					id: rec.id,
					key: rec.id,
					image: rec.image_url,
					publisher: rec.publisher,
					title: rec.title,
					isFav: false,
				};
			});
			fetchRecipesSuccess(fetchedRecipes);
			if (res.data.data.recipes.length <= 0) {
				setError(true);
				console.log(true);
			}
		} catch (err) {
			fetchRecipesFail(err);
			throw err;
		}
	};

	const toggleFav = (id) => {
		const mealIndex = recipesState.findIndex((meal) => meal.id === id);
		const newFavStatus = !recipesState[mealIndex].isFav;
		const updatedMeals = [...recipesState];
		updatedMeals[mealIndex] = {
			...recipesState[mealIndex],
			isFav: newFavStatus,
		};
		setRecipes(updatedMeals);
	};

	return (
		<RecipesContext.Provider
			value={{
				recipes: recipesState,
				loading: loading,
				error: error,
				fetchRecipes: fetchRecipes,
				toggleFav: toggleFav,
			}}
		>
			{props.children}
		</RecipesContext.Provider>
	);
};

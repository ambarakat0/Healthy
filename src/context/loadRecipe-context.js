import React, { useState } from 'react';
import axios from 'axios';

export const LoadRecipe = React.createContext({
	recipe: {},
	popup: false,
	error: false,

	fetchRecipe: () => {},
	closePopup: () => {},
});

export default (props) => {
	const [recipe, setRecipe] = useState({});
	const [popup, setPopup] = useState(false);
	const [error, setError] = useState(false);

	const fetchRecipeSuccess = (fetchedRecipe) => {
		setPopup(true);
		setRecipe(fetchedRecipe);
		console.log(recipe, popup, error);
	};

	const fetchRecipeFail = (error) => {
		setPopup(true);
		setError(error);
	};

	const fetchRecipe = async (id) => {
		try {
			const res = await axios.get(
				`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=bfa2bbd8-275c-4157-84d4-97476e67e670`
			);

			const { recipe } = res.data.data;

			const updatedRecipeData = {
				id: recipe.id,
				title: recipe.title,
				publisher: recipe.publisher,
				sourceUrl: recipe.source_url,
				image: recipe.image_url,
				servings: recipe.servings,
				cookingTime: recipe.cooking_time,
				ingredients: recipe.ingredients,
			};
			fetchRecipeSuccess(updatedRecipeData);
		} catch (err) {
			fetchRecipeFail(err);
		}
	};

	const closePopup = () => {
		setPopup(false);
	};

	return (
		<LoadRecipe.Provider
			value={{
				recipe: recipe,
				popup: popup,
				error: error,
				fetchRecipe: fetchRecipe,
				closePopup: closePopup,
			}}
		>
			{props.children}
		</LoadRecipe.Provider>
	);
};

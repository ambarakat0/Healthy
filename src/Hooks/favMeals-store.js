import { initStore } from './store';
// import { RecipesContext } from '../context/recipes-context';
// import { useContext } from 'react';

const configureStore = () => {
	// const fetchedMeals = useContext(RecipesContext).recipes;
	const actions = {
		TOGGLE_FAV: (curState, id) => {
			const mealIndex = curState.meals.findIndex((meal) => meal.id === id);
			const newFavStatus = !curState.meals[mealIndex].isFav;
			const updatedMeals = [...curState.meals];
			updatedMeals[mealIndex] = {
				...curState.meals[mealIndex],
				isFav: newFavStatus,
			};

			return {
				meals: updatedMeals,
			};
		},
	};

	initStore(actions);
};
export default configureStore;

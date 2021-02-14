import React from 'react';
import LoadingProvider from '../../context/loadRecipe-context';

const layout = (props) => {
	return (
		<main>
			<LoadingProvider>{props.children}</LoadingProvider>
		</main>
	);
};

export default layout;

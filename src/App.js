import React, { useContext, useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Meals from './container/Meals/Meals';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout';
import Login from './container/Auth/Login';
import RecipesProvider from './context/recipes-context';

import { AuthContext } from './context/auth-context';

const Calculator = React.lazy(() => {
	return import('./container/Calculator/Calculator');
});

const Profile = React.lazy(() => {
	return import('./container/Profile/Profile');
});

const app = (props) => {
	const authCheckState = useContext(AuthContext).authCheckState;
	const { token } = useContext(AuthContext).initialState;

	useEffect(() => {
		authCheckState();
	}, [authCheckState]);

	// let routes = null

	// if (isAuthenticated) {
	//   routes = (
	//     <Switch>
	//       <Route path="/auth" component={Auth} />
	//     </Switch>
	//   )
	// } else {
	//   routes = (
	//     <Switch>
	//       <Route path="/auth" component={Auth} />
	//       <Route path="/logout" component={Logout} />
	//       <Route path="/meals" component={Meals} />
	//       <Route path="/calculator" render={(props) => <Calculator {...props} />} />
	//       <Route path="/profile" render={(props) => <Profile {...props} />} />
	//     </Switch>
	//   )
	// }

	let isAuthenticated = token !== null;
	let log = <Route path="/logout" component={Logout} />;
	if (!isAuthenticated && localStorage.getItem('token') === null) {
		log = <Route path="/login" component={Login} />;
	}

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			{log}
			<Route path="/meals" component={Meals} />
			{/* <Route path="/favorite meals" component={FavMeals} /> */}
			<Route path="/calculator" render={(props) => <Calculator {...props} />} />
			<Route path="/profile" render={(props) => <Profile {...props} />} />
			<Redirect to="/meals" />
		</Switch>
	);

	return (
		<div className="App">
			<RecipesProvider>
				<Layout>
					<Suspense fallback={<Spinner />}>{routes}</Suspense>
				</Layout>
			</RecipesProvider>
		</div>
	);
};

export default withRouter(app);

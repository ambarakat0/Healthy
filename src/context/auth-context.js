import React, { useState } from 'react';
import { updateObject } from '../shared/utility';
import axios from 'axios';

export const AuthContext = React.createContext({
	initialState: {
		token: null,
		userId: null,
		error: null,
		loading: false,
		isAuthenticated: false,
	},
	auth: () => {},
	authLogout: () => {},
	authCheckState: () => {},
});

export default (props) => {
	const [initialState, setInitialState] = useState({
		token: null,
		userId: null,
		error: null,
		loading: false,
		isAuthenticated: false,
	});

	const authStart = () => {
		return setInitialState(
			updateObject(initialState, {
				error: null,
				loading: true,
			})
		);
	};

	const authSuccess = (token, userId) => {
		return setInitialState(
			updateObject(initialState, {
				token: token,
				userId: userId,
				error: null,
				loading: false,
				isAuthenticated: true,
			})
		);
	};

	const authFail = (error) => {
		return setInitialState(
			updateObject(initialState, {
				error: error,
				loading: false,
			})
		);
	};

	const FetchAuthLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('userId');
		return setInitialState(
			updateObject(initialState, {
				token: null,
				userId: null,
				isAuthenticated: false,
			})
		);
	};

	const checkAuthTimeout = (expirationTime) => {
		return () => {
			setTimeout(() => {
				FetchAuthLogout();
			}, expirationTime * 1000);
		};
	};

	const fetchedAuth = (email, password, isSignUp) => {
		authStart();

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUC8f5QLDaqAxRn4dS1ECY3wTHOwcukeU`;

		if (!isSignUp) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUC8f5QLDaqAxRn4dS1ECY3wTHOwcukeU`;
		}

		axios
			.post(url, authData)
			.then((res) => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', res.data.localId);
				authSuccess(res.data.idToken, res.data.localId);
				checkAuthTimeout(res.data.expiresIn);
			})
			.catch((err) => {
				console.log(err);
				authFail(err.response.data.error);
				throw err;
			});
	};

	const authCheckState = () => {
		return () => {
			const token = localStorage.getItem('token');
			if (!token) {
				FetchAuthLogout();
			} else {
				const expirationDate = new Date(localStorage.getItem('expirationDate'));
				if (expirationDate > new Date()) {
					const userId = localStorage.getItem('userId');
					authSuccess(token, userId);
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					);
				} else {
					FetchAuthLogout();
				}
			}
		};
	};

	return (
		<AuthContext.Provider
			value={{
				initialState: initialState,
				auth: fetchedAuth,
				authLogout: FetchAuthLogout,
				authCheckState: authCheckState,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

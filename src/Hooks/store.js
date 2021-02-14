import { useState, useEffect } from 'react';

let globleState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
	const setState = useState(globleState)[1];

	const dispatch = (actionIdentifier, payload) => {
		const newState = actions[actionIdentifier](globleState, payload);
		globleState = { ...globleState, ...newState };

		for (const listener of listeners) {
			listener(globleState);
		}
	};

	useEffect(() => {
		listeners.push(setState);
		return () => {
			listeners = listeners.filter((li) => li !== setState);
		};
	}, []);

	return [globleState, dispatch];
};

export const initStore = (userActions, initialState) => {
	if (initialState) {
		globleState = { ...globleState, ...initialState };
	}
	actions = { ...actions, ...userActions };
};

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AuthProvider from './context/auth-context';
import configureMealsStore from './Hooks/favMeals-store';

configureMealsStore();

ReactDOM.render(
	<AuthProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthProvider>,
	document.getElementById('root')
);
registerServiceWorker();

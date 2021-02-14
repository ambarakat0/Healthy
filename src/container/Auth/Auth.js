import React, { useState, useContext, useCallback } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity, updateObject } from '../../shared/utility';
import classes from './Auth.css';
import { AuthContext } from '../../context/auth-context';
import { Redirect } from 'react-router-dom';

const auth = (props) => {
	const [authForm, setAuthForm] = useState({
		// name: {
		//   elementType: 'input',
		//   elementConfig: {
		//     type: 'text',
		//     placeholder: 'Name'
		//   },
		//   value: '',
		//   validation: {
		//     required: true
		//   },
		//   valid: false,
		//   touched: false
		// },
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'E-mail',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 7,
			},
			valid: false,
			touched: false,
		},
	});
	const [isSignUp, setIsSignUp] = useState(true);

	const onAuth = useContext(AuthContext).auth;
	const { token, loading, error } = useContext(AuthContext).initialState;

	const inputChangeHandler = (e, controlName) => {
		const updatedControls = updateObject(authForm, {
			[controlName]: updateObject(authForm[controlName], {
				value: e.target.value,
				valid: checkValidity(e.target.value, authForm[controlName].validation),
				touched: true,
			}),
		});
		setAuthForm(updatedControls);
	};

	const switchAuthMood = () => {
		setIsSignUp((prevState) => !prevState);
	};

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault();
			onAuth(authForm.email.value, authForm.password.value, isSignUp);
		},
		[authForm.email.value, authForm.password.value, isSignUp]
	);

	const authFormElements = [];
	for (let key in authForm) {
		authFormElements.push({
			id: key,
			config: authForm[key],
		});
	}

	let form = authFormElements.map((el) => (
		<Input
			key={el.id}
			elementType={el.config.elementType}
			elementConfig={el.config.elementConfig}
			value={el.config.value}
			inValid={!el.config.valid}
			shouldValidate={el.config.validation}
			changed={(e) => inputChangeHandler(e, el.id)}
			touched={el.config.touched}
		/>
	));

	if (loading) {
		form = <Spinner />;
	}

	let isAuthenticated = token !== null;
	let authRedirect = null;
	if (isAuthenticated || localStorage.getItem('token') !== null) {
		authRedirect = <Redirect to="/meals" />;
	}

	let errorMessage = 'Account is incorrect, Try again!';

	return (
		<React.Fragment>
			{authRedirect}
			<div className={classes.Container}>
				<div className={classes.ContentBox}>
					<h1 className={classes.Heading}>Eat healther equal better life!</h1>
					<div className={classes.AuthForm}>
						<h2>{isSignUp ? 'Please Sign up' : 'Please Sign in'}</h2>
						<form onSubmit={submitHandler}>
							{form}
							{error ? <p>{errorMessage}</p> : null}
							<a onClick={switchAuthMood}>
								{isSignUp ? 'Already have account' : 'Create account'}
							</a>
							<Button>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Button>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default auth;

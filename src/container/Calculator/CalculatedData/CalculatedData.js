import React, { useContext, useState } from 'react';
import classes from './CalculatedData.css';
import Button from '../../../components/UI/button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InfoPopup from '../../../components/InfoPopup/InfoPopup';
import axios from 'axios';

import { AuthContext } from '../../../context/auth-context';

const calculatedData = (props) => {
	const [saved, setSaved] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [error, setError] = useState(false);

	const { userId, token } = useContext(AuthContext).initialState;
	console.log(userId);

	let containerStyle = classes.DataContainerInvisible;

	if (props.visibility) {
		containerStyle = classes.DataContainerVisible;
	}

	const bmr = Math.round(
		665.09 + 9.56 * props.weight + 1.84 * props.height - 4.67 * props.age
	);
	const addActivity = bmr * props.activity;
	const calories = addActivity + +props.goal;

	const protein = (calories * 0.12) / 4;
	const carb = (calories * 0.6) / 4;
	const fat = (calories * 0.28) / 9;

	const data = {
		userId: userId,
		calories: calories.toFixed(2),
		protein: protein.toFixed(2),
		carb: carb.toFixed(2),
		fat: fat.toFixed(2),
		weight: props.weight,
		height: props.height,
		age: props.age,
	};

	let isAuthenticated = token !== null;
	const onSendDataHandler = () => {
		if (!isAuthenticated) {
			alert('please login');
			return;
		}
		setSaveLoading(true);
		axios
			.post(
				'https://healthy-aaace-default-rtdb.firebaseio.com/profile.json',
				data
			)
			.then((res) => {
				console.log(res);
				setSaved(true);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});
	};

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
	return (
		<div className={containerStyle}>
			{saveDisplay}
			<h2 className={classes.Heading}>
				Your calculated data to achieve your goal
			</h2>
			<div className={classes.TextContainer}>
				<h3>Your calories/day</h3>
				<p>{calories.toFixed(2)}/day</p>
			</div>
			<div className={classes.TextContainer}>
				<h3>Protein/day</h3>
				<p>{protein.toFixed(2)} g/day</p>
			</div>
			<div className={classes.TextContainer}>
				<h3>Carbohydrate/day</h3>
				<p>{carb.toFixed(2)} g/day</p>
			</div>
			<div className={classes.TextContainer}>
				<h3>Fat/day</h3>
				<p>{fat.toFixed(2)} g/day</p>
			</div>
			<Button clicked={onSendDataHandler} className={classes.Button}>
				Save
			</Button>
			{savingSpinner}
		</div>
	);
};

export default calculatedData;

import React, { useState } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Input from '../../components/UI/Input/Input';
import { checkValidity, updateObject } from '../../shared/utility';
import Button from '../../components/UI/button/Button';
import CalculatedData from './CalculatedData/CalculatedData';

import classes from './Calculator.css';

const calculator = (props) => {
	const [bmrForm, setBmrForm] = useState({
		weight: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your weight in kg',
			},
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		height: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your height in cm',
			},
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		age: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your age in years',
			},
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		activity: {
			elementType: 'select',
			elementConfig: {
				options: [
					{
						value: 1.2,
						displayValue: `Don't work out or low intensity activities`,
					},
					{
						value: 1.375,
						displayValue: `Light exercise "walking" 3-4 times/week for 30-45 mins`,
					},
					{
						value: 1.55,
						displayValue: `Moderate exercise "running" 3-4 times/week for 30-45 mins`,
					},
					{
						value: 1.725,
						displayValue: `High intensity exercise 6-7 times/week for 45-60 mins`,
					},
					{
						value: 1.9,
						displayValue: `Athlete or train like one at a highly intense`,
					},
				],
			},
			value: 1.55,
			validation: {},
			valid: true,
		},
		goal: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 0, displayValue: `Maintenance` },
					{ value: -300, displayValue: `Weight loss` },
					{ value: 300, displayValue: `Lean gain` },
				],
			},
			value: 0,
			validation: {},
			valid: true,
		},
	});

	const [_, setIsValidForm] = useState(false);
	const [isDisable, SetIsDisable] = useState(true);

	const [inputData, setInputData] = useState({
		activity: 0,
		goal: 0,
		age: 0,
		weight: 0,
		height: 0,
		visibility: false,
	});

	const inputChangeHandler = (e, identifier) => {
		const updatedEl = updateObject(bmrForm[identifier], {
			value: e.target.value,
			touched: true,
			valid: checkValidity(e.target.value, bmrForm[identifier].validation),
		});

		const updatedForm = updateObject(bmrForm, {
			[identifier]: updatedEl,
		});

		let formIsValid = true;
		for (let identifier in updatedForm) {
			formIsValid = updatedForm[identifier].valid && formIsValid;
		}

		setBmrForm(updatedForm);
		setIsValidForm(formIsValid);
		if (formIsValid) {
			SetIsDisable(false);
		}
	};

	const calcData = {};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		for (let identifier in bmrForm) {
			calcData[identifier] = bmrForm[identifier].value;
		}
		setInputData({
			activity: calcData.activity,
			goal: calcData.goal,
			age: calcData.age,
			weight: calcData.weight,
			height: calcData.height,
			visibility: true,
		});
	};

	const formElementsArr = [];
	for (let key in bmrForm) {
		formElementsArr.push({
			id: key,
			config: bmrForm[key],
		});
	}

	let form = (
		<form onSubmit={onSubmitHandler}>
			{formElementsArr.map((el) => (
				<Input
					key={el.id}
					elementType={el.config.elementType}
					elementConfig={el.config.elementConfig}
					value={el.config.value}
					shouldValidate={el.config.validation}
					inValid={!el.config.valid}
					touched={el.config.touched}
					changed={(e) => inputChangeHandler(e, el.id)}
				/>
			))}
			<Button disabled={isDisable}>calculate</Button>
		</form>
	);

	let data = (
		<CalculatedData
			activity={inputData.activity}
			goal={inputData.goal}
			weight={inputData.weight}
			height={inputData.height}
			age={inputData.age}
			visibility={inputData.visibility}
		/>
	);

	return (
		<React.Fragment>
			<Toolbar />
			<div className={classes.Container}>
				<div className={classes.ContentBox}>
					<h4 className={classes.Heading}>Enter you data please</h4>
					{form}
				</div>
				{data}
			</div>
		</React.Fragment>
	);
};

export default calculator;

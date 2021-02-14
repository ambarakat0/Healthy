import React from 'react';
import { Redirect } from 'react-router-dom';

const login = (props) => {
	return <Redirect to="/auth" />;
};

export default login;

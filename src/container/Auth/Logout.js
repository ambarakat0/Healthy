import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context'

const logout = props => {
  const onLogout = useContext(AuthContext).authLogout;
  useEffect(() => {
    onLogout();
  }, [onLogout])
  return <Redirect to="/auth" />;
}

export default logout;
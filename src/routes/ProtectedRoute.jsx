import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children, isAllowed, redireccionar = '/login' }) => {
	const location = useLocation();

	if (!isAllowed && location.pathname !== redireccionar) {
		return (
			<Navigate
				to={redireccionar}
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
};

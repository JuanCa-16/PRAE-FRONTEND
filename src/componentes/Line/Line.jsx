import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './Line.scss';

const Line = () => {
	const { theme } = useTheme();
	return <div className={`linea ${theme}`}></div>;
};

export default Line;

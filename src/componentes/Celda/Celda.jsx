import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './Celda.scss';

const Celda = ({ txt = 'Valor', color, tipo = 'titulo', rol = 'ver', onClick }) => {
	const { theme } = useTheme();
	return (
		<div
			className={`${theme} celda ${tipo} ${rol} ${color}`}
			onClick={onClick}
		>
			<p>{txt}</p>
		</div>
	);
};

export default Celda;

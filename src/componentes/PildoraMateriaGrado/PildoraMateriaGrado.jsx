import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './PildoraMateriaGrado.scss';

const PildoraMateriaGrado = ({ color = 'azul', texto = 'CALCULO I', onClick, clase }) => {
	const { theme } = useTheme();
	return (
		<div
			className={`contenedorPildoraG ${color} ${theme} ${clase}`}
			onClick={onClick}
		>
			<div className='materia'>
				<h4 className='inter'>{texto}</h4>
				<div className='elipse1'></div>
				<div className='elipse2'></div>
			</div>
		</div>
	);
};

export default PildoraMateriaGrado;

import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './PildoraTitulo.scss';

//Fucnion para poner mayusculas iniciales
const capitalizeWords = (str) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const PildoraTitulo = ({
	color = 'azul',
	nombre = 'Juan Camilo Henao',
	materia = 'CALCULO II',
	nota = '4.5',
	grado,
}) => {
	const { theme } = useTheme();
	return (
		<div className={`${theme} contenedorPilaTitulo ${color} `}>
			<div className='infoContainer'>
				<div className='info'>
					<p className='lato nombre'>{capitalizeWords(nombre)}</p>
					<h4 className='inter bold materia'>{materia.toUpperCase()}</h4>
					<p className='lato nombre'>{grado}</p>
				</div>
				<h2 className='nota inter bold'>{nota}</h2>
			</div>
			<div className='elipse1'></div>
			<div className='elipse2'></div>
		</div>
	);
};

export default PildoraTitulo;

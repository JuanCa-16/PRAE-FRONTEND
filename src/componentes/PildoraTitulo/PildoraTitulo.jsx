import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './PildoraTitulo.scss';

//Funcion para poner mayusculas iniciales
const capitalizeWords = (str) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Componente PildoraTitulo que muestra una "píldora" con información sobre un estudiante, la materia, el grado y la nota.
 * Se puede personalizar con un color, un nombre de estudiante, una materia, un grado y una nota.
 * 
 * @component
 * 
 * @param {string} [color='azul'] - El color de la píldora, utilizado para personalizar el estilo.
 * @param {string} [nombre='NOMBRE DOCENTE'] - El nombre del estudiante que se mostrará en la píldora.
 * @param {string} [materia='CALCULO II'] - La materia que se mostrará en la píldora.
 * @param {string} [nota='4.5'] - La nota del estudiante en la materia.
 * @param {string} [grado] - El grado del estudiante (por ejemplo, "11-2").
 * 
 * @returns {JSX.Element} Una "píldora" con la información del estudiante, la materia, la nota y el grado.
 */

const PildoraTitulo = ({
	color = 'azul',
	nombre = 'NOMBRE DOCENTE',
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

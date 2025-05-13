import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './PildoraMateriaGrado.scss';

/**
 * Componente PildoraMateriaGrado que muestra una "píldora" con información sobre una materia o grado asignado.
 * Se puede personalizar con un color y un texto.
 * 
 * @component
 * 
 * @param {string} [color='azul'] - El color de la píldora, utilizado para personalizar el estilo.
 * @param {string} [texto='CALCULO I'] - El texto que representa la materia (por ejemplo, "Cálculo I").
 * @param {function} [onClick] - Función que se ejecuta cuando se hace clic en la píldora.
 * @param {string} [clase] - Clase CSS adicional que puede modificar el estilo del componente.
 * 
 * @returns {JSX.Element} Una "píldora" con el texto de la materia, que puede ser personalizada.
 */

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

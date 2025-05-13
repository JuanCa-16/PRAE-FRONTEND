import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './PildoraEst.scss';

/**
 * Componente PildoraEst que muestra una "píldora" con información sobre un estudiante y su curso.
 * Se puede personalizar con un color, un nombre de estudiante y un curso.
 * 
 * @component
 * 
 * @param {string} [color='azul'] - El color de la píldora, utilizado para personalizar el estilo.
 * @param {string} [est='NOMBRE APELLIDO'] - El nombre del estudiante que se mostrará en la píldora.
 * @param {string} [curso='11-2'] - El curso del estudiante.
 * @param {string} [clase='grande'] - Clase CSS que puede modificar el tamaño de la píldora.
 * @param {function} [onClick] - Función que se ejecuta cuando se hace clic en la píldora.
 * @param {boolean} [estadistica=false] - Si es `true`, se mostrará el contenido de `children` en lugar del curso.
 * @param {ReactNode} [children] - Elementos adicionales que se mostrarán si `estadistica` es `true`.
 * 
 * @returns {JSX.Element} Una "píldora" con la información del estudiante y el curso, que puede ser personalizada.
 */

const PildoraEst = ({
	color = 'azul',
	est = 'NOMBRE APELLIDO',
	curso = '11-2',
	clase = 'grande',
	onClick,
	estadistica = false,
	children,
}) => {
	const { theme } = useTheme();

	return (
		<div
			className={`pildoraEst ${clase} ${color} ${theme}`}
			onClick={onClick}
		>
			<div className='contenedor'>
				<p className='nombre bold'>{est.toUpperCase()}</p>
				{!estadistica ? (
					<h4 className='inter curso'>{curso}</h4>
				) : (
					<h4 className='inter curso'>{children}</h4>
				)}
			</div>
			<div className='elipse2' />
			<div className='elipse1' />
		</div>
	);
};

export default PildoraEst;

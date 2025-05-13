import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './Pildora.scss';

/**
 * Componente Pildora que muestra una tarjeta interactiva con información sobre una materia o elemento.
 * 
 * @component
 * 
 * @param {string} [titulo='CALCULO 1'] - El título de la materia o elemento.
 * @param {string} [txtsuperior='Juan Manuel'] - El texto que se muestra en la parte superior de la pildora.
 * @param {string} [txtinferior] - El texto que se muestra en la parte inferior de la pildora.
 * @param {string} [color] - Color de la pildora, se puede usar para personalizar el estilo.
 * @param {function} [onClick] - Función que se ejecuta cuando se hace clic en la pildora.
 * 
 * @returns {JSX.Element} Una pildora con el texto superior, título y texto inferior, y con un evento de clic.
 */

const Pildora = ({ titulo = 'CALCULO 1', txtsuperior = 'Juan Manuel', txtinferior, color, onClick }) => {
	const { theme } = useTheme();
	return (
		<div
			className={`pildora ${color} ${theme}`}
			onClick={onClick}
		>
			<div className='info'>
				<div className='textos'>
					<p className='texto superior lato'>{txtsuperior}</p>
				</div>
				<div className='textos'>
					<h4 className='titulo inter bold'>{titulo.toUpperCase()}</h4>
				</div>
				<div className='textos'>
					<p className='texto inferior lato'> {txtinferior}</p>
				</div>
			</div>
			<div className='elipse1' />
			<div className='elipse2' />
		</div>
	);
};

export default Pildora;

import React from 'react';
import './TituloDes.scss';

/**
 * Componente TituloDes que muestra un título y una descripción en un contenedor.
 * Utilizado para proporcionar títulos y descripciones en la interfaz de usuario.
 * 
 * @component
 * 
 * @param {string} [titulo='Titulo'] - El título que se muestra en el componente.
 * @param {string} [desc='Descripcion del titulo'] - La descripción que se muestra debajo del título.
 * 
 * @returns {JSX.Element} Un contenedor con un título y una descripción.
 */

const TituloDes = ({ titulo = 'Titulo', desc = 'Descripcion del titulo' }) => {
	return (
		<div className='contenedorTituloDes'>
			<h3 className='bold'>{titulo} </h3>
			<p className='lato'>{desc} </p>
		</div>
	);
};

export default TituloDes;

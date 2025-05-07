import React from 'react';
import './TituloDes.scss';

const TituloDes = ({ titulo = 'Titulo', desc = 'Descripcion del titulo' }) => {
	return (
		<div className='contenedorTituloDes'>
			<h3 className='bold'>{titulo} </h3>
			<p className='lato'>{desc} </p>
		</div>
	);
};

export default TituloDes;

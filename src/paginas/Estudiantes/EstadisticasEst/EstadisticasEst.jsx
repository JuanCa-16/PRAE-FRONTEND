import React from 'react';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import EstEstadisticas from '../../../componentes/Estadisticas/EstEstadisticas/EstEstadisticas';
import './EstadisticasEst.scss';

const EstadisticasEst = () => {
	return (
		<div className='contenedorEstEstudiante'>
			<TituloDes
				titulo='ESTADÍSTICAS'
				desc='Aquí podrás consultar diversas estadísticas...'
			></TituloDes>
			<EstEstadisticas></EstEstadisticas>
		</div>
	);
};

export default EstadisticasEst;

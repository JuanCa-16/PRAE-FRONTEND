import React from 'react';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import ProfeEstadisticas from '../../../componentes/Estadisticas/ProfeEstadisticas/ProfeEstadisticas';
import './EstadisticasDocentes.scss';

const EstadisticasDocentes = () => {
	return (
		<div className='contenedorEstDocente'>
			<TituloDes
				titulo='ESTADÍSTICAS'
				desc='Aquí podrás consultar diversas estadísticas...'
			></TituloDes>
			<ProfeEstadisticas></ProfeEstadisticas>
		</div>
	);
};

export default EstadisticasDocentes;

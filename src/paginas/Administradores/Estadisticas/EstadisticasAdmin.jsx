import React from 'react';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import AdminEstadisticas from '../../../componentes/Estadisticas/AdminEstadisticas/AdminEstadisticas';
import './EstadisticasAdmin.scss';

const EstadisticasAdmin = () => {
	return (
		<div className='contenedorEstAdmin'>
			<TituloDes
				titulo='ESTADÍSTICAS DE LA INSTITUCIÓN'
				desc='Consulta estadísticas de tu institución para obtener información detallada sobre el rendimiento académico y otros aspectos clave para tomar mejores decisiones.'
			></TituloDes>
			<AdminEstadisticas></AdminEstadisticas>
		</div>
	);
};

export default EstadisticasAdmin;

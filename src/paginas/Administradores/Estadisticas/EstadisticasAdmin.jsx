import React, { useState, useEffect } from 'react';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import AdminEstadisticas from '../../../componentes/Estadisticas/AdminEstadisticas/AdminEstadisticas';
import { useUser } from '../../../Contexts/UserContext';
import Celda from '../../../componentes/Celda/Celda';
import './EstadisticasAdmin.scss';

const EstadisticasAdmin = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();

	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaGrados = async () => {
			try {
				const response = await fetch(
					`${API_URL}cursos/institucion/${user.institucion.id_institucion}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					const errorData = await response.json(); // Obtiene respuesta del servidor
					throw new Error(`${errorData.message || response.status}`);
				}

				const data = await response.json(); // Espera la conversión a JSON
				data.sort((a, b) => {
					const [numA, subA] = a.nombre.split('-');
					const [numB, subB] = b.nombre.split('-');

					return (
						parseInt(numA) - parseInt(numB) ||
						subA.localeCompare(subB, 'es', { numeric: true })
					);
				});
				const nombresGrados = data.map((grado) => grado.nombre);
				console.log('Respuesta del servidor:', nombresGrados);
				setInfoPildoras(nombresGrados); // Guarda los datos en el estado
			} catch (error) {
				console.error(error);
			}
		};

		listaGrados();
	}, [API_URL, token, user.institucion.id_institucion]);

	const [filtroSeleccionado, setFiltroSeleccionado] = useState('Todos')

	return (
		<div className='contenedorEstAdmin'>
			<TituloDes
				titulo='ESTADÍSTICAS DE LA INSTITUCIÓN'
				desc='Consulta estadísticas de tu institución para obtener información detallada sobre el rendimiento académico y otros aspectos clave para tomar mejores decisiones.'
			></TituloDes>
			<div className='contenedorFiltros'>
				<Celda txt='Todos' onClick={() => setFiltroSeleccionado('Todos')} clase={filtroSeleccionado === 'Todos' ? 'activo' : ''}></Celda>
				{infoPildoras.length >= 1 && infoPildoras.map((grado, index) => <Celda key={index} txt={grado} onClick={() => setFiltroSeleccionado(grado)} clase={filtroSeleccionado === grado ? 'activo' : ''}></Celda>)}
			</div>
			<AdminEstadisticas gradoFiltro={filtroSeleccionado}></AdminEstadisticas>
		</div>
	);
};

export default EstadisticasAdmin;

import React, {useState, useEffect} from 'react';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import ProfeEstadisticas from '../../../componentes/Estadisticas/ProfeEstadisticas/ProfeEstadisticas';
import { useUser } from '../../../Contexts/UserContext';
import Celda from '../../../componentes/Celda/Celda';
import './EstadisticasDocentes.scss';

const EstadisticasDocentes = () => {

	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();
	

	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaCursos = async () => {
			try {
				const response = await fetch(
					`${API_URL}asignar/asignaciones/profesor/${user.id}/institucion/${user.institucion.id_institucion}`,
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
				if (data.length > 1) {
					data.sort((a, b) => a.materia?.localeCompare(b.materia || '') || 0);
				}

				const dataCompleta = data.map((item) => item.curso)

				dataCompleta.sort((a, b) => {
					const [numA, subA] = a.split('-');
					const [numB, subB] = b.split('-');

					return (
						parseInt(numA) - parseInt(numB) ||
						subA.localeCompare(subB, 'es', { numeric: true })
					);
				});

				console.log('Respuesta del servidor listaCursosProfe:', dataCompleta);
				setInfoPildoras(dataCompleta);
			} catch (error) {
				console.error(error);
			}
		};

		listaCursos();
	}, [API_URL, token,user.id, user.institucion.id_institucion]);

	const [filtroSeleccionado, setFiltroSeleccionado] = useState('Todos')
	
	return (
		<div className='contenedorEstDocente'>
			<TituloDes
				titulo='Estadísticas'
				desc='Aquí podrás consultar diversas estadísticas...'
			></TituloDes>
			<div className='contenedorFiltros'>
				<Celda txt='Todos' onClick={() => setFiltroSeleccionado('Todos')} clase={filtroSeleccionado === 'Todos' ? 'activo' : ''}></Celda>
				{infoPildoras.length >= 1 && infoPildoras.map((grado, index) => <Celda key={index} txt={grado} onClick={() => setFiltroSeleccionado(grado)} clase={filtroSeleccionado === grado ? 'activo' : ''}></Celda>)}
			</div>
			<ProfeEstadisticas gradoFiltro={filtroSeleccionado}></ProfeEstadisticas>
		</div>
	);
};

export default EstadisticasDocentes;

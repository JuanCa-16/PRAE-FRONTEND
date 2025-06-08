import React, { useEffect, useState } from 'react';
import { useUser } from '../../../Contexts/UserContext';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect';
import './ObservacionesEst.scss';

const ObservacionesEst = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();

	const [observacionesEst, setObservacionesEst] = useState([]);

	useEffect(() => {
		const listaObservaciones = async () => {
			try {
				const response = await fetch(`${API_URL}comentarios/estudiante/${user.id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json(); // Obtiene respuesta del servidor
					throw new Error(`${errorData.message || response.status}`);
				}

				const data = await response.json();
				setObservacionesEst(data);
				console.log('observaciones', data);
			} catch (error) {
				console.error('Error al traer observaciones', error);
			}
		};

		listaObservaciones();
	}, [API_URL, token, user.id]);

	///FILTROS
	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaCursos = async () => {
			try {
				const response = await fetch(
					`${API_URL}asignar/grado/${user.id_curso}/institucion/${user.institucion.id_institucion}`,
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

				console.log(data);

				const dataCompleta = data.map((item) => ({
					...item,
					nombre_completo: `${item.profesor_nombre} ${item.profesor_apellido}`,
				}));

				console.log('Respuesta del servidor lista cursos est:', dataCompleta);
				setInfoPildoras(dataCompleta);
			} catch (error) {
				console.error(error);
			}
		};

		listaCursos();
	}, [API_URL, token, user.id_curso, user.institucion.id_institucion]);

	//Elimina opciones duplicadas para el selector
	const profesUnicos = [...new Set(infoPildoras.map((item) => item.nombre_completo))];
	const [profeSeleccionado, setProfeSeleccionado] = useState('');

	// Función para limpiar los filtros
	const limpiarFiltros = () => {
		setProfeSeleccionado('');
	};

	const observacionesFiltradas = observacionesEst.filter(
		(item) =>
			profeSeleccionado === '' ||
			item.nombre_docente + ' ' + item.apellido_docente === profeSeleccionado
	);

	return (
		<div className='contenedorObservacionesEst'>
			<TituloDes
				titulo='Mis Observaciones'
				desc='Lee las observaciones que los docentes han realizado sobre tu desempeño académico. Estas te ayudarán a conocer tus fortalezas y tus áreas a mejorar.'
			/>
			<div className='observaciones'>
				<div className='filtros'>
					<CustomSelect
						opciones={profesUnicos}
						valorSeleccionado={profeSeleccionado}
						setValorSeleccionado={setProfeSeleccionado}
						titulo='Profesores'
						placeholder='Seleccione un profesor'
					/>
					<button onClick={limpiarFiltros}>Limpiar</button>
				</div>
				{observacionesFiltradas.length > 0 ? (
					<>
						{observacionesFiltradas.map((observacion, index) => {
							// Convertir fecha
							const fechaFormateada = new Date(
								observacion.fecha
							).toLocaleDateString('es-CO', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							});

							return (
								<p
									className='fondo'
									key={index}
								>
									<strong className='fuerte'>Docente:</strong>{' '}
									{observacion.nombre_docente +
										' ' +
										observacion.apellido_docente}
									<br />
									<strong className='fuerte'>
										{fechaFormateada}:
									</strong>{' '}
									{observacion.comentario}
								</p>
							);
						})}
					</>
				) : (
					<p className=''>Sin Observaciones</p>
				)}
			</div>
		</div>
	);
};

export default ObservacionesEst;

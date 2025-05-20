import React, { useState, useEffect } from 'react';
import { useUser } from '../../Contexts/UserContext';
import PildoraTitulo from '../PildoraTitulo/PildoraTitulo';
import PildoraMateriaGrado from '../PildoraMateriaGrado/PildoraMateriaGrado';
import Celda from '../Celda/Celda';
import Line from '../Line/Line';
import { playSound } from 'react-sounds'; 
import './TableEst.scss';

/**
 * Componente TableEst que muestra una tabla con la información de las actividades y notas de un estudiante en una materia específica.
 * Permite expandir cada período para ver las actividades, sus notas y los pesos correspondientes.
 * 
 * @component
 * 
 * @param {Object} infoMateria - Información sobre la materia, incluyendo el ID, nombre, color, y el profesor.
 * @param {string} idEst - El ID del estudiante para obtener sus actividades y notas.
 * 
 * @returns {JSX.Element} Una tabla con las actividades, las notas y los pesos correspondientes a cada actividad del estudiante en la materia.
 */

const TableEst = ({ infoMateria, idEst }) => {
	//Informacion de la tabla traer info del BACK
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();

	const [info, setInfo] = useState([]);

	useEffect(() => {
		const notasMateriaEstudiante = async () => {
			try {
				const response = await fetch(
					`${API_URL}calificacion/materia/${infoMateria.id_materia}/estudiante/${idEst}/docente/${infoMateria.profesor_documento}/institucion/${user.institucion.id_institucion}`,
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

				const data = await response.json();
				console.log('info', data);
				setInfo(data);
			} catch (error) {
				console.error(error);
			}
		};

		notasMateriaEstudiante();
	}, [
		API_URL,
		infoMateria.id_materia,
		idEst,
		infoMateria.profesor_documento,
		token,
		user.institucion.id_institucion,
	]);

	const [expandir, setExpandir] = useState({});
	const [primerClick, setPrimerClick] = useState(false);

	const handlePrimerClick = (index) => {
		if (!primerClick) {
			setPrimerClick(true); // Establecer que el primer clic ha ocurrido
			setExpandir((prevState) => ({
				...prevState,
				[index]: !prevState[index], // Si es true, se pone false, y viceversa
			}));
		} else {
			setExpandir((prevState) => ({
				...prevState,
				[index]: !prevState[index], // Si es true, se pone false, y viceversa
			}));
		}

		playSound('ui/radio_select');
	};

	return (
		<div className='contenedorVistaMateria'>
			<div className='contenedor'>
				<PildoraTitulo
					nota={info.promedio_general ? info.promedio_general.promedio_general : '-'}
					materia={infoMateria.materia}
					nombre={infoMateria.nombre_completo}
					color={infoMateria.color}
					grado={infoMateria.curso}
				></PildoraTitulo>
				<Line></Line>
				{info.actividades ? (
					Object.keys(info.actividades).length > 0 ? (
						Object.entries(info.actividades).map(([key, periodo]) => (
							<div
								className='grupoNotas'
								key={key}
							>
								<PildoraMateriaGrado
									texto={periodo.nombre.toUpperCase() +
									':\u00A0\u00A0\u00A0' +
									(periodo.valor_neto ?? '0') +
									'%'}
									color={infoMateria.color}
									onClick={() => handlePrimerClick(key)}
								></PildoraMateriaGrado>
								<div
									className={`contenedorTable ${
										primerClick
											? expandir[key]
												? 'expandir'
												: 'noExpandir'
											: 'noMostrar'
									}`}
								>
									<PildoraTitulo
										nota={periodo.promedio_periodo ? periodo.promedio_periodo  : '-'}
										materia={infoMateria.materia}
										nombre={infoMateria.nombre_completo}
										color={infoMateria.color}
										grado={infoMateria.curso}
									></PildoraTitulo>
									{periodo.actividades.length > 0 ? (
										<div className='tabla'>
											<div className='col 1'>
												<Celda
													color={
														infoMateria.color
													}
													txt='Actividad'
													tipo='titulo'
													rol='NoVer'
												></Celda>
												{periodo.actividades.map(
													(
														item,
														index
													) => (
														<Celda
															color={
																infoMateria.color
															}
															key={
																index
															}
															tipo='titulo2'
															txt={
																item.actividad
															}
															rol='NoVer'
														></Celda>
													)
												)}
											</div>
											<div className='col 2'>
												<Celda
													color={
														infoMateria.color
													}
													txt='Notas'
													tipo='titulo'
													rol='NoVer'
												></Celda>
												{periodo.actividades.map(
													(
														item,
														index
													) => (
														<Celda
															color={
																infoMateria.color
															}
															key={
																index
															}
															tipo='normal'
															txt={
																item.nota
															}
															rol='NoVer'
														></Celda>
													)
												)}
											</div>
											<div className='col 3'>
												<Celda
													color={
														infoMateria.color
													}
													txt='Peso'
													tipo='titulo'
													rol='NoVer'
												></Celda>
												{periodo.actividades.map(
													(
														item,
														index
													) => (
														<Celda
															color={
																infoMateria.color
															}
															key={
																index
															}
															tipo='normal'
															txt={
																item.peso +
																'%'
															}
															rol='NoVer'
														></Celda>
													)
												)}
											</div>
										</div>
									) : (
										<p className='tabla'>
											No hay actividades asignadas
										</p>
									)}
								</div>
								<Line></Line>
							</div>
						))
					) : (
						<div>Sin Periodos</div>
					)
				) : (
					<div>Sin datos</div>
				)}
			</div>
		</div>
	);
};

export default TableEst;

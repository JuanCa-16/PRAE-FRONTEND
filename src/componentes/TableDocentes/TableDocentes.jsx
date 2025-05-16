import React, { useState, useEffect } from 'react';
import { useUser } from '../../Contexts/UserContext';
import PildoraMateriaGrado from '../PildoraMateriaGrado/PildoraMateriaGrado';
import InputContainer from '../Input/InputContainer';
import PildoraTitulo from '../PildoraTitulo/PildoraTitulo';
import Celda from '../Celda/Celda';
import Modal from '../Modal/Modal';
import Alerta from '../Alerta/Alerta';
import Line from '../Line/Line';
import './TableDocentes.scss';

/**
 * Componente TableDocentes que renderiza una tabla interactiva con la información de los estudiantes, actividades y notas de un curso asignado a un docente.
 * Muestra las actividades de los estudiantes, permite agregar nuevas actividades y editar las notas de los estudiantes.
 *
 * @component
 *
 * @param {Object} infoCurso - Información sobre el curso, incluyendo el ID de la materia, curso y nombre.
 * @param {string} infoDocente - El ID del docente para obtener sus actividades y notas.
 *
 * @returns {JSX.Element} Una tabla con las actividades, estudiantes y sus notas, con opciones para editar y agregar actividades.
 */

const TableDocentes = ({ infoCurso, infoDocente }) => {
	function capitalizeWords(str) {
		return str
			.split(' ') // Divide en palabras
			.map((word) =>
				word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
			)
			.join(' ');
	}

	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user, bloqueoDemo } = useUser();

	const [info, setInfo] = useState([]);
	const [infoNota, setInfoNota] = useState([]);

	const [reload, setReload] = useState(false);

	const [cargando, setCargando] = useState(false);

	const [configurado, setConfigurado] = useState(true);

	useEffect(() => {
		const infoPeriodos = async () => {
			try {
				const response = await fetch(`${API_URL}periodosAcademicos/actual`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`${errorData.error || response.status}`);
				}

				const getPeriodos = await response.json();
				console.log(getPeriodos);
				const getPeriodosBloqueo = getPeriodos[0].bloqueado;

				console.log('Respuesta del servidor periodos:', getPeriodosBloqueo);
				setConfigurado(getPeriodosBloqueo);
			} catch (error) {
				console.error(error);
			}
		};

		infoPeriodos();
	}, [API_URL, token]);

	useEffect(() => {
		const notasCursoDocente = async () => {
			try {
				const response = await fetch(
					`${API_URL}calificacion/materia/${infoCurso.id_materia}/curso/${infoCurso.id_curso}/docente/${infoDocente}/institucion/${user.institucion.id_institucion}`,
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
				console.log('AAAAAA', data);
				const listaData = Object.values(data);
				console.log('infoooo', listaData);

				if (listaData.length > 0) {
					setInfo(listaData);
				}
			} catch (error) {
				console.error(error);
				Alerta.error(`Error al obtener notas: ${error.message}`, true);
			}
		};

		notasCursoDocente();
	}, [
		reload,
		API_URL,
		token,
		user.institucion.id_institucion,
		infoCurso.id_curso,
		infoCurso.id_materia,
		infoDocente,
	]);

	useEffect(() => {
		const promedioCurso = async () => {
			try {
				const response = await fetch(
					`${API_URL}calificacion/promedio/materia/${infoCurso.id_materia}/curso/${infoCurso.id_curso}`,
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
					console.log(errorData);
					throw new Error(`${errorData.error || response.status}`);
				}

				const data = await response.json();
				console.log('fff', data);
				setInfoNota(data.promedio);
			} catch (error) {
				Alerta.error(`Error al obtener nota promedio: ${error.message}`, true);
			}
		};

		promedioCurso();
	}, [reload, API_URL, token, user.institucion.id_institucion, infoCurso.id_curso, infoCurso.id_materia]);

	//CREAR ACTIVIDAD BACK
	const [nombreAct, setNonombreAct] = useState({
		actividad: '',
		peso: '',
	});

	//captar info de los inputs
	const handleChange = (titulo, value) => {
		setNonombreAct({
			...nombreAct,
			[titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
		});
	};

	const handleSubmit = async (e, totalPesoPorcentaje) => {
		e.preventDefault();

		const peso = parseFloat(nombreAct.peso);

		if (isNaN(peso) || peso < 0 || peso > 100) {
			Alerta.error('El peso debe ser un número entre 0 y 100.');
			return;
		}

		if (totalPesoPorcentaje + peso > 100) {
			Alerta.error('Excederas el 100%');
			return;
		}

		if (!bloqueoDemo) {
			try {
				setCargando(true);
				const response = await fetch(`${API_URL}actividad/crear`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						nombre: nombreAct.actividad,
						peso: nombreAct.peso,
						id_materia: infoCurso.id_materia,
						id_docente: infoDocente,
						id_curso: infoCurso.id_curso,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json(); // Obtiene respuesta del servidor
					throw new Error(`${errorData.message || response.status}`);
				}

				Alerta.success('Actividad realizada correctamente');
				setCargando(false);
				setReload(!reload);
				console.log(nombreAct);
				setNonombreAct({
					actividad: '',
					peso: '',
				});
			} catch (error) {
				console.error('Error al crear actividad', error);
				Alerta.error(error.message);
				setCargando(false);
			}
		}
	};

	///MODALES

	const [modalIndexAbierto, setModalIndexAbierto] = useState({
		periodoIndex: null,
		actividadIndex: null,
	}); // Guardar el índice de la actividad que tiene el modal abierto

	const openModalAct = (periodoIndex, actividadIndex) => setModalIndexAbierto({ periodoIndex, actividadIndex }); // Establecer el índice de la actividad que se abre
	const closeModalAct = () => setModalIndexAbierto({ periodoIndex: null, actividadIndex: null }); // Cerrar el modal

	// Cambiar el estado modalIndexNota para que sea un objeto con los índices de actividad y estudiante
	const [modalIndexNota, setModalIndexNota] = useState({
		periodoIndex: null,
		actividadIndex: null,
		estudianteIndex: null,
	});

	const openModalNota = (periodoIndex, actividadIndex, estudianteIndex) => {
		setModalIndexNota({ periodoIndex, actividadIndex, estudianteIndex });
	};

	const closeModalNota = () => {
		setModalIndexNota({ periodoIndex: null, actividadIndex: null, estudianteIndex: null });
	};

	const handleReload = () => {
		setReload((prev) => !prev);
	};

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
	};

	return configurado ? (
		<div className='contenedorNotas'>
			{console.log('infooo', infoNota)}
			{/* PILDORA CON PROMEDIO TOTAL DEL AÑO Y PERIODOS */}
			<PildoraTitulo
				nota={infoNota ? infoNota.promedioGeneral : '-'}
				materia={infoCurso.materia}
				nombre={infoCurso.nombre_completo}
				color={infoCurso.color}
				grado={infoCurso.curso}
			></PildoraTitulo>
			<Line></Line>

			{/* las 4 tablas por periodos */}
			{info.length > 0 && info[0].estudiantes.length > 0 ? (
				info.map((periodo, idx) => {
					const listadoEst = periodo.estudiantes.map(
						(item) => ` ${item.apellido} ${item.nombre}`
					);
					const soloApellidos = periodo.estudiantes.map((item) => ` ${item.apellido}`);
					const soloNombre = periodo.estudiantes.map((item) => ` ${item.nombre}`);
					const actividadesUnicas = periodo.estudiantes
						.map((est) =>
							est.actividades.map((act) => [
								{
									actividad: act.actividad,
									peso: act.peso,
									idAct: act.id_actividad,
									idNota: act.id_calificacion,
								},
							])
						)[0]
						.flat()
						.sort((a, b) => a.actividad.localeCompare(b.actividad));

					const totalPorcentajes = periodo.estudiantes
						.map((est) => est.actividades.map((act) => [{ peso: act.peso }]))[0]
						.flat()
						.reduce((sum, actividad) => sum + actividad.peso, 0); // Suma los pesos

					const promedioBase =
						infoNota.promediosPorPeriodo.filter(
							(p) => p.periodo === periodo.nombre
						)[0] || null;
					//console.log('DDDDD', promedioBase);
					return (
						<div
							className='grupo'
							key={idx}
						>
							{/* titulo Periodo y si promedio con % */}
							<PildoraMateriaGrado
								texto={
									periodo.nombre.toUpperCase() +
									' -- ' +
									(promedioBase?.promedioPonderado ?? '0') +
									'%'
								}
								color={infoCurso.color}
								onClick={() => handlePrimerClick(idx)}
							></PildoraMateriaGrado>

							{/* tabla */}
							<div
								className={`contenedor ${
									primerClick
										? expandir[idx]
											? 'expandir'
											: 'noExpandir'
										: 'noMostrar'
								}`}
							>
								{/* titulo tabla con pormedio de ese periodo  */}
								<PildoraTitulo
									nota={
										promedioBase
											? promedioBase.promedioBase
											: '-'
									}
									materia={infoCurso.materia}
									nombre={infoCurso.nombre_completo}
									color={infoCurso.color}
									grado={infoCurso.curso}
								></PildoraTitulo>

								{/* tabla */}
								<div className='tabla'>
									{/* listado */}
									<div className='col colListado'>
										<Celda
											txt='Listado'
											color={infoCurso.color}
											tipo='titulo'
											rol='NoVer'
										></Celda>
										{listadoEst.map((nombre, index) => (
											<Celda
												key={index}
												tipo='titulo2'
												color={infoCurso.color}
												txt={nombre}
												rol='NoVer'
											></Celda>
										))}
									</div>

									{/* actividades y notas  */}
									<div className={`notas ${infoCurso.color}`}>
										{actividadesUnicas.map(
											(actividad, i) => (
												<div
													key={i}
													className='col nota'
												>
													<Celda
														color={
															infoCurso.color
														}
														txt={
															actividad.actividad +
															' - ' +
															actividad.peso +
															' % '
														}
														tipo='titulo'
														onClick={() =>
															openModalAct(
																idx,
																i
															)
														}
													/>
													{/* Modal específico para la actividad seleccionada */}
													{modalIndexAbierto.periodoIndex ===
														idx &&
														modalIndexAbierto.actividadIndex ===
															i && (
															<Modal
																isOpen={
																	true
																}
																closeModal={
																	closeModalAct
																}
																recargar={
																	handleReload
																}
																tipo='actividad'
																modalTitulo='EDITAR ACTIVIDAD'
																modalTexto='Edita los parametros de tu actividad'
																valorAct={
																	actividad.actividad
																}
																ValorPeso={
																	actividad.peso
																}
																extraData={{
																	materia: infoCurso.materia,
																	profesor: infoCurso.nombre_completo,
																	grado: infoCurso.curso,
																	id_act: actividad.idAct,
																	id_docente: infoDocente,
																	pesoTotalActual:
																		totalPorcentajes,
																}}
															/>
														)}
													{periodo.estudiantes.map(
														(
															estudiante,
															j
														) => {
															const actividadEncontrada =
																estudiante.actividades.find(
																	(
																		act
																	) =>
																		act.id_actividad ===
																		actividad.idAct
																);

															return (
																<div
																	className='full'
																	key={
																		j
																	}
																>
																	<Celda
																		tipo='normal'
																		color={
																			infoCurso.color
																		}
																		txt={
																			actividadEncontrada
																				? actividadEncontrada.nota
																				: 'N/A'
																		}
																		onClick={() =>
																			openModalNota(
																				idx,
																				i,
																				j
																			)
																		} // Ahora pasa ambos índices
																	/>

																	{/* Modal de nota específico para la combinación de actividad y estudiante */}
																	{modalIndexNota.periodoIndex ===
																		idx &&
																		modalIndexNota.actividadIndex ===
																			i &&
																		modalIndexNota.estudianteIndex ===
																			j && (
																			<Modal
																				isOpen={
																					true
																				}
																				closeModal={
																					closeModalNota
																				}
																				tipo='nota'
																				valorNota={
																					actividadEncontrada
																						? actividadEncontrada.nota
																						: 'N/A'
																				}
																				modalTitulo='EDITAR NOTA'
																				modalTexto='Edita la nota de esta actividad'
																				recargar={
																					handleReload
																				}
																				extraData={{
																					notaOriginal:
																						actividadEncontrada.nota,
																					id_nota: actividadEncontrada.id_calificacion,
																					materia: infoCurso.materia,
																					profesor: infoCurso.nombre_completo,
																					grado: infoCurso.curso,
																					nombreEst: soloNombre[
																						j
																					],
																					apellidosEst:
																						soloApellidos[
																							j
																						],
																					actividad: actividadesUnicas[
																						i
																					][0],
																					id_actividad:
																						actividad.idAct,
																					id_estudiante:
																						estudiante.documento_identidad,
																				}}
																			/>
																		)}
																</div>
															);
														}
													)}
												</div>
											)
										)}
									</div>
								</div>
								{periodo.estado && (
									<form
										onSubmit={(e) =>
											handleSubmit(
												e,
												totalPorcentajes
											)
										}
										className='contenedorAct'
									>
										<div className='titulo'>
											<p className='bold'>
												CREAR ACTIVIDAD:
											</p>
											<p>
												Total de porcentaje
												ocupado:{' '}
												{totalPorcentajes}%,
												disponible para asignar:{' '}
												{100 - totalPorcentajes}
												%
											</p>
											{totalPorcentajes === 100 && (
												<p className='alertaTxt'>
													Edita el peso de
													actividades para
													poder asignar
													más.
												</p>
											)}
										</div>
										<div className='crearAct'>
											<div className='campos'>
												<InputContainer
													titulo='Nombre'
													placeholder='Nombre de la actividad'
													inputType='text'
													value={
														nombreAct.actividad
													}
													onChange={(
														value
													) =>
														handleChange(
															'actividad',
															capitalizeWords(
																value
															)
														)
													} // Pasamos la función que actualizará el estado
													required={true} // Hacemos que el campo sea obligatorio
												/>
												<InputContainer
													titulo='Peso'
													placeholder='Valor entre 0 - 100'
													inputType='text'
													value={
														nombreAct.peso
													} // El valor del input viene del estado del componente padre
													onChange={(
														value
													) =>
														handleChange(
															'peso',
															value
														)
													} // Pasamos la función que actualizará el estado
													required={true} // Hacemos que el campo sea obligatorio
												/>
												<button
													type='submit'
													disabled={
														bloqueoDemo ||
														cargando ||
														totalPorcentajes ===
															100
													}
												>
													{cargando
														? 'cargando...'
														: totalPorcentajes ===
														  100
														? 'Sin Espacio'
														: 'Crear'}{' '}
												</button>
											</div>
										</div>
									</form>
								)}
							</div>
							<Line></Line>
						</div>
					);
				})
			) : info.length <= 0 ? (
				<p>Actualmente no hay periodos {info.length}</p>
			) : (
				<p>Todavia no hay estudiantes</p>
			)}
		</div>
	) : (
		<p className='lato'>Primero debes configurar PERIODOS.</p>
	);
};

export default TableDocentes;

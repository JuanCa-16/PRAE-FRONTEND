import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../../Contexts/UserContext';
import PildoraPeriodos from '../../../componentes/PildoraPeriodos/PildoraPeriodos';
import Alerta from '../../../componentes/Alerta/Alerta';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import Modal from '../../../componentes/Modal/Modal';
import Masonry from 'react-masonry-css';
import './Periodos.scss';

const Periodos = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { bloqueoDemo } = useUser();
	const [modalConfirmacion, setModalConfirmacion] = useState(false);
	const [reload, setReload] = useState(false);

	const initialPeriodosData = useRef({
		periodo1: { nombre: 'PERIODO 1', peso: '', fecha_inicio: '', fecha_fin: '', bloqueado: false },
		periodo2: { nombre: 'PERIODO 2', peso: '', fecha_inicio: '', fecha_fin: '', bloqueado: false },
		periodo3: { nombre: 'PERIODO 3', peso: '', fecha_inicio: '', fecha_fin: '', bloqueado: false },
		periodo4: { nombre: 'PERIODO 4', peso: '', fecha_inicio: '', fecha_fin: '', bloqueado: false },
	});

	const [formPeriodos, setFormPeriodos] = useState(initialPeriodosData.current);

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
				const getPeriodosObj = {
					periodo1: getPeriodos[0],
					periodo2: getPeriodos[1],
					periodo3: getPeriodos[2],
					periodo4: getPeriodos[3],
				};

				console.log('Respuesta del servidor periodos:', getPeriodosObj);

				initialPeriodosData.current = getPeriodosObj;

				setFormPeriodos(getPeriodosObj);
			} catch (error) {
				console.error(error);
			}
		};

		infoPeriodos();
	}, [API_URL, token,reload]);

	//Recibe el periodo ty los 2 parametros del hijo que es nombre del input odificado y su valor
	const handleChange = (periodo, periodoKey, value) => {
		setFormPeriodos((prev) => ({
			...prev,
			[periodo]: {
				...prev[periodo],
				[periodoKey]: value,
			},
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const totalPeso = Object.values(formPeriodos).reduce((acum, periodo) => {
			const pesoNum = Number(periodo.peso);
			// Si no es un número válido, lo consideramos 0
			return acum + (isNaN(pesoNum) ? 0 : pesoNum);
		}, 0);

		if (totalPeso !== 100) {
			Alerta.error('La suma de los pesos debe ser 100%');
			return;
		}

		if (!bloqueoDemo) {
			try {
				await Promise.all(
					Object.entries(formPeriodos).map(async ([key, periodo]) => {
						const response = await fetch(
							`${API_URL}periodosAcademicos/${periodo.id_periodo}`,
							{
								method: 'PUT',
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${token}`,
								},
								body: JSON.stringify(periodo),
							}
						);

						if (!response.ok) {
							const errorData = await response.json();
							throw new Error(
								`Error al guardar ${periodo.peso}: ${
									errorData.message || response.status
								}`
							);
						}
					})
				);
				Alerta.success('Guardado Exitosamente');
				setReload(!reload);
			} catch (error) {
				Alerta.error(`Error al guardar: ${error.message}`);
				console.error(error);
			}
		}
		setModalConfirmacion(false);
		console.log(formPeriodos); // Aquí tienes los 9 inputs agrupados
	};

	const isPeriodoCompleto = (periodo) => {
		return periodo.fecha_inicio && periodo.fecha_fin;
	};

	// Validar si periodos anteriores están completos
	const canEditPeriodo2 = isPeriodoCompleto(formPeriodos.periodo1);
	const canEditPeriodo3 = canEditPeriodo2 && isPeriodoCompleto(formPeriodos.periodo2);
	const canEditPeriodo4 = canEditPeriodo3 && isPeriodoCompleto(formPeriodos.periodo3);

	// Función para calcular el día siguiente
	const obtenerDiaSiguiente = (fechaStr) => {
		if (!fechaStr) return '';
		const fecha = new Date(fechaStr);
		fecha.setDate(fecha.getDate() + 1);
		// Formatear a YYYY-MM-DD
		return fecha.toISOString().split('T')[0];
	};

	const minInicioPeriodo2 = obtenerDiaSiguiente(formPeriodos.periodo1.fecha_fin);
	const minInicioPeriodo3 = obtenerDiaSiguiente(formPeriodos.periodo2.fecha_fin);
	const minInicioPeriodo4 = obtenerDiaSiguiente(formPeriodos.periodo3.fecha_fin);

	const breakpoints = {
		default: 4,
		470: 1,
		570: 2,
		700: 2,
		870: 1,
		950: 2,
		1400: 2,
	};

	return (
		<form
			className='contenedorFormularioPeriodos'
			onSubmit={handleSubmit}
		>
			<TituloDes
				titulo='PERIODOS'
				desc='Maneja los periodos del año academico de tu institucion, Acepta la plantilla o personalizalo. OJO solo se puede una vez.'
			></TituloDes>
			<div className='contenedorPeriodos'>
				<Masonry
					className='layautPeriodos'
					columnClassName='layautPeriodosColumn'
					breakpointCols={breakpoints}
				>
					<PildoraPeriodos
						titulo='PERIODO 1'
						valores={formPeriodos.periodo1}
						onChange={({ periodoKey, value }) =>
							handleChange('periodo1', periodoKey, value)
						}
						color='azul'
						editable={true}
					></PildoraPeriodos>
					<PildoraPeriodos
						titulo='PERIODO 2'
						valores={formPeriodos.periodo2}
						onChange={({ periodoKey, value }) =>
							handleChange('periodo2', periodoKey, value)
						}
						color='morado'
						editable={canEditPeriodo2}
						minInicio={minInicioPeriodo2}
					></PildoraPeriodos>
					<PildoraPeriodos
						titulo='PERIODO 3'
						valores={formPeriodos.periodo3}
						onChange={({ periodoKey, value }) =>
							handleChange('periodo3', periodoKey, value)
						}
						color='amarillo'
						editable={canEditPeriodo3}
						minInicio={minInicioPeriodo3}
					></PildoraPeriodos>
					<PildoraPeriodos
						titulo='PERIODO 4'
						valores={formPeriodos.periodo4}
						onChange={({ periodoKey, value }) =>
							handleChange('periodo4', periodoKey, value)
						}
						color='azul'
						editable={canEditPeriodo4}
						minInicio={minInicioPeriodo4}
					></PildoraPeriodos>
				</Masonry>
			</div>
			<button
				type='button'
				onClick={() => setModalConfirmacion(true)}
			>
				Guardar
			</button>
			{modalConfirmacion && (
				<Modal
					isOpen={true}
					closeModal={() => setModalConfirmacion(false)}
					tipo='eliminar'
					modalTexto={formPeriodos.periodo1.bloqueado? 'Ya realizaste los cambios permitidos' : 'Estas seguro de estos ajustes? No se podra volver a editar.'}
					modalTitulo={formPeriodos.periodo1.bloqueado? 'CAMBIOS YA REALIZADOS': 'CONFIRMAR PERIODOS'}
				>
					{console.log(formPeriodos)}
					<button disabled={bloqueoDemo || formPeriodos.periodo1.bloqueado} type='submit'>Aceptar y Enviar</button>
				</Modal>
			)}
		</form>
	);
};

export default Periodos;

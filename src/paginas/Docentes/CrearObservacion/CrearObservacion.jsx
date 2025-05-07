import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext';
import Alerta from '../../../componentes/Alerta/Alerta';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import Modal from '../../../componentes/Modal/Modal';
import './CrearObservacion.scss';

const CrearObservacion = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const location = useLocation();
	const { est } = location.state || {};
	const [cargando, setCargando] = useState(false);

	const { user } = useUser();

	const [reload, setReload] = useState(false);

	//Datos inciales a mostrar
	const [formData, setFormData] = useState({
		observacion: '',
	});

	const [modalObsIndex, setModalObsIndex] = useState(null);
	const [obsSeleccionada, setObsSeleccionada] = useState(null);

	const openModalObs = (index) => {
		setModalObsIndex(index);
		setObsSeleccionada(observacionesEst[index]);
	};

	const closeModalObs = () => {
		setModalObsIndex(null);
		setObsSeleccionada(null);
	};

	const handleReload = () => setReload((r) => !r);

	//Actualizar inputs
	const handleChange = (titulo, value) => {
		setFormData({
			...formData,
			[titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
		});
	};

	//Envio del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setCargando(true);
			const response = await fetch(`${API_URL}comentarios/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					comentario: formData.observacion,
					documento_profe: user.id,
					documento_estudiante: est.estudiante_id,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json(); // Obtiene respuesta del servidor
				throw new Error(`${errorData.message || response.status}`);
			}
			console.log('Datos enviados:', formData);
			Alerta.success('Observación realizada correctamente');
			setCargando(false);
			setReload(!reload);
			setFormData({ observacion: '' });
		} catch (error) {
			console.error('Error al crear observacion', error);
			setCargando(false);
			Alerta.error(error.message);
		}
	};

	const [observacionesEst, setObservacionesEst] = useState([]);

	useEffect(() => {
		const listaObservaciones = async () => {
			try {
				const response = await fetch(
					`${API_URL}comentarios/profesor/${user.id}/estudiante/${est.estudiante_id}`,
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
				setObservacionesEst(data);
				console.log(data);
			} catch (error) {
				console.error('Error al traer observaciones', error);
				Alerta.error(error.message);
			}
		};

		listaObservaciones();
	}, [reload, API_URL, est.estudiante_id, user.id, token]);

	return (
		<div className='contenedorCrearObser'>
			<TituloDes
				titulo='REALIZAR OBSERVACIÓN A UN ESTUDIANTE'
				desc='Documenta y guarda una observación académica o disciplinaria a un estudiante.'
			/>

			<form
				onSubmit={handleSubmit}
				className='formulario'
			>
				<label
					htmlFor='observacionDocente'
					className='label'
				>
					Ingresar observación:
				</label>
				<textarea
					id='observacionDocente'
					placeholder='Escribe una observación...'
					value={formData.observacion}
					onChange={(e) => handleChange('observacion', e.target.value)}
				/>
				<button
					type='submit'
					className='btn-guardar'
					disabled={cargando}
				>
					Guardar Cambios
				</button>
			</form>

			<div className='observaciones'>
				<h4>Observaciones</h4>
				{observacionesEst.length > 0 ? (
					observacionesEst.map((obs, index) => {
						const fecha = new Date(obs.fecha).toLocaleDateString('es-CO', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						});
						return (
							<div
								key={index}
								className='observacion-item clicable-observacion'
							>
								<span className='fecha'>{fecha}</span>
								<p className='texto-observacion'>{obs.comentario}</p>

								<button
									type='button'
									onClick={() => openModalObs(index)} // Abre el modal cuando se hace clic en el botón
									className='btn-editar'
								>
									Editar
								</button>

								{modalObsIndex === index && (
									<Modal
										isOpen={true}
										closeModal={closeModalObs}
										tipo='observacion'
										modalTitulo='EDITAR OBSERVACIÓN'
										modalTexto='Edita el contenido de la observación'
										valorObs={
											obsSeleccionada?.comentario ||
											''
										}
										recargar={handleReload}
										extraData={{
											id_observacion:
												obsSeleccionada?.id_comentario,
										}}
									/>
								)}
							</div>
						);
					})
				) : (
					<p className='sin-observaciones'>
						El estudiante todavía no tiene observaciones.
					</p>
				)}
			</div>
		</div>
	);
};

export default CrearObservacion;

import React, { useState } from 'react';
import { useTheme } from '../../Contexts/UserContext';
import InputContainer from '../Input/InputContainer';
import Alerta from '../Alerta/Alerta';
import './Modal.scss';

const Modal = ({
	isOpen,
	recargar,
	closeModal,
	tipo,
	modalTitulo = 'Eliminar',
	modalTexto = 'Estas seguro de eliminar...',
	valorAct = '',
	ValorPeso = '',
	valorNota = '',
	valorObs = '',
	extraData = {},
	children,
}) => {
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

	const { theme } = useTheme();
	//La logica del modal eliminar se le hace es al boton que llega por children.

	//Envio datos modal actividad.
	const [step, setStep] = useState('form');
	const [nombreAct, setNonombreAct] = useState(valorAct); // Estado para manejar el valor de la actividad
	const [pesoAct, setPesoAct] = useState(ValorPeso); // Estado para manejar el valor del peso
	const [observacionEditada, setObservacionEditada] = useState(valorObs || '');
	const [cargando, setCargando] = useState(false); // Estado para manejar si la observación está siendo editada

	const handleEliminarObservacion = async () => {
		try {
			const response = await fetch(`${API_URL}comentarios/${extraData.id_observacion}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Error al eliminar observación');
			}

			Alerta.success('Observación eliminada');
			closeModal();
			recargar();
		} catch (error) {
			console.error('Error al eliminar observación:', error);
			Alerta.error(error.message);
		}
	};

	const handleNombreChange = (newNombre) => {
		setNonombreAct(capitalizeWords(newNombre)); // Actualiza el estado 'email'
	};

	const handlePesoChange = (newPeso) => {
		setPesoAct(newPeso); // Actualiza el estado 'email'
	};

	const handleSubmit1 = async (e) => {
		e.preventDefault();
		// Crear el objeto JSON con los valores de los inputs
		const formData = {
			...extraData,
			nombreAct: nombreAct,
			pesoAct: pesoAct,
		};

		console.log('Datos del formulario ACTIVIDAD:', JSON.stringify(formData));

		if (formData.pesoTotalActual + formData.pesoAct > 100) {
			Alerta.error('Excederas el 100%');
			return;
		}

		try {
			const response = await fetch(`${API_URL}actividad/actualizar/${formData.id_act}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					nombre: formData.nombreAct,
					peso: formData.pesoAct,
					id_docente: formData.id_docente,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json(); // Obtiene respuesta del servidor
				throw new Error(`${errorData.message || response.status}`);
			}

			Alerta.success('Actividad actualizada');
			closeModal();
			recargar();
		} catch (error) {
			console.error('Error al crear actividad', error);
			Alerta.error(error.message);
		}

		// Mostrar el objeto JSON en la consola (o enviarlo al servidor)

		// Aquí puedes agregar lógica para enviar el JSON a un servidor o hacer algo más con él
	};

	const abrirConfirmacion = () => setStep('confirm');
	const volverAlForm = () => setStep('form');

	//Envio datos modal notas
	const [nota, setNota] = useState(valorNota); // Estado para manejar el valor del email

	// Función para manejar el cambio en el campo del email
	const handleNotaChange = (newNota) => {
		setNota(newNota); // Actualiza el estado 'email' con el nuevo valor
	};

	const handleSubmit2 = async (e) => {
		e.preventDefault();
		// Crear el objeto JSON con los valores de los inputs
		// Validación: solo números entre 0 y 5, incluyendo decimales
		const notaNumerica = parseFloat(nota);
		if (isNaN(notaNumerica) || notaNumerica < 0 || notaNumerica > 5) {
			Alerta.error('La nota debe ser un número entre 0 y 5');
			return;
		}
		const formData = {
			...extraData,
			nota: nota,
		};

		if (formData.notaOriginal === '0') {
			try {
				setCargando(true);
				const response = await fetch(`${API_URL}calificacion/asignar`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						id_actividad: formData.id_actividad,
						id_estudiante: formData.id_estudiante,
						nota: formData.nota,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Error al registrar nota');
				}

				Alerta.success('Nota registrada correctamente');
				setCargando(false);
			} catch (error) {
				console.error('Error al guardar nota:', error);
				Alerta.error(error.message);
				setCargando(false);
			}
		} else {
			try {
				const response = await fetch(`${API_URL}calificacion/actualizar/${formData.id_nota}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						id_actividad: formData.id_actividad,
						id_estudiante: formData.id_estudiante,
						nota: formData.nota,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Error al editar nota');
				}

				Alerta.success('Nota registrada correctamente');
			} catch (error) {
				console.error('Error al guardar nota:', error);
				Alerta.error(error.message);
			}
		}

		// Mostrar el objeto JSON en la consola (o enviarlo al servidor)
		console.log('Datos del formulario NOTAS:', JSON.stringify(formData));
		closeModal();
		recargar();
		// Aquí puedes agregar lógica para enviar el JSON a un servidor o hacer algo más con él
	};

	const handleObservacionChange = (value) => {
		setObservacionEditada(value); // Cambia el estado
	};

	const handleSubmit3 = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${API_URL}comentarios/${extraData.id_observacion}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ comentario: observacionEditada }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || response.status);
			}

			Alerta.success('Observación actualizada correctamente');
			closeModal();
			recargar(); // Actualiza la lista de observaciones si quieres
		} catch (error) {
			console.error('Error al actualizar observación', error);
			Alerta.error(error.message);
		}
	};

	//MANEJO LOGICA MODAL
	if (!isOpen) return null; // No renderiza el modal si isOpen es false

	const handleClickOutside = (e) => {
		// Cerrar modal si se hace clic fuera del área del modal
		if (e.target.classList.contains('modal-overlay')) {
			closeModal();
		}
	};

	const handleEliminarAct = async () => {
		const formData = {
			...extraData,
			nombreAct: nombreAct,
			pesoAct: pesoAct,
		};

		console.log('Datos del formulario ELIMINAR:', JSON.stringify(formData));

		try {
			const response = await fetch(`${API_URL}actividad/eliminar/${formData.id_act}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json(); // Obtiene respuesta del servidor
				throw new Error(`${errorData.message || response.status}`);
			}

			Alerta.success('Actividad eliminada');

			closeModal();
			recargar();
		} catch (error) {
			console.error('Error al crear actividad', error);
			Alerta.error(error.message);
		}
	};

	return (
		<div
			className={`modal-overlay ${tipo} ${theme} ${step}`}
			onClick={handleClickOutside}
		>
			<div className={`modal-content ${theme}`}>
				{tipo === 'eliminar' ? (
					<div className='modalContenedor'>
						<div className='titulo'>
							<p className='bold'>{modalTitulo.toUpperCase()} </p>
						</div>
						<p className='lato textoEli'>{modalTexto} </p>
						{children}
					</div>
				) : tipo === 'actividad' ? (
					<>
						{step === 'form' ? (
							<div className='modalAct'>
								<div className='titulo'>
									<p className='bold'>{modalTitulo}</p>
								</div>
								<form
									onSubmit={handleSubmit1}
									className='crearAct'
								>
									<div className='campos'>
										<InputContainer
											titulo='Nombre Actividad'
											inputType='text'
											value={nombreAct} // El valor del input viene del estado del componente padre
											onChange={handleNombreChange} // Pasamos la función que actualizará el estado
											required={true} // Hacemos que el campo sea obligatorio
										/>
										<InputContainer
											titulo='Peso'
											placeholder='Nuevo Peso'
											inputType='number'
											min='0'
											max='5'
											step='0.01'
											value={pesoAct} // El valor del input viene del estado del componente padre
											onChange={handlePesoChange} // Pasamos la función que actualizará el estado
											required={true} // Hacemos que el campo sea obligatorio
										/>
										<button type='submit'>Editar</button>
										<button
											type='button'
											className='rojo'
											onClick={abrirConfirmacion}
										>
											Eliminar
										</button>
									</div>
								</form>
							</div>
						) : (
							<div className='modalContenedor'>
								<div className='titulo'>
									<p className='bold'> CONFIRMACIÓN </p>
								</div>
								<p className='lato textoEli'>
									Esta acción no se podra revertir.
								</p>
								<button
									type='button'
									className='rojo'
									onClick={() => handleEliminarAct()}
								>
									Si, Eliminar
								</button>
								<button
									type='button'
									onClick={volverAlForm}
								>
									Cancelar
								</button>
							</div>
						)}
					</>
				) : tipo === 'observacion' ? (
					step === 'form' ? (
						<div className='modalObservacion'>
							<div className='titulo'>
								<p className='bold'>{modalTitulo}</p>
							</div>
							<form
								onSubmit={handleSubmit3}
								className='crearObservacion'
							>
								<div className='campos'>
									<textarea
										titulo='Observación'
										placeholder='Escribe tu observación'
										inputType='text'
										value={observacionEditada} // Asegúrate de pasar el valor del estado aquí
										onChange={(e) =>
											handleObservacionChange(
												e.target.value
											)
										} // La función que actualizará el estado del componente principal
										required={true}
										className='campo-observacion'
									/>
									<div className='botones-acciones'>
										<button type='submit'>Editar</button>
										<button
											type='button'
											className='rojo'
											onClick={() =>
												setStep('confirm')
											}
										>
											Eliminar
										</button>
									</div>
								</div>
							</form>
						</div>
					) : (
						<div className='modalContenedor'>
							<div className='titulo'>
								<p className='bold'>CONFIRMACIÓN</p>
							</div>
							<p className='lato textoEli'>
								¿Deseas eliminar esta observación? Esta acción no se
								puede revertir.
							</p>
							<button
								type='button'
								className='rojo'
								onClick={handleEliminarObservacion}
							>
								Sí, Eliminar
							</button>
							<button
								type='button'
								onClick={() => setStep('form')}
							>
								Cancelar
							</button>
						</div>
					)
				) : (
					<div className='modalAct'>
						<div className='titulo'>
							<p className='bold'>{modalTitulo}</p>
						</div>
						<div className='crearAct'>
							<div className='campos'>
								<InputContainer
									titulo='Nota'
									placeholder='Nueva nota'
									inputType='text'
									value={nota} // El valor del input viene del estado del componente padre
									onChange={handleNotaChange} // Pasamos la función que actualizará el estado
									required={true} // Hacemos que el campo sea obligatorio
								/>
								<button
									onClick={handleSubmit2}
									disabled={cargando}
								>
									{cargando ? 'cargando...' : 'Ingresar'}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;

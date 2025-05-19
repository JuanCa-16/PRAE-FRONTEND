import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext.jsx';
import Alerta from '../../../componentes/Alerta/Alerta.jsx';
import CursosAsignadosDocente from '../../../componentes/CursosAsignadosDocente/CursosAsignadosDocente.jsx';
import InputContainer from '../../../componentes/Input/InputContainer.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import './VistaDocente.scss';

const VistaDocente = () => {
		
	const location = useLocation();
	const { profe } = location.state || {};

	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user, bloqueoDemo } = useUser();
	const [reload, setReload] = useState(false);
	const [cargando,setCargando] =useState(false)

	function capitalizeWords(str) {
		return str
			.split(' ') // Divide en palabras
			.map((word) =>
				word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
			)
			.join(' ');
	}

	// Estado inicial que se usará para comparar
	const initialFormData = useRef({
		apellidos: '',
		nombre: '',
		correo: '',
		doc: '',
		contrasena: '',
		area: '',
		materias: [], // Inicializado con un array vacío
	});

	const [formData, setFormData] = useState(initialFormData.current);

	useEffect(() => {
		const listaProfes = async () => {
			try {
				const response = await fetch(
					`${API_URL}usuario/profesor/${profe.documento_identidad}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`${errorData.error || response.status}`);
				}

				const profesorData = await response.json();

				console.log('Respuesta del servidor profe:', profesorData);

				initialFormData.current = {
					apellidos: profesorData.apellido,
					nombre: profesorData.nombre,
					correo: profesorData.correo,
					doc: profesorData.documento_identidad,
					contrasena: '',
					area: profesorData.area_ensenanza,
					materias: profesorData.materias.map((materia) => materia.id_materia),
				};

				setFormData({
					apellidos: profesorData.apellido,
					nombre: profesorData.nombre,
					correo: profesorData.correo,
					doc: profesorData.documento_identidad,
					contrasena: '',
					area: profesorData.area_ensenanza,
					materias: profesorData.materias.map((materia) => materia.id_materia),
				});
			} catch (error) {
				console.error(error);
			}
		};

		if (profe?.documento_identidad) {
			listaProfes();
		}
	}, [reload, profe.documento_identidad, API_URL, token]);

	const [opcionesMaterias, setOpcionesMaterias] = useState([]);

	useEffect(() => {
		const listaMaterias = async () => {
			try {
				const response = await fetch(
					`${API_URL}materias/institucion/${user.institucion.id_institucion}`,
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

				console.log('Respuesta del servidor:', data);
				const opciones = data.map((materia) => ({
					value: materia.id_materia,
					label: materia.nombre,
				}));

				setOpcionesMaterias(opciones);
			} catch (error) {
				console.error(error);
			}
		};

		listaMaterias();
	}, [API_URL, token, user.institucion.id_institucion]);

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

		if (materiasSeleccionadas.length === 0) {
			
			alert('Debes seleccionar alemnos una materia');
			return;
		}

		const dataToSend = {
			...formData,
			contrasena: formData.contrasena || null,
		};

		console.log('envio', dataToSend);
		console.log('original', initialFormData.current);

		//MATERIAS ELIMINADAS
		const eliminarMat = initialFormData.current.materias.filter(
			(materia) => !dataToSend.materias.includes(materia)
		);
		console.log('eliminar', eliminarMat);
		//MATERIAS CREADAS
		const crearMat = dataToSend.materias.filter(
			(materia) => !initialFormData.current.materias.includes(materia)
		);
		console.log('crear', crearMat);

		if (!bloqueoDemo) {
			setCargando(true)
			try {
				const response = await fetch(`${API_URL}usuario/updateProfesor/${dataToSend.doc}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						nombre: dataToSend.nombre,
						apellido: dataToSend.apellidos,
						correo: dataToSend.correo,
						contraseña: dataToSend.contrasena || undefined,
						area_ensenanza: dataToSend.area,
						id_institucion: user.institucion.id_institucion,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					//toast
					throw new Error(`${errorData.error || response.status}`);
				}

				const data = await response.json();

				for (const materia of crearMat) {
					try {
						const responseMateria = await fetch(`${API_URL}dictar`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify({
								documento_profe: dataToSend.doc,
								id_materia: materia,
							}),
						});

						if (!responseMateria.ok) {
							const errorData = await responseMateria.json();
							throw new Error(
								`Error al asignar materia ${materia}: ${
									errorData.message || responseMateria.status
								}`
							);
						}
					} catch (error) {
						console.error(error);
						setCargando(false)
					}
				}

				for (const materia of eliminarMat) {
					try {
						const responseMateria = await fetch(`${API_URL}dictar`, {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify({
								documento_profe: dataToSend.doc,
								id_materia: materia,
							}),
						});

						if (!responseMateria.ok) {
							const errorData = await responseMateria.json();
							throw new Error(
								`Error al eliminar materia ${materia}: ${
									errorData.message || responseMateria.status
								}`
							);
						}
					} catch (error) {
						console.error(error);
						setCargando(false)
					}
				}

				
				console.log('DOCENTE EDITADO EXITOSAMENTE', data);
				Alerta.success('Docente editado exitosamente');
				setReload(!reload);
				setCargando(false)
			} catch (error) {
				
				console.error('Error al editar un doncente: ', error);
				alert.error(error.message);
				setCargando(false)
			}
		}
	};

	const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

	useEffect(() => {
		if (opcionesMaterias.length > 0) {
			const initialMaterias = opcionesMaterias.filter((opt) => formData.materias.includes(opt.value));
			setMateriasSeleccionadas(initialMaterias);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formData.materias, opcionesMaterias]);

	const handleChangeMaterias = (selectedOptions) => {
		setMateriasSeleccionadas(selectedOptions);
		setFormData({
			...formData,
			materias: selectedOptions.map((materia) => materia.value),
		});
	};

	const navigate = useNavigate();

	// Comparar el estado actual con el inicial para deshabilitar el botón si no hay cambios
	const isFormUnchanged =
		JSON.stringify({ ...formData, contrasena: '', doc: '' }) ===
			JSON.stringify({ ...initialFormData.current, contrasena: '', doc: '' }) && !formData.contrasena; // Permite activar si escriben algo en "contrasena"

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleEliminar = async () => {
		if (!bloqueoDemo) {
			setCargando(true)
			try {
				const response = await fetch(`${API_URL}usuario/${formData.doc}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json(); // Obtiene respuesta del servidor
					throw new Error(`${errorData.error || response.status}`);
				}

				
				console.log('DOCENTE ELIMINADO EXITOSAMENTE');
				Alerta.success('Docente eliminado exitosamente');
				closeModal();
				setCargando(false)
				navigate('/profesores', { replace: true })
			} catch (error) {
				
				console.error('Error al eliminar profesor: ', error);
				alert.error(error.message);
				setCargando(false)
			}
		}
	};
	return (
		<div className='contenedorVistaDocente'>
			<div className='editar'>
				<TituloDes
					titulo='EDITAR PROFESOR'
					desc='Edita el perfil de un profesor en la plataforma y mantenlo siempre actualizado.'
				></TituloDes>
				<form
					onSubmit={handleSubmit}
					className='formulario'
				>
					<div className='inputs'>
						<InputContainer
							nomInput='apellidos'
							required={true}
							titulo='Apellidos'
							placeholder='Ingresa apellidos'
							value={formData.apellidos}
							inputType='text'
							onChange={(value) =>
								handleChange('apellidos', capitalizeWords(value))
							}
						/>
						<InputContainer
							nomInput='nombres'
							required={true}
							titulo='Nombres'
							placeholder='Ingresa nombre(s)'
							value={formData.nombre}
							inputType='text'
							onChange={(value) =>
								handleChange('nombre', capitalizeWords(value))
							}
						/>
						<InputContainer
							nomInput='coreo'
							required={false}
							titulo='Correo'
							placeholder='Ej: correo@example.com'
							value={formData.correo}
							onChange={(value) => handleChange('correo', value)}
						/>
						<InputContainer
							nomInput='contra'
							required={false}
							titulo='Contraseña'
							placeholder='*****'
							value={formData.contrasena}
							inputType='password'
							onChange={(value) => handleChange('contrasena', value)}
						/>
						<InputContainer
							nomInput='doc'
							required={false}
							isDisabled={true}
							titulo='Documento'
							inputType='text'
							placeholder='Documento'
							value={formData.doc}
							onChange={(value) => handleChange('doc', value)}
						/>
						<InputContainer
							nomInput='area'
							required={true}
							placeholder='Ej: Humanidades'
							inputType='text'
							titulo='Área Enseñanza'
							value={formData.area}
							onChange={(value) => handleChange('area', value)}
						/>
					</div>
					<div className='selectorMat'>
						<Selector
							titulo={'Asignación de Materias'}
							placeholder={'Selecciona las materias'}
							onChange={handleChangeMaterias}
							opciones={opcionesMaterias}
							valores={materiasSeleccionadas}
						></Selector>
						{/* <div className="selecciones">
                            <h4>Materias seleccionadas:</h4>
                            {materiasSeleccionadas.length === 0? (
                                <p>No has seleccionado ninguna materia todavía.</p>
                            ): (
                                <ul>
                                {materiasSeleccionadas.map((materia) => (
                                    <li key={materia.value}>{materia.label}</li>
                                ))}
                                </ul>
                            ) }
                            
                        </div> */}
					</div>
					<button
						type='submit'
						disabled={isFormUnchanged || bloqueoDemo || cargando}
					>
						{cargando? 'Guardando...':'Guardar Cambios'}
					</button>
				</form>

				<button
					onClick={openModal}
					className='rojo'
					disabled={bloqueoDemo}
				>
					Eliminar Profesor
				</button>
				<Modal
					isOpen={isModalOpen}
					closeModal={closeModal}
					tipo='eliminar'
					modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
					modalTitulo={`ELIMINAR PROFESOR ${formData.nombre.toUpperCase()}`}
				>
					<button
						onClick={() => handleEliminar()}
						className='rojo'
						disabled={cargando}
					>
						{cargando? 'Eliminando...' : 'ELIMINAR'}
					</button>
				</Modal>
			</div>
			<Line></Line>
			<CursosAsignadosDocente
				idProfe={profe.documento_identidad}
				idInstitucion={user.institucion.id_institucion}
				url={'/profesores'}
			></CursosAsignadosDocente>
		</div>
	);
};

export default VistaDocente;

import React, { useState, useEffect } from 'react';
import { useUser } from '../../../Contexts/UserContext.jsx';
import Alerta from '../../../componentes/Alerta/Alerta.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import ContenedorPildoraMateriaGrado from '../../../componentes/ContenedorPildoraMateriaGrado/ContenedorPildoraMateriaGrado.jsx';
import InputContainer from '../../../componentes/Input/InputContainer.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';
import './CreacionDocente.scss';

const CreacionDocente = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();
	const [reload, setReload] = useState(false);

	function capitalizeWords(str) {
		return str
			.split(' ') // Divide en palabras
			.map((word) =>
				word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
			)
			.join(' ');
	}

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
				Alerta.error('Error al cargar las materias: ', error.message);
				console.error(error);
			}
		};

		listaMaterias();
	}, [API_URL, token, user.institucion.id_institucion]);

	//Datos inciales a mostrar
	const [formData, setFormData] = useState({
		apellidos: '',
		nombre: '',
		correo: '',
		doc: '',
		contrasena: '',
		area: '',
		materias: [],
	});

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
			Alerta.info('Debes seleccionar alemnos una materia');
			return;
		}

		console.log('Datos enviados:', formData);

		try {
			const response = await fetch(`${API_URL}usuario/docente`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					documento_identidad: formData.doc,
					nombre: formData.nombre,
					apellido: formData.apellidos,
					correo: formData.correo,
					contraseña: formData.contrasena,
					area_ensenanza: formData.area,
					id_institucion: user.institucion.id_institucion,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Error al crear docente: ${errorData.error || response.status}`);
			}

			for (const materia of formData.materias) {
				try {
					const responseMateria = await fetch(`${API_URL}dictar`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							documento_profe: formData.doc,
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
					Alerta.error(`Error al asignar materia ${materia}: ${error.message}`);
					console.error(error);
				}
			}

			Alerta.success('Docente creado exitosamente');
			console.log('DOCENTE CREADO EXITOSAMENTE');

			setFormData({
				apellidos: '',
				nombre: '',
				correo: '',
				doc: '',
				contrasena: '',
				area: '',
				materias: [],
			});
			setMateriasSeleccionadas([]);

			setReload(!reload);
		} catch (error) {
			Alerta.error(error.message);
			console.error('Error al crear Docente: ', error);
		}
	};

	const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

	const handleChangeMaterias = (selectedOptions) => {
		setMateriasSeleccionadas(selectedOptions);
		setFormData({
			...formData,
			materias: selectedOptions.map((materia) => materia.value),
		});
	};

	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaProfes = async () => {
			try {
				const response = await fetch(
					`${API_URL}usuario/docentes/institucion/${user.institucion.id_institucion}`,
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
					throw new Error(`${errorData.error || response.status}`);
				}

				const data = await response.json(); // Espera la conversión a JSON
				if (data.length >= 1) {
					const dataPildora = data
						.map((est) => ({
							...est,
							nombreCompleto: `${est.apellido} ${est.nombre}`,
						}))
						.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
					console.log('Respuesta completa:', dataPildora);
					setInfoPildoras(dataPildora);
				} else {
					console.log('Respuesta del servidor:', data);
				}
			} catch (error) {
				console.error(error);
			}
		};

		listaProfes();
	}, [reload, API_URL, token, user.institucion.id_institucion]);

	//Elimina opciones duplicadas para el selector
	const profesUnicos = [...new Set(infoPildoras.map((item) => item.nombreCompleto))];
	const [profeSeleccionado, setProfeSeleccionado] = useState('');

	const [filtroKey, setFiltroKey] = useState('');
	const handleFiltroKeyChange = (nuevoValor) => {
		setFiltroKey(nuevoValor);
		setProfeSeleccionado('');
	};

	// Función para limpiar los filtros
	const limpiarFiltros = () => {
		setProfeSeleccionado('');
		setFiltroKey('');
	};

	const pildorasFiltradas = infoPildoras.filter(
		(item) =>
			(profeSeleccionado === '' || item.nombreCompleto === profeSeleccionado) && // Filtra por profesor seleccionado
			(filtroKey === '' || item.documento_identidad.toLowerCase().includes(filtroKey.toLowerCase())) // Filtra por cédula
	);

	return (
		<div className='contenedorCreacionDocente'>
			<div className='crear'>
				<TituloDes
					titulo='CREAR UN PROFESOR'
					desc='Registra un nuevo profesor y asigna los cursos que gestionará, asegurándote de ingresar toda la información requerida correctamente.'
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
							required={true}
							titulo='Correo'
							value={formData.correo}
							placeholder='Ej: correo@example.com'
							onChange={(value) => handleChange('correo', value)}
						/>
						<InputContainer
							nomInput='contra'
							required={true}
							titulo='Contraseña'
							placeholder='*****'
							value={formData.contrasena}
							inputType='password'
							onChange={(value) => handleChange('contrasena', value)}
						/>
						<InputContainer
							nomInput='doc'
							required={true}
							titulo='Documento'
							inputType='text'
							placeholder='Ingresa documento'
							value={formData.doc}
							onChange={(value) => handleChange('doc', value)}
						/>
						<InputContainer
							nomInput='areaEnsenanza'
							required={true}
							titulo='Area Enseñanza'
							inputType='text'
							placeholder='Ej: Humanidades'
							value={formData.area}
							onChange={(value) =>
								handleChange('area', capitalizeWords(value))
							}
						/>
					</div>
					<div className='selectorMat'>
						<Selector
							titulo={'Asignacion de Materias'}
							mensajeVacio='Crea una materia'
							opciones={opcionesMaterias}
							valores={materiasSeleccionadas}
							onChange={handleChangeMaterias}
							placeholder={'Selecciona las materias'}
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
					<button type='submit'>Guardar Cambios</button>
				</form>
			</div>
			<Line></Line>
			<div className='lista'>
				<TituloDes
					titulo='LISTADO DE PROFESORES'
					desc='Selecciona un profesor para obtener más información detallada sobre su perfil y los cursos que gestiona.'
				/>
				<div className='informacion'>
					<div className='filtros'>
						<InputContainer
							nomInput='busqueda'
							required={false}
							titulo='Busqueda por Cedula'
							placeholder='Ingresa cedula'
							value={filtroKey}
							inputType='text'
							onChange={handleFiltroKeyChange}
						/>
						<CustomSelect
							opciones={profesUnicos}
							valorSeleccionado={profeSeleccionado}
							setValorSeleccionado={setProfeSeleccionado}
							titulo='Profesores'
							placeholder='Seleccione un profesor'
						/>
						<button onClick={limpiarFiltros}>Limpiar</button>
					</div>

					<ContenedorPildoraMateriaGrado
						info={pildorasFiltradas}
						docente={true}
						clase={'docente'}
					></ContenedorPildoraMateriaGrado>
				</div>
			</div>
		</div>
	);
};

export default CreacionDocente;

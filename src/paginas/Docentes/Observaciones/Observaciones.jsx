import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext.jsx';
import Alerta from '../../../componentes/Alerta/Alerta.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraEst from '../../../componentes/PildoraEst/PildoraEst.jsx';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import InputContainer from '../../../componentes/Input/InputContainer.jsx';
import './Observaciones.scss';

const Observaciones = () => {
	//TRAER NOMBRE DEL TOKEN
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');
	const { user } = useUser();

	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaEstAsignados = async () => {
			try {
				const response = await fetch(`${API_URL}usuario/profesor/${user.id}/estudiantes`, {
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

				const data = await response.json(); // Espera la conversión a JSON
				const dataCompleta = data.map((est) => ({
					...est,
					nombre_completo: `${est.estudiante_apellido} ${est.estudiante_nombre} `,
				}));
				console.log('data', dataCompleta);
				setInfoPildoras(dataCompleta);
			} catch (error) {
				Alerta.error(error.message);
				console.error('Error en listaEstAsignados:', error.message);
			}
		};

		listaEstAsignados();
	}, [API_URL, token, user.id]);

	//Elimina opciones duplicadas para el selector
	const nombreEstudiante = [...new Set(infoPildoras.map((item) => item.nombre_completo))];
	const gradosUnicos = [...new Set(infoPildoras.map((item) => item.curso_nombre))];

	const [nombreEstudianteSeleccionada, setnombreEstudianteSeleccionada] = useState('');
	const [gradoSeleccionado, setGradoSeleccionado] = useState('');

	const [filtroKey, setFiltroKey] = useState('');
	const handleFiltroKeyChange = (nuevoValor) => {
		setFiltroKey(nuevoValor);
		setnombreEstudianteSeleccionada('');
		setGradoSeleccionado('');
	};
	// Función para limpiar los filtros
	const limpiarFiltros = () => {
		setnombreEstudianteSeleccionada('');
		setGradoSeleccionado('');
		setFiltroKey('');
	};

	const pildorasFiltradas = infoPildoras.filter(
		(item) =>
			(nombreEstudianteSeleccionada === '' ||
				item.nombre_completo === nombreEstudianteSeleccionada) &&
			(gradoSeleccionado === '' || item.curso_nombre === gradoSeleccionado) &&
			(filtroKey === '' || item.estudiante_id.toLowerCase().includes(filtroKey.toLowerCase()))
	);

	const navigate = useNavigate();

	//pasa los datos de la materia a la pagina de notas de la materias
	const manejarClick = (est) => {
		const datos = { est }; // Datos a enviar
		navigate(`/observaciones/${est.nombre_completo}`, { state: datos }); // Navegar con los datos
	};

	return (
		<div className='contenedorObservaciones'>
			<TituloDes
				titulo='LISTADO DE ESTUDIANTES'
				desc='Consulta los estudiantes por grado y realiza observaciones sobre su rendimiento para ofrecer retroalimentación.'
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
						opciones={nombreEstudiante}
						valorSeleccionado={nombreEstudianteSeleccionada}
						setValorSeleccionado={setnombreEstudianteSeleccionada}
						titulo='Estudiantes'
						placeholder='Ingresa el nombre del estudiante'
					/>
					<CustomSelect
						opciones={gradosUnicos}
						valorSeleccionado={gradoSeleccionado}
						setValorSeleccionado={setGradoSeleccionado}
						titulo='Grado'
						placeholder='Ingresa el grado del estudiante'
					/>
					<button onClick={limpiarFiltros}>Vaciar</button>
				</div>

				<div className='materias'>
					{pildorasFiltradas.length > 0 ? (
						pildorasFiltradas.map((item, index) => (
							<PildoraEst
								key={index}
								est={item.nombre_completo}
								curso={item.curso_nombre}
								color={item.color}
								clase='peque'
								onClick={() => manejarClick(item)}
							/>
						))
					) : (
						<p className='mensaje-no-cursos'>
							No hay cursos que cumplan con estos parametros.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Observaciones;

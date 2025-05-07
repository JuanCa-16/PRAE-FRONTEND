import React, { useState, useEffect } from 'react';
import TituloDes from '../TituloDes/TituloDes.jsx';
import CustomSelect from '../CustomSelect/CustomSelect.jsx';
import ContenedorMaterias from '../ContenedorMaterias/ContenedorMaterias.jsx';
import './CursosAsignadosDocente.scss';

const CursosAsignadosDocente = ({ idProfe, idInstitucion, url }) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');

	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaCursos = async () => {
			try {
				const response = await fetch(
					`${API_URL}asignar/asignaciones/profesor/${idProfe}/institucion/${idInstitucion}`,
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

				const dataCompleta = data.map((item) => ({
					...item,
					nombre_completo: `${item.profesor_nombre} ${item.profesor_apellido}`,
				}));

				console.log('Respuesta del servidor listaCursosProfe:', dataCompleta);
				setInfoPildoras(dataCompleta);
			} catch (error) {
				console.error(error);
			}
		};

		listaCursos();
	}, [API_URL, token, idProfe, idInstitucion]);

	//Elimina opciones duplicadas para el selector
	const materiasUnicas = [...new Set(infoPildoras.map((item) => item.materia))];
	const gradosUnicos = [...new Set(infoPildoras.map((item) => item.curso))];

	const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
	const [gradoSeleccionado, setGradoSeleccionado] = useState('');

	// Función para limpiar los filtros
	const limpiarFiltros = () => {
		setMateriaSeleccionada('');
		setGradoSeleccionado('');
	};

	const pildorasFiltradas = infoPildoras.filter(
		(item) =>
			(materiaSeleccionada === '' || item.materia === materiaSeleccionada) &&
			(gradoSeleccionado === '' || item.curso === gradoSeleccionado)
	);

	return (
		<div className='lista'>
			<TituloDes
				titulo='LISTADO DE CURSOS ASIGNADOS:'
				desc='Consulta los cursos que tienes asignados en los distintos grados. Gestiona las calificaciones y el progreso de tus estudiantes en cada uno de tus grupos.'
			/>
			<div className='informacion'>
				<div className='filtros'>
					<CustomSelect
						opciones={materiasUnicas}
						valorSeleccionado={materiaSeleccionada}
						setValorSeleccionado={setMateriaSeleccionada}
						titulo='Materia'
					/>
					<CustomSelect
						opciones={gradosUnicos}
						valorSeleccionado={gradoSeleccionado}
						setValorSeleccionado={setGradoSeleccionado}
						titulo='Grado'
					/>
					<button onClick={limpiarFiltros}>Limpiar</button>
				</div>

				<ContenedorMaterias
					url={url}
					est={false}
					info={pildorasFiltradas}
					idProfe={idProfe}
				></ContenedorMaterias>
			</div>
		</div>
	);
};

export default CursosAsignadosDocente;

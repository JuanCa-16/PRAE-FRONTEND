import React, { useState, useEffect } from 'react';
import TituloDes from '../TituloDes/TituloDes';
import ContenedorMaterias from '../ContenedorMaterias/ContenedorMaterias';
import './CursosAsignadosEstudiante.scss';

const CursosAsignadosEstudiante = ({ url, idCurso, idInstitucion, nombreEst, idEst }) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem('token');

	const [infoPildoras, setInfoPildoras] = useState([]);

	useEffect(() => {
		const listaCursos = async () => {
			try {
				const response = await fetch(
					`${API_URL}asignar/grado/${idCurso}/institucion/${idInstitucion}`,
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
	}, [API_URL, token, idCurso, idInstitucion]);

	return (
		<div className='contenedorCursos'>
			<TituloDes
				titulo='MIS MATERIAS:'
				desc='Accede a todas tus materias de forma organizada, consulta tus calificaciones y sigue tu progreso académico de manera sencilla y rápida.'
			></TituloDes>

			<ContenedorMaterias
				url={url}
				info={infoPildoras}
				nombre={nombreEst}
				idEst={idEst}
			></ContenedorMaterias>
		</div>
	);
};

export default CursosAsignadosEstudiante;

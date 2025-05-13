import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import Pildora from '../Pildora/Pildora';
import './ContenedorMaterias.scss';

/**
 * Componente que muestra un contenedor de materias asignadas a un estudiante o profesor.
 * Permite navegar a la página de notas de la materia seleccionada.
 * 
 * @component
 * 
 * @param {string} url - La URL base para la navegación a las páginas de notas.
 * @param {Array} info - Array de objetos que contienen la información de las materias a mostrar.
 * @param {boolean} [est=true] - Si es `true`, muestra las materias del estudiante; si es `false`, muestra las materias del profesor.
 * @param {string} nombre - El nombre del estudiante o profesor.
 * @param {string} idEst - El ID del estudiante.
 * @param {string} idProfe - El ID del profesor.
 * 
 * @returns {JSX.Element} Un contenedor con las materias asignadas, o un mensaje si no hay materias.
 */

const ContenedorMaterias = ({ url, info, est = true, nombre, idEst, idProfe }) => {
	const navigate = useNavigate();
	const { user } = useUser();

	//Pasa los datos de la materia a la pagina de notas de la materias
	const manejarClick = (item, materia, profesor) => {
		const datos = { item, idEst }; // Datos a enviar

		//item ya tiene el doc del idProfe en teoria podria quitar el idProfe
		const datos2 = { item, idProfe }; // Datos a enviar

		if (est) {
			navigate(`${url}/${nombre ? nombre : user.nombre + ' ' + user.apellido}/${materia}`, {
				state: datos,
			});
		} else {
			navigate(`${url}/${profesor}/${materia}`, { state: datos2 });
		}
	};

	const infoPildoras = info;

	return (
		<div className='contenedorMaterias'>
			{est ? (
				infoPildoras.length > 0 ? (
					infoPildoras.map((item, index) => (
						<Pildora
							key={index}
							titulo={item.materia}
							txtsuperior={item.nombre_completo}
							txtinferior={item.curso}
							color={item.color}
							onClick={() =>
								manejarClick(item, item.materia, item.nombre_completo)
							}
						/>
					))
				) : (
					<p>Tu grado todavia no tiene materias asignadas</p>
				)
			) : infoPildoras.length > 0 ? (
				infoPildoras.map((item, index) => (
					<Pildora
						key={index}
						titulo={item.materia}
						txtsuperior={item.nombre_completo}
						txtinferior={item.curso}
						color={item.color}
						onClick={() => manejarClick(item, item.materia, item.nombre_completo)} // Pasa la función con datos dinámicos
					/>
				))
			) : (
				<p className='mensaje-no-cursos'>No hay cursos que cumplan con estos parametros.</p>
			)}
		</div>
	);
};

export default ContenedorMaterias;

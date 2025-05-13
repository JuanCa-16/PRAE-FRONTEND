import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import PildoraMateriaGrado from '../PildoraMateriaGrado/PildoraMateriaGrado';
import Modal from '../Modal/Modal';
import Masonry from 'react-masonry-css';
import './ContenedorPildoraMateriaGrado.scss';

/**
 * Componente que muestra un contenedor de "píldoras" para las materias o grados,
 * con la capacidad de eliminar o navegar a la página correspondiente.
 * Utiliza el componente **`Masonry`** para el diseño responsivo.
 * 
 * @component
 * 
 * @param {Array} info - Array de objetos que contienen la información.
 * @param {boolean} [docente=false] - Si es `true`, muestra la información de los profesores; si es `false`, muestra la información de las materias.
 * @param {function} eliminar - Función que se ejecuta al eliminar una materia o grado.
 * @param {string} txt - Texto que describe si se trata de una materia o grado (usado en el mensaje de confirmación de eliminación).
 * @param {string} clase - Clase CSS que se aplica al componente, dependiendo de si es para grados o materias.
 * 
 * @returns {JSX.Element} Un contenedor con las "píldoras" de materias o grados, o un mensaje si no hay datos.
 */

const ContenedorPildoraMateriaGrado = ({ info, docente = false, eliminar, txt, clase }) => {
	const { bloqueoDemo } = useUser();
	const pildorasFiltradas = info;
	const navigate = useNavigate();
	const manejarClick = (profe) => {
		const datos = { profe };
		console.log(profe);

		// navigate("/materias/notas", { state: datos }); // Navegar con los datos
		navigate(`/profesores/${profe.nombreCompleto}`, { state: datos });
	};

	const [isModalOpen, setIsModalOpen] = useState(null);

	const openModal = (index) => setIsModalOpen(index);
	const closeModal = () => setIsModalOpen(null);

	const breakpointSet1 = {
		default: 7,
		300: 1,
		450: 2,
		570: 4,
		700: 5,
		750: 1,
		950: 2,
		1100: 4,
		1350: 5,
		1600: 6,
	};

	const breakpointSet2 = {
		default: 5,
		400: 1,
		550: 2,
		700: 3,
		950: 1,
		1100: 2,
		1350: 3,
		1600: 4,
	};

	const breakpoints = clase === 'grado' ? breakpointSet1 : breakpointSet2;

	return (
		<Masonry
			className='layautMateriasGrados'
			columnClassName='layautMateriasGradosColumn'
			breakpointCols={breakpoints}
		>
			{docente ? (
				pildorasFiltradas.length > 0 ? (
					pildorasFiltradas.map((item, index) => (
						<PildoraMateriaGrado
							clase={clase}
							texto={item.nombreCompleto}
							color={item.color}
							key={index}
							onClick={() => manejarClick(item)}
						/>
					))
				) : (
					<p className='mensaje-no-cursos'>
						No hay profesores que cumplan con estos parametros
					</p>
				)
			) : pildorasFiltradas.length > 0 ? (
				pildorasFiltradas.map((item, index) => (
					<React.Fragment key={index}>
						<PildoraMateriaGrado
							clase={clase}
							texto={item.nombre}
							color={item.color}
							key={index}
							onClick={() => openModal(index)}
						/>
						{isModalOpen === index && (
							<Modal
								isOpen={true}
								closeModal={closeModal}
								tipo='eliminar'
								modalTexto={`Seguro de que quieres eliminar ${item.nombre} como ${txt} de la institucion.`}
								modalTitulo={`ELIMINAR ${txt.toUpperCase()} ${item.nombre.toUpperCase()}`}
							>
								<button
									onClick={() =>
										txt === 'grado'
											? eliminar(
													index,
													item.nombre,
													item.id_curso,
													closeModal
											  )
											: eliminar(
													index,
													item.nombre,
													item.id_materia,
													closeModal
											  )
									}
									className='rojo'
									disabled={bloqueoDemo}
								>
									ELIMINAR
								</button>
							</Modal>
						)}
					</React.Fragment>
				))
			) : (
				<p className='mensaje-no-cursos'>No hay {txt} que cumplan con estos parametros.</p>
			)}
		</Masonry>
	);
};

export default ContenedorPildoraMateriaGrado;

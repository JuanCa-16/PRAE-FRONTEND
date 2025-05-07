import React, { useState, useEffect } from 'react';
import { useUser } from '../../../Contexts/UserContext';
import { useTheme } from '../../../Contexts/UserContext';
import WebSocketListener from '../WebSocketListener/WebSocketListener';
import AnimatedCounter from '../Animacion/AnimatedNumber';
import PildoraEst from '../../PildoraEst/PildoraEst';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import GraficoTorta from '../GraficoTorta/GraficoTorta';
import Masonry from 'react-masonry-css';
import './AdminEstadisticas.scss';

const AdminEstadisticas = ({ funcionRecargaCantMaterias = () => {} }) => {
	const { theme } = useTheme();
	const { user } = useUser();
	const idInstitucion = user.institucion.id_institucion;

	const [cantidadMaterias, setCantidadMaterias] = useState(null);
	const [cantidadGrados, setCantidadGrados] = useState(null);
	const [cantidadEst, setCantidadEst] = useState(null);
	const [cantidadDocentes, setCantidadDocentes] = useState(null);
	const [promedioNotasCurso, setPromedioNotasCurso] = useState(null);
	const [estudiantesCurso, setEstudiantesCurso] = useState(null);

	const duracion = 1.5; // Duración de la animación en segundos

	const ordenarGrados = (a, b) => {
		const [gradoA, subgradoA] = a.name.split('-');
		const [gradoB, subgradoB] = b.name.split('-');

		// Convertir los grados en números
		const gradoANum = Number(gradoA);
		const gradoBNum = Number(gradoB);

		// Primero ordenar por el número del grado
		if (gradoANum !== gradoBNum) {
			return gradoANum - gradoBNum; // Comparar los grados
		} else {
			// Si los grados son iguales, ordenar alfabéticamente por la letra
			if (subgradoA < subgradoB) return -1;
			if (subgradoA > subgradoB) return 1;
			return 0;
		}
	};

	const handleData = (data) => {
		if (data.identificador === `${idInstitucion}`) {
			//MATERIAS
			const nuevasMaterias = data.estadisticas.materias.materias_activas;
			setCantidadMaterias((prev) => {
				if (prev === nuevasMaterias) {
					return prev; // No hacer nada si no cambió
				}
				return nuevasMaterias; // Solo actualizar si realmente cambió
			});

			//GRADOS
			const nuevosGrados = data.estadisticas.cursos.cursos_activos;
			setCantidadGrados((prev) => {
				if (prev === nuevosGrados) {
					return prev; // No hacer nada si no cambió
				}
				return nuevosGrados; // Solo actualizar si realmente cambió
			});

			//PROMEDIO X GRADO
			const nuevosPromedioGrados = Object.entries(data.estadisticas.promedio_notas_por_grado).map(
				([titulo, promedio]) => ({
					titulo,
					promedio: parseFloat(promedio),
				})
			);

			setPromedioNotasCurso((prev) => {
				const nuevo = JSON.stringify(nuevosPromedioGrados);
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevosPromedioGrados;
			});

			//ESTUDIANTES X GRADO
			const nuevosEstGrados = Object.entries(data.estadisticas.estudiantes_por_grado).map(
				([grado, cant]) => ({
					name: grado,
					value: Number(cant),
				})
			);

			setEstudiantesCurso((prev) => {
				const nuevo = JSON.stringify(nuevosEstGrados.sort(ordenarGrados));
				const anterior = JSON.stringify(prev);

				if (nuevo === anterior) {
					return prev;
				}
				return nuevosEstGrados.sort(ordenarGrados);
			});

			//EST
			const nuevosEst = data.estadisticas.usuarios.estudiantes_activos;
			setCantidadEst((prev) => {
				if (prev === nuevosEst) {
					return prev; // No hacer nada si no cambió
				}
				return nuevosEst; // Solo actualizar si realmente cambió
			});

			//DOCENTES
			const nuevosDoc = data.estadisticas.usuarios.docentes_activos;
			setCantidadDocentes((prev) => {
				if (prev === nuevosDoc) {
					return prev; // No hacer nada si no cambió
				}
				return nuevosDoc; // Solo actualizar si realmente cambió
			});
		}
	};

	useEffect(() => {
		if (cantidadMaterias !== null) {
			// funcionRecargaCantMaterias();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cantidadMaterias]);

	return (
		<WebSocketListener
			nombreSala={`institucion_${idInstitucion}`}
			eventoEscuchar='emitStats'
			onData={handleData}
		>
			<Masonry
				breakpointCols={{ default: 4, 550: 1, 700: 2, 900: 1, 1100: 2, 1400: 3, 1600: 3 }} // Configuración de las columnas según el ancho
				className={`contenedorData ${theme}`} // Clase para el contenedor
				columnClassName='contenedorDataColumn' // Clase para las columnas
			>
				{cantidadMaterias !== null ? (
					<div>
						<PildoraEst
							clase='peque pildoraEstadistica'
							est='MATERIAS:'
							estadistica
						>
							<AnimatedCounter
								from={0}
								to={cantidadMaterias}
								duration={duracion}
							/>
						</PildoraEst>
					</div>
				) : (
					<span className='loader'></span>
				)}

				{cantidadGrados !== null ? (
					<div>
						<PildoraEst
							color='morado'
							clase='peque pildoraEstadistica'
							est='GRADOS:'
							estadistica
						>
							<AnimatedCounter
								from={0}
								to={cantidadGrados}
								duration={duracion}
							/>
						</PildoraEst>
					</div>
				) : (
					<span className='loader'></span>
				)}

				{promedioNotasCurso !== null ? (
					promedioNotasCurso.length > 0 ? (
						<div className='graficoBarras'>
							<p>Promedio x Grado</p>
							<GraficoBarras data={promedioNotasCurso} />
						</div>
					) : (
						<p>No hay datos para mostrar</p>
					)
				) : (
					<span className='loader'></span>
				)}

				{estudiantesCurso !== null ? (
					estudiantesCurso.length > 0 ? (
						<div className='graficoTorta'>
							<p>Estudiantes x Grado</p>
							<GraficoTorta data={estudiantesCurso}></GraficoTorta>
						</div>
					) : (
						<p>No hay datos para mostrar</p>
					)
				) : (
					<span className='loader'></span>
				)}

				{cantidadEst !== null ? (
					<div>
						<PildoraEst
							color='amarillo'
							clase='peque pildoraEstadistica'
							est='ESTUDIANTES:'
							estadistica
						>
							<AnimatedCounter
								from={0}
								to={cantidadEst}
								duration={duracion}
							/>
						</PildoraEst>
					</div>
				) : (
					<span className='loader'></span>
				)}

				{cantidadDocentes !== null ? (
					<div>
						<PildoraEst
							clase='peque pildoraEstadistica'
							est='DOCENTES:'
							estadistica
						>
							<AnimatedCounter
								from={0}
								to={cantidadDocentes}
								duration={duracion}
							/>
						</PildoraEst>
					</div>
				) : (
					<span className='loader'></span>
				)}
			</Masonry>
		</WebSocketListener>
	);
};
export default AdminEstadisticas;

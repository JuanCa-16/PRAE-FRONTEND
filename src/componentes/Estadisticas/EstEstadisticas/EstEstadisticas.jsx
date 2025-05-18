import React, { useState } from 'react';
import { useUser } from '../../../Contexts/UserContext';
import { useTheme } from '../../../Contexts/UserContext';
import WebSocketListener from '../WebSocketListener/WebSocketListener';
import PildoraEst from '../../PildoraEst/PildoraEst';
import AnimatedCounter from '../Animacion/AnimatedNumber';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import GraficoRadar from '../GraficoRadar/GraficoRadar';
import Masonry from 'react-masonry-css';

const EstEstadisticas = () => {
	const { theme } = useTheme();
	const { user } = useUser();
	const documento_estudiante = user.id;
	const duracion = 1.5; // Duración de la animación en segundos

	const [puesto, setPuesto] = useState(null);
	const [cantidadMaterias, setCantidadMaterias] = useState(null);
	const [cantObservaciones, setCantObservaciones] = useState(null);
	const [materiasAlto, setMateriasAlto] = useState(null);
	const [materiasMedia, setMateriasMedia] = useState(null);
	const [materiasBajo, setMateriasBajo] = useState(null);
	const [promedioCursos, setPromedioCursos] = useState(null);
	const [promedioTotal, setPromedioTotal] = useState(null);

	const handleData = (data) => {
		if (data.identificador === `${documento_estudiante}`) {
			//PUESTO
			const nuevoPuesto = data.estadisticas.puesto;
			setPuesto((prev) => {
				if (prev === nuevoPuesto) {
					return prev; // No hacer nada si no cambió
				}
				return nuevoPuesto; // Solo actualizar si realmente cambió
			});

			//MATERIAS
			const nuevasMaterias = data.estadisticas.materias_inscritas;
			setCantidadMaterias((prev) => {
				if (prev === nuevasMaterias) {
					return prev; // No hacer nada si no cambió
				}
				return nuevasMaterias; // Solo actualizar si realmente cambió
			});

			//OBSERVACIONES
			const nuevasObservaciones = data.estadisticas.comentarios_recibidos;
			setCantObservaciones((prev) => {
				if (prev === nuevasObservaciones) {
					return prev; // No hacer nada si no cambió
				}
				return nuevasObservaciones; // Solo actualizar si realmente cambió
			});

			//MATERIAS

			const nuevaMateriaAlto = data.estadisticas.materias_altas;
			setMateriasAlto((prev) => {
				if (prev === nuevaMateriaAlto) {
					return prev; // No hacer nada si no cambió
				}
				return nuevaMateriaAlto; // Solo actualizar si realmente cambió
			});

			const nuevaMateriaMedia = data.estadisticas.materias_medias;
			setMateriasMedia((prev) => {
				if (prev === nuevaMateriaMedia) {
					return prev; // No hacer nada si no cambió
				}
				return nuevaMateriaMedia; // Solo actualizar si realmente cambió
			});

			const nuevaMateriaBaja = data.estadisticas.materias_bajas;
			setMateriasBajo((prev) => {
				if (prev === nuevaMateriaBaja) {
					return prev; // No hacer nada si no cambió
				}
				return nuevaMateriaBaja; // Solo actualizar si realmente cambió
			});

			//PROMEDIO X MATERIA

			const nuevoPromedioCurso = data.estadisticas.promedios_por_materia.map((obj) => {
				return {
					titulo: obj.materia, // Accede a la propiedad 'materia'
					promedio: parseFloat(obj.promedio), // Convierte 'promedio' a número
				};
			});
			setPromedioCursos((prev) => {
				const nuevo = JSON.stringify(nuevoPromedioCurso);
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevoPromedioCurso;
			});
		}

		//PROMEDIO TOTAL:
		const nuevoPromTotal = data.estadisticas.promedio;
		setPromedioTotal((prev) => {
			if (prev === nuevoPromTotal) {
				return prev; // No hacer nada si no cambió
			}
			return nuevoPromTotal; // Solo actualizar si realmente cambió
		});
	};

	return (
		<WebSocketListener
			nombreSala={`estudiante_${documento_estudiante}`}
			eventoEscuchar='emitStats'
			onData={handleData}
		>
			<Masonry
				breakpointCols={{ default: 4, 550: 1, 700: 2, 900: 1, 1100: 2, 1400: 2, 1600: 3 }} // Configuración de las columnas según el ancho
				className={`contenedorData ${theme}`} // Clase para el contenedor
				columnClassName='contenedorDataColumn' // Clase para las columnas
			>
				{puesto !== null ? (

						<PildoraEst
							color='azul'
							est={user.nombre}
							estadistica
							clase= 'grande full'
						>
							{'#\u00A0'}
							<AnimatedCounter
								from={0}
								to={puesto}
								duration={duracion}
							/>
						</PildoraEst>

				) : (
					<span className='loader'></span>
				)}

				<>
					{promedioTotal !== null ? (
						<div>
							<PildoraEst
								color='morado'
								clase='peque pildoraEstadistica'
								est='PROMEDIO:'
								estadistica
							>
								<AnimatedCounter
									from={0}
									to={promedioTotal}
									duration={duracion}
								/>
							</PildoraEst>
						</div>
					) : (
						<span className='loader'></span>
					)}
					{cantidadMaterias !== null ? (
						<div>
							<PildoraEst
								clase='peque pildoraEstadistica'
								est='CANTIDAD MATERIAS:'
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

					{cantObservaciones !== null ? (
						<div>
							<PildoraEst
								color='amarillo'
								clase='peque pildoraEstadistica'
								est='TOTAL OBSERVACIONES:'
								estadistica
							>
								<AnimatedCounter
									from={0}
									to={cantObservaciones}
									duration={duracion}
								/>
							</PildoraEst>
						</div>
					) : (
						<span className='loader'></span>
					)}
				</>

				<>
					{materiasAlto !== null ? (
						<div>
							<PildoraEst
								color='amarillo'
								clase='peque pildoraEstadistica'
								est='MATERIAS EN ALTO:'
								estadistica
							>
								<AnimatedCounter
									from={0}
									to={materiasAlto}
									duration={duracion}
								/>
							</PildoraEst>
						</div>
					) : (
						<span className='loader'></span>
					)}

					{materiasMedia !== null ? (
						<div>
							<PildoraEst
								color='morado'
								clase='peque pildoraEstadistica'
								est='MATERIAS EN MEDIO:'
								estadistica
							>
								<AnimatedCounter
									from={0}
									to={materiasMedia}
									duration={duracion}
								/>
							</PildoraEst>
						</div>
					) : (
						<span className='loader'></span>
					)}

					{materiasBajo !== null ? (
						<div>
							<PildoraEst
								clase='peque pildoraEstadistica'
								est='MATERIAS EN BAJO:'
								estadistica
							>
								<AnimatedCounter
									from={0}
									to={materiasBajo}
									duration={duracion}
								/>
							</PildoraEst>
						</div>
					) : (
						<span className='loader'></span>
					)}
				</>

				{promedioCursos !== null ? (
					promedioCursos.length > 0 ? (
						<div className='graficoBarras'>
							<p>Promedio x Materias</p>
							{promedioCursos.length <= 3 ? (
								<GraficoBarras data={promedioCursos} />
							) : (
								<GraficoRadar data={promedioCursos} />
							)}
						</div>
					) : (
						<p>No hay datos para mostrar</p>
					)
				) : (
					<span className='loader'></span>
				)}
			</Masonry>
		</WebSocketListener>
	);
};

export default EstEstadisticas;

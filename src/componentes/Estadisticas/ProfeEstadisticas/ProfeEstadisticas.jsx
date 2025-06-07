import React, { useState } from 'react';
import { useTheme } from '../../../Contexts/UserContext';
import { useUser } from '../../../Contexts/UserContext';
import WebSocketListener from '../WebSocketListener/WebSocketListener';
import PildoraEst from '../../PildoraEst/PildoraEst';
import AnimatedCounter from '../Animacion/AnimatedNumber';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import GraficoRadar from '../GraficoRadar/GraficoRadar';
import Masonry from 'react-masonry-css';
import '../AdminEstadisticas/AdminEstadisticas.scss'

const ProfeEstadisticas = ({gradoFiltro}) => {
	const { theme } = useTheme();
	const { user } = useUser();
	const idProfe = user.id;
	const duracion = 1.5; // Duración de la animación en segundos

	const [cantidadMaterias, setCantidadMaterias] = useState(null);
	const [cantidadGrados, setCantidadGrados] = useState(null);
	const [cantidadEst, setCantidadEst] = useState(null);
	const [cantidadEstCurso, setCantidadEstCurso] = useState(null);
	const [promedioNotasCurso, setPromedioNotasCurso] = useState(null);
	const [promedioGrados, setPromedioGrados] = useState(null);
	const handleData = (data) => {
		if (String(data.identificador) === `${idProfe}`) {
			//MATERIAS
			const nuevasMaterias = data.estadisticas.materias_dictadas;
			setCantidadMaterias((prev) => {
				if (prev === nuevasMaterias) {
					return prev; // No hacer nada si no cambió
				}
				return nuevasMaterias; // Solo actualizar si realmente cambió
			});

			//GRADOS
			const nuevosGrados = data.estadisticas.cursos_asignados;
			setCantidadGrados((prev) => {
				if (prev === nuevosGrados) {
					return prev; // No hacer nada si no cambió
				}
				return nuevosGrados; // Solo actualizar si realmente cambió
			});

			//EST
			const nuevosEst = data.estadisticas.estudiantes_totales;
			setCantidadEst((prev) => {
				if (prev === nuevosEst) {
					return prev; // No hacer nada si no cambió
				}
				return nuevosEst; // Solo actualizar si realmente cambió
			});

			//PROMEDIO MATERIAS X GRADO
			const nuevosPromedioGrados = Object.entries(data.estadisticas.promedio_por_curso).map(
				([curso, info]) => ({
					curso,
					informacion: Object.entries(info)
						.map(([titulo, prom]) => {
							// Solo incluir las materias que no sean la excluida
							if (titulo === 'promedioCurso' || titulo ===  'totalEstudiantes') {
								return null; // Retorna null para excluir la materia
							}

							return {
								titulo,
								promedio: parseFloat(prom.promedioMateria),
							};
						})
						.filter((item) => item !== null), // Elimina los nulls (materias excluidas)
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

			//ESTUDIANTES X CURSO 
			const nuevosEstCurso = Object.entries(data.estadisticas.promedio_por_curso).map(
				([curso, info]) => ({
					curso,
					cant: Object.entries(info)
						.map(([titulo,cant]) => {

							if (titulo ===  'totalEstudiantes') {
								return cant; 
							}

							return null
						})
						.filter((item) => item !== null)[0] // Elimina los nulls  excluidas)
				})
			);

			setCantidadEstCurso((prev) => {
				const nuevo = JSON.stringify(nuevosEstCurso);
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevosEstCurso;
			});

			//PROMEDIO  X GRADO
			const nuevoPromGrado = Object.entries(data.estadisticas.promedio_por_curso).map(
				([curso, info]) => ({
					titulo: curso,
					promedio: parseFloat(info.promedioCurso),
				})
			);

			setPromedioGrados((prev) => {
				const nuevo = JSON.stringify(nuevoPromGrado);
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevoPromGrado;
			});
		}
	};

	return (
		<WebSocketListener
			nombreSala={`profesor_${idProfe}`}
			eventoEscuchar='emitStats'
			onData={handleData}
		>
			<Masonry
				breakpointCols={{ default: 3, 550: 1, 700: 2, 900: 1, 1100: 2, 1400: 2, 1600: 3 }} // Configuración de las columnas según el ancho
				className={`contenedorData ${theme}`} // Clase para el contenedor
				columnClassName='contenedorDataColumn' // Clase para las columnas
			>

				{gradoFiltro === 'Todos' && (<>
					{cantidadMaterias !== null ? (
						<div>
							<PildoraEst
								clase='peque pildoraEstadistica'
								est='MATERIAS DICTADAS:'
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
								est='GRADOS ASIGNADOS:'
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
				</>)}

				{gradoFiltro !== 'Todos' && (

					cantidadEstCurso !== null ? (
						<div>
							<PildoraEst
								color='amarillo'
								clase='peque pildoraEstadistica'
								est='ESTUDIANTES:'
								estadistica
							>
								<AnimatedCounter
									from={0}
									to={cantidadEstCurso.filter(
									(dato) => dato.curso === gradoFiltro
							)[0].cant}
									duration={duracion}
								/>
							</PildoraEst>
						</div>
					) : (
						<span className='loader'></span>
					)
				)}
				

				{promedioGrados !== null ? (
					promedioGrados.length > 0 ? (
						<div className='graficoBarras'>
							{(() => {
								const promedioGradoFiltrado=
									promedioGrados.filter(
										(dato) => dato.titulo === gradoFiltro
									);
								return (
									<>
										<p>Promedio Grados</p>
										<GraficoBarras data={gradoFiltro === 'Todos'
													? promedioGrados
													: promedioGradoFiltrado} />
									</>
								);
							})()}
							
						</div>
					) : (
						<PildoraEst
							color='morado'
							clase='peque pildoraEstadistica'
							est='NO HAY PROMEDIO GRADOS'
							estadistica
						/>
					)
				) : (
					<span className='loader'></span>
				)}

				{promedioNotasCurso !== null ? (
					promedioNotasCurso.length > 0 ? (
						(gradoFiltro === 'Todos'
							? promedioNotasCurso
							: promedioNotasCurso.filter(
									(dato) => dato.curso === gradoFiltro
							)
						).map(({ curso, informacion }) => {
							return (
								<>
									{informacion.length > 0 ? (
										<div
											key={curso}
											className='graficoBarras'
										>
											<p>Promedio {curso}</p>
											{informacion.length <= 2 ? (
												<GraficoBarras
													data={
														informacion
													}
												/>
											) : (
												<GraficoRadar
													data={
														informacion
													}
												/>
											)}
										</div>
									) : (
										<PildoraEst
											color='amarillo'
											clase='peque pildoraEstadistica'
											est={`Grado ${curso} sin materias`}
											estadistica
										/>
									)}
								</>
							);
						})
					) : (
						<PildoraEst
							color='amarillo'
							clase='peque pildoraEstadistica'
							est='NO HAY DATOS PROM X GRADOS'
							estadistica
						/>
					)
				) : (
					<span className='loader'></span>
				)}
			</Masonry>
		</WebSocketListener>
	);
};

export default ProfeEstadisticas;

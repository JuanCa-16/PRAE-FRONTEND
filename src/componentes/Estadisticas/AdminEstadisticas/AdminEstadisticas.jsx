import React, { useState, useEffect } from 'react';
import { useUser } from '../../../Contexts/UserContext';
import { useTheme } from '../../../Contexts/UserContext';
import WebSocketListener from '../WebSocketListener/WebSocketListener';
import AnimatedCounter from '../Animacion/AnimatedNumber';
import PildoraEst from '../../PildoraEst/PildoraEst';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import GraficoTorta from '../GraficoTorta/GraficoTorta';
import GraficoAguja from '../GraficoAguja/GraficoAguja';
import GraficoRadar from '../GraficoRadar/GraficoRadar';
import GraficoBarrasApiladas from '../GraficoBarrasApiladas/GraficoBarrasApiladas';
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
	const [promedioNotasCursoAcumulado, setPromedioNotasCursoAcumulado] = useState(null);
	const [estudiantesCurso, setEstudiantesCurso] = useState(null);
	const [porcentajeUsuarios, setPorcentajeUsuarios] = useState(null);
	const [promedioMateriasCurso, setPromedioMateriasCurso] = useState(null);

	const duracion = 1.5; // Duración de la animación en segundos

	const ordenarGrados = (a, b) => {
		const strA = a.name ?? a.titulo ?? a.curso ?? '';
		const strB = b.name ?? b.titulo ?? b.curso ?? '';

		const [gradoA, subA = ''] = strA.split('-');
		const [gradoB, subB = ''] = strB.split('-');

		const gA = Number(gradoA);
		const gB = Number(gradoB);
		if (gA !== gB) return gA - gB;

		return subA.localeCompare(subB, 'es', { sensitivity: 'base' });
	};

	const handleData = (data) => {
		if (String(data.identificador) === `${idInstitucion}`) {
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
				const nuevo = JSON.stringify(nuevosPromedioGrados.sort(ordenarGrados));
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevosPromedioGrados.sort(ordenarGrados);
			});

			//PROMEDIO X GRADO ACUMULADO
			const nuevosPromedioGradosAcumulado = Object.entries(
				data.estadisticas.promedio_notas_por_grado_acumulado
			)
				.map(([titulo, info]) => {

					const resultado = {titulo};
					Object.entries(info).forEach(([tituloPeriodo, prom]) => {
						const periodo =
							tituloPeriodo === 'PRIMER PERIODO'
								? 'periodo1'
								: tituloPeriodo === 'SEGUNDO PERIODO'
								? 'periodo2'
								: tituloPeriodo === 'TERCER PERIODO'
								? 'periodo3'
								: tituloPeriodo === 'CUARTO PERIODO'
								? 'periodo4'
								: 'total';
						resultado[periodo] = parseFloat(prom);
					});

					return resultado;
				})

			setPromedioNotasCursoAcumulado((prev) => {
				const nuevo = JSON.stringify(nuevosPromedioGradosAcumulado.sort(ordenarGrados));
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevosPromedioGradosAcumulado.sort(ordenarGrados);
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

			//PORCENTAJE USUARIOS

			const nuevoPorcentajeUsuarios = [
				{ name: 'Profesores', value: Number(nuevosDoc) },
				{ name: 'Estudiantes', value: Number(nuevosEst) },
			];
			setPorcentajeUsuarios((prev) => {
				const nuevo = JSON.stringify(nuevoPorcentajeUsuarios);
				const anterior = JSON.stringify(prev);

				if (nuevo === anterior) {
					return prev;
				}
				return nuevoPorcentajeUsuarios;
			});

			//PROMEDIO MATERIAS X GRADO
			const nuevosPromedioMateriasGrados = Object.entries(
				data.estadisticas.promedio_notas_por_materia
			).map(([curso, info]) => ({
				curso,
				informacion: Object.entries(info).map(([titulo, prom]) => {
					return {
						titulo,
						promedio: parseFloat(prom),
					};
				}),
			}));

			setPromedioMateriasCurso((prev) => {
				const nuevo = JSON.stringify(nuevosPromedioMateriasGrados.sort(ordenarGrados));
				const anterior = JSON.stringify(prev);
				if (nuevo === anterior) {
					return prev;
				}
				return nuevosPromedioMateriasGrados.sort(ordenarGrados);
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
				breakpointCols={{ default: 3, 550: 1, 700: 2, 900: 1, 1100: 2, 1400: 2, 1600: 3 }} // Configuración de las columnas según el ancho
				className={`contenedorData ${theme}`} // Clase para el contenedor
				columnClassName='contenedorDataColumn' // Clase para las columnas
			>
				<>
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
				</>
				{porcentajeUsuarios !== null ? (
					porcentajeUsuarios.length > 0 ? (
						<div className='graficoTorta'>
							<p>Usuarios Institucion</p>
							<GraficoTorta data={porcentajeUsuarios}></GraficoTorta>
						</div>
					) : (
						<PildoraEst
							color='morado'
							clase='peque pildoraEstadistica'
							est='NO HAY USUARIOS INSTITUCION'
							estadistica
						/>
					)
				) : (
					<span className='loader'></span>
				)}

				{promedioNotasCursoAcumulado !== null ? (
					promedioNotasCursoAcumulado.length > 0 ? (
						<div className='graficoBarras acumulado'>
							<p>Promedio Acumulado x Grado</p>
							{console.log('aaaaas',promedioNotasCursoAcumulado)}
							<GraficoBarrasApiladas data={promedioNotasCursoAcumulado} />
						</div>
					) : (
						<PildoraEst
							color='morado'
							clase='peque pildoraEstadistica'
							est='NO HAY PROMEDIO X GRADOS ACUMULADO'
							estadistica
						/>
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
						<PildoraEst
							color='morado'
							clase='peque pildoraEstadistica'
							est='NO HAY ESTUDIANTES X GRADO'
							estadistica
						/>
					)
				) : (
					<span className='loader'></span>
				)}

				<>
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
								est='PROFESORES:'
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
				</>

				{promedioNotasCurso !== null ? (
					promedioNotasCurso.length > 0 ? (
						promedioNotasCurso.map(({ titulo, promedio }) => {
							return (
								<div className='graficoAguja'>
									<p>Grado {titulo}</p>
									<p>Promedio {promedio.toFixed(2)}</p>
									<GraficoAguja
										titulo={titulo}
										promedio={promedio}
									/>
								</div>
							);
						})
					) : (
						<PildoraEst
							color='morado'
							clase='peque pildoraEstadistica'
							est='NO HAY DATOS A MOSTRAR PROMEDIO MATERIAS GRADOS'
							estadistica
						/>
					)
				) : (
					<span className='loader'></span>
				)}

				{promedioMateriasCurso !== null ? (
					promedioMateriasCurso.length > 0 ? (
						promedioMateriasCurso.map(({ curso, informacion }) => {
							return (
								<>
									{informacion.length > 0 ? (
										<div
											key={curso}
											className={informacion.length <= 2 ? 'graficoBarras': 'graficoEspacial'}
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
export default AdminEstadisticas;

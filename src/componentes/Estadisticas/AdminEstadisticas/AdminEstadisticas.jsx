import React, { useState, useEffect, useRef } from 'react';
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
import * as html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
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

	// Refs para los gráficos
	const barraRef = useRef(null);
	const tortaRef = useRef(null);
	const agujaRefs = useRef(null); 
	const radarRefs = useRef(null); 

	// Ref para el contenedor oculto PDF
	const pdfRef = useRef(null);

	const handleDownloadPDF = async () => {
		// 1. Renderiza gráficos como imágenes
		const imgBarra = document.getElementById('img-barra');
		const imgTorta = document.getElementById('img-torta');

		if (barraRef.current) {
			const canvasBarra = await html2canvas(barraRef.current, { backgroundColor: null });
			imgBarra.src = canvasBarra.toDataURL('image/png');
		}
		if (tortaRef.current) {
			const canvasTorta = await html2canvas(tortaRef.current, { backgroundColor: null });
			imgTorta.src = canvasTorta.toDataURL('image/png');
		}

		// 2. Mostrar el contenedor oculto
		pdfRef.current.style.display = 'block';

		// 3. Espera un micro-momento para que las imágenes se pinten en el DOM
		await new Promise((res) => setTimeout(res, 200));

		// 4. Exporta a PDF
		await html2pdf().from(pdfRef.current).set({
			margin: 0.5,
			filename: 'Estadisticas_PRAE.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
		}).save();

		// 5. Oculta el contenedor otra vez
		pdfRef.current.style.display = 'none';
	};

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

	const colorPrincipal = user?.institucion?.color_principal || '#1680fc';

	const indicadorStyle = {
		background: '#eef1fa',
		border: '1.8px solidrgb(53, 142, 209)',
		borderRadius: 8,
		minWidth: 100,
		minHeight: 74,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '12px 18px'
		};
	const labelStyle = {
		fontSize: 13,
		color: '#3555d1',
		fontWeight: 600,
		marginBottom: 2,
		textTransform: 'uppercase',
		letterSpacing: 1.1
		};
	const valorStyle = {
		fontSize: 32,
		fontWeight: 800,
		color: '#1d2c5b',
		lineHeight: 1.1
		};

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
						<div className='graficoTorta' ref={tortaRef}>
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
								<div className='graficoAguja' ref={barraRef}>
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

			<div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
				<button className="btn-descargar-pdf" onClick={handleDownloadPDF}>
					Descargar PDF
				</button>
			</div>

			{/* CONTENEDOR OCULTO PARA EL PDF */}
			<div
				ref={pdfRef}
				style={{
					display: 'none',
					width: 750,
					background: '#fff',
					fontFamily: 'Segoe UI, Arial, sans-serif',
					color: '#222',
					borderRadius: 12,
					overflow: 'hidden',
					boxShadow: '0 4px 18px rgba(0,0,0,0.09)',
					position: 'relative'
				}}
				>
				{/* Encabezado azul */}
				<div style={{
				}}>

					{/* Espacio para el logo */}
					<div style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<img
						src="/LOGO.svg"
						alt="Logo PRAE"
						style={{ width: 100, height: 100 }}
					/>
					</div>
					<div style={{ 
						width: '90%',
						margin: '0 auto 0 auto',
						background: colorPrincipal,
						color: '#fff',
						fontWeight: 700,
						fontSize: 28,
						textAlign: 'center',
						borderRadius: 20,
						boxShadow: '0 4px 12px rgba(26, 132, 238, 0.21)',
						padding: '13px 0 13px 0',
						letterSpacing: 0.5,
						}}>
					Estadísticas - PRAE
					</div>
				</div>

				{/* Datos generales (institución y fecha) */}
				<div style={{ padding: '36px 38px 10px 38px', fontSize: 17, display: 'flex', gap: 36, flexWrap: 'wrap', marginBottom: 10 }}>
					<div><b>Institución:</b> {user?.institucion?.nombre}</div>
					<div><b>Fecha:</b> {new Date().toLocaleDateString()}</div>
				</div>

				{/* Línea separadora */}
				<div style={{ borderTop: '2.3px solidrgb(53, 121, 209)', width: '92%', margin: '0 auto 24px' }} />

				{/* Indicadores en bloques */}
				<div style={{ display: 'flex', gap: 26, padding: '0 38px 8px', justifyContent: 'center', marginBottom: 18 }}>
					<div style={indicadorStyle}><span style={labelStyle}>Materias</span><span style={valorStyle}>{cantidadMaterias}</span></div>
					<div style={indicadorStyle}><span style={labelStyle}>Grados</span><span style={valorStyle}>{cantidadGrados}</span></div>
					<div style={indicadorStyle}><span style={labelStyle}>Estudiantes</span><span style={valorStyle}>{cantidadEst}</span></div>
					<div style={indicadorStyle}><span style={labelStyle}>Docentes</span><span style={valorStyle}>{cantidadDocentes}</span></div>
				</div>

				{/* Gráficos */}
				<div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', padding: '18px 38px' }}>
					<div style={{ textAlign: 'center', flex: 1 }}>
					<div style={{ fontWeight: 500, fontSize: 17, marginBottom: 6, color: '#3555d1' }}></div>
					<img id="img-barra" alt="Gráfico de Barras" style={{ maxWidth: 330, borderRadius: 9, border: '1.2px solid #eee', margin: '10px auto 0' }} />
					</div>
					<div style={{ textAlign: 'center', flex: 1 }}>
					<div style={{ fontWeight: 500, fontSize: 17, marginBottom: 6, color: '#3555d1' }}></div>
					<img id="img-torta" alt="Gráfico de Torta" style={{ maxWidth: 250, borderRadius: 9, border: '1.2px solid #eee', margin: '10px auto 0' }} />
					</div>
				</div>

				<div style={{
					width: '100%',
					textAlign: 'center',
					marginTop: 48,
					marginBottom: 10,
					}}>

					{/* Logo + PRAE grande y azul */}
					<div style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 8,
						marginBottom: 6,
					}}>
						<img src="/LOGO.svg" alt="Logo PRAE" style={{ width: 40, height: 40 }} />
						<span style={{
						color: '#1680fc',
						fontWeight: 900,
						fontSize: 32,
						letterSpacing: 1,
						fontFamily: 'Segoe UI, Arial, sans-serif',
						}}>
						PRAE
						</span>
					</div>
					{/* Texto gris claro */}
					<div style={{
						color: '#868d96',
						fontSize: 15,
						marginBottom: 10,
						fontFamily: 'Segoe UI, Arial, sans-serif',
						fontWeight: 400,
					}}>
						Este informe fue generado automáticamente por el sistema PRAE.
					</div>
					{/* Barra azul */}
					<div style={{
						width: '100%',
						height: 8,
						background: colorPrincipal,
						borderRadius: 3,
						margin: '0 auto',
					}} />

				</div>
			</div>

		</WebSocketListener>
	);
};
export default AdminEstadisticas;

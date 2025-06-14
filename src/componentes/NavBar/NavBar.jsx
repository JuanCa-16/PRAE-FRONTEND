import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../Contexts/UserContext.jsx';
import { useUser } from '../../Contexts/UserContext.jsx';
import NavBarItem from './NavBarItem';
import {
	StudyIcon,
	AjustesIcon,
	InstitucionIcon,
	ListadoIcon,
	EstudianteIcon,
	TeacherIcon,
	GradosIcon,
	ExitIcon,
	ThemeIcon,
	MenuIcon,
	DataIcon,
	PeriodosIcon,
} from '../Icons/Icons.jsx';
import LogoPrae from '../LogoPrae/LogoPrae';
import PildoraEst from '../PildoraEst/PildoraEst';
import './NavBar.scss';

/**
 * Componente NavBar que renderiza una barra de navegación personalizada con opciones dinámicas basadas en el rol del usuario.
 * El menú de navegación cambia dependiendo de si el usuario es estudiante, docente o administrador.
 *
 * @component
 *
 * @param {string} [rol='normal'] - El rol del usuario (normal, estudiante, docente, admin), lo que determina qué menú se muestra.
 * @param {string} [nombreUsuario='NOMBRE APELLIDO'] - El nombre del usuario que se muestra en el menú.
 * @param {function} func - Función que se ejecuta al hacer clic en la opción de "Salir".
 * @param {string} [imagen] - Imagen personalizada para el logo, si no se proporciona se usa el logo predeterminado.
 * @param {string} [inst] - Estilo adicional que puede aplicarse al contenedor del NavBar.
 *
 * @returns {JSX.Element} El componente NavBar con enlaces dinámicos, íconos y funcionalidades según el rol del usuario.
 */

const NavBar = ({ rol = 'normal', nombreUsuario = 'NOMBRE APELLIDO', func, imagen, inst }) => {
	const menus = {
		normal: [
			{ texto: 'Materias', icono: StudyIcon, ruta: `#` },
			{ texto: 'Ajustes', icono: AjustesIcon, ruta: '#' },
		],
		estudiante: [
			{ texto: 'Materias', icono: StudyIcon, ruta: `/materias/${nombreUsuario}` },
			{ texto: 'Observaciones', icono: EstudianteIcon, ruta: '/observacionesEst' },
			{ texto: 'Ajustes', icono: AjustesIcon, ruta: '/ajustesEstudiante' },
			{ texto: 'Estadisticas', icono: DataIcon, ruta: '/estadisticasEstudiante' },
		],
		docente: [
			{ texto: 'Listado', icono: ListadoIcon, ruta: '/listadoCursos' },
			{ texto: 'Observaciones', icono: EstudianteIcon, ruta: '/observaciones' },
			{ texto: 'Ajustes', icono: AjustesIcon, ruta: '/editarPerfilDocente' },
			{ texto: 'Estadísticas', icono: DataIcon, ruta: '/estadisticasDocente' },
		],
		admin: [
			{ texto: 'Grados', icono: StudyIcon, ruta: '/crearGrados' },
			{ texto: 'Materias', icono: ListadoIcon, ruta: '/crearMaterias' },
			{ texto: 'Periodos', icono: PeriodosIcon, ruta: '/periodos' },
			{ texto: 'Profesores', icono: TeacherIcon, ruta: '/profesores' },
			{ texto: 'Estudiantes', icono: EstudianteIcon, ruta: '/estudiantes' },
			{ texto: 'Cursos', icono: GradosIcon, ruta: '/asignarGradosMaterias' },
			{ texto: 'Institución', icono: InstitucionIcon, ruta: '/institucion' },
			{ texto: 'Ajustes', icono: AjustesIcon, ruta: '/editarPerfilRector' },
			{ texto: 'Estadísticas', icono: DataIcon, ruta: '/estadisticasRector' },
		],
	};

	const menuSeleccionado = menus[rol] || menus.normal; // Usa el menú según el rol

	const navigate = useNavigate(); // Hook para redirigir
	const location = useLocation(); // Obtiene la ruta actual

	const handleClick = () => {
		rol === 'normal' ? navigate('#') : navigate('/login'); // Click del LOGOTIPO
	};

	useEffect(() => {
		// Forzar actualización del estado cuando cambie la ubicación
	}, [location.pathname]);

	//TRAER NOMBRE DEL TOKEN
	// const token= localStorage.getItem("token");

	// const grado= jwtDecode(token).email;

	const { user, abrir, setAbrir } = useUser();
	const grado = user.curso;

	const { theme, setTheme } = useTheme();
	const [hovered, setHovered] = useState(false);

	const [colorIcono, setColorIcono] = useState('');

	useEffect(() => {
		const colorPrincipal = user.institucion.color_principal;

		setColorIcono(colorPrincipal);
	}, [user]);

	const navRef = useRef(null);

	// Detectar clic fuera del menú
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setAbrir(false); // Cierra la NavBar si el clic fue afuera
			}
		};

		document.addEventListener('mousedown', handleClickOutside); // Agrega evento global

		return () => {
			document.removeEventListener('mousedown', handleClickOutside); // Limpia el evento al desmontar
		};
	}, [setAbrir]);

	
	useEffect(() => {
		if (abrir) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
	}, [abrir]);

	const itemActivo =
		menuSeleccionado.find((item) => decodeURIComponent(location.pathname).startsWith(item.ruta))?.texto ||
		'';

	return (
		<>
			{abrir && (
				<div
					className='overlay'
					onClick={() => setAbrir(false)}
				></div>
			)}
			<div
				ref={navRef}
				className={`contenedorNavBar ${abrir ? 'mostrar' : 'ocultar'} ${theme} ${inst}`}
			>
				<div className='menuSuperior'>
					<div className='tituloSuperior'>
						<div
							onClick={handleClick}
							className={`contLogo ${
								rol === 'docente'
									? 'doc'
									: rol === 'estudiante'
									? 'est'
									: 'rect'
							}`}
						>
							<LogoPrae
								imagen={imagen}
								color={
									rol === 'docente'
										? 'morado'
										: rol === 'estudiante'
										? 'azul'
										: 'amarillo'
								}
								texto={
									rol === 'docente'
										? 'DOCENTES'
										: rol === 'estudiante'
										? 'ESTUDIANTES'
										: 'RECTORES'
								}
							></LogoPrae>
						</div>
						<div className='iconosNav'>
							{rol !== 'normal' && (
								<div
									className='iconoTheme'
									onMouseEnter={() => setHovered(true)}
									onMouseLeave={() => setHovered(false)}
									onClick={() =>
										setTheme(
											theme === 'dark'
												? 'light'
												: 'dark'
										)
									}
								>
									<ThemeIcon
										color={colorIcono}
										colorApagado={colorIcono}
										estado={hovered}
										dark={theme === 'dark'}
									></ThemeIcon>
								</div>
							)}
							{rol !== 'normal' && (
								<div
									className='menuHamburgesa'
									onMouseEnter={() => setHovered(true)}
									onMouseLeave={() => setHovered(false)}
									onClick={() => setAbrir(!abrir)}
								>
									{' '}
									<NavBarItem
										tipo={true}
										texto={itemActivo}
										icono={MenuIcon}
									></NavBarItem>{' '}
									<MenuIcon
										color={colorIcono}
										colorApagado={colorIcono}
										estado={hovered}
										dark={theme === 'dark'}
									></MenuIcon>
								</div>
							)}
						</div>
					</div>
					<div className='linea'></div>
					<nav className='itemBar'>
						{menuSeleccionado.map((item, index) => (
							<NavBarItem
								key={index}
								icono={item.icono}
								texto={item.texto}
								ruta={item.ruta}
								activo={decodeURIComponent(
									location.pathname
								).startsWith(item.ruta)}
								onClick={abrir ? () => setAbrir(false) : () => {}}
							/>
						))}
						{rol !== 'normal' && (
							<NavBarItem
								func={func}
								icono={ExitIcon}
								texto={'Salir'}
								ruta='/login'
							/>
						)}
					</nav>
				</div>

				<div className='txtInferior'>
					{rol === 'estudiante' ? (
						<PildoraEst
							est={nombreUsuario}
							curso={grado}
						></PildoraEst>
					) : rol === 'docente' ? (
						<NavBarItem
							tipo={true}
							texto={nombreUsuario}
						></NavBarItem>
					) : (
						<NavBarItem
							tipo={true}
							texto={nombreUsuario}
							color='amarillo'
						></NavBarItem>
					)}
				</div>
			</div>
		</>
	);
};

export default NavBar;

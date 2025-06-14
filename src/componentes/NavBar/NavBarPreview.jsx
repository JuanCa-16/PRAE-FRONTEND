import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext.jsx';
import { StudyIcon, AjustesIcon } from '../Icons/Icons.jsx';
import NavBarItem from './NavBarItem';
import LogoPrae from '../LogoPrae/LogoPrae';
import PildoraEst from '../PildoraEst/PildoraEst';
import './NavBarPreview.scss';

/**
 * Componente NavBarPreview que renderiza una barra de navegación para la vista previa en personalizar institución.
 * Muestra el logo y las opciones de navegación para los roles definidos.
 * 
 * @component
 * 
 * @param {string} [rol='normal'] - El rol del usuario (normal, estudiante, docente, admin), lo que determina qué menú se muestra.
 * @param {string} [nombreUsuario='JUAN CAMILO HENAO GALLEGO'] - El nombre del usuario que se muestra en el menú.
 * @param {string} [imagen] - Imagen personalizada para el logo, si no se proporciona se usa el logo predeterminado.
 * 
 * @returns {JSX.Element} El componente NavBarPreview con la personalización actual.
 */

const NavBarPreview = ({ rol = 'normal', nombreUsuario = 'JUAN CAMILO HENAO GALLEGO', imagen }) => {
	const menus = {
		normal: [
			{ texto: 'Materias', icono: StudyIcon, ruta: '#' },
			{ texto: 'Ajustes', icono: AjustesIcon, ruta: '#' },
		],
	};

	const menuSeleccionado = menus[rol] || menus.normal; // Usa el menú según el rol

	const navigate = useNavigate(); // Hook para redirigir
	const location = useLocation(); // Obtiene la ruta actual

	const handleClick = () => {
		navigate('#');
	};

	useEffect(() => {
		// Forzar actualización del estado cuando cambie la ubicación
	}, [location.pathname]);

	//TRAER NOMBRE DEL TOKEN
	// const token= localStorage.getItem("token");

	// const grado= jwtDecode(token).email;

	const { user } = useUser();
	const grado = user.curso;

	return (
		<div className={`contenedorNavBarPreview`}>
			<div className='menuSuperior'>
				<div className='tituloSuperior'>
					<div
						onClick={handleClick}
						className='contLogo'
					>
						<LogoPrae
							imagen={imagen}
							color={'azul'}
							texto={'RECTORES'}
						></LogoPrae>
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
							activo={decodeURIComponent(location.pathname).startsWith(
								item.ruta
							)}
						/>
					))}
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
	);
};

export default NavBarPreview;

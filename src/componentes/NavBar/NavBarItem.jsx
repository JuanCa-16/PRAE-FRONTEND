import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Contexts/UserContext.jsx';
import { useUser } from '../../Contexts/UserContext.jsx';
import { HomeIcon } from '../Icons/Icons.jsx';
import './NavBarItem.scss';

/**
 * Componente NavBarItem que representa un ítem en la barra de navegación, con un ícono y texto.
 * Permite la navegación dinámica según el rol del usuario y la ruta proporcionada.
 * 
 * @component
 * 
 * @param {React.Component} [icono=HomeIcon] - El ícono que se mostrará en el ítem de navegación. Por defecto, es el ícono de inicio (`HomeIcon`).
 * @param {string} [texto='Principal'] - El texto que se mostrará en el ítem de navegación.
 * @param {string} [ruta='/'] - La ruta a la que navegará el usuario al hacer clic en el ítem.
 * @param {boolean} [tipo] - Determina si el ítem tiene un estilo especial.
 * @param {string} [color] - Clase adicional para el color del ítem de navegación.
 * @param {boolean} [activo=false] - Si el ítem está activo (resaltado), lo marcará como tal.
 * @param {function} [func] - Función que se ejecuta al hacer clic en el ítem de navegación (si se proporciona).
 * @param {function} [onClick] - Función adicional que se ejecuta al hacer clic en el ítem (por defecto es una función vacía).
 * 
 * @returns {JSX.Element} Un ítem de navegación con ícono, texto y comportamiento dinámico.
 */


const NavBarItem = ({
	icono: Icon = HomeIcon,
	texto = 'Principal',
	ruta = '/',
	tipo,
	color,
	activo,
	func,
	onClick = () => {},
}) => {
	const navigate = useNavigate(); // Hook para redirigir

	const { theme } = useTheme();

	const handleClick = () => {
		if (tipo === true) return; // Evita la ejecución si `tipo` es true

		if (func) {
			return func();
		}

		if (ruta) {
			navigate(ruta);
			onClick();
		}
	};

	const { user } = useUser();

	const [colorIcono, setColorIcono] = useState('');

	useEffect(() => {
		const colorPrincipal = user.institucion.color_principal;

		setColorIcono(colorPrincipal);
	}, [user]);

	const [hovered, setHovered] = useState(false);

	return (
		<div
			className={` ${theme} ${tipo ? 'tipo-existe color' : 'contenedorNavBarItem '} ${color}  ${
				activo ? 'activar' : ' '
			}`}
			onClick={handleClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className='etiqueta'>
				{tipo === undefined || tipo === null ? (
					<div className='logoNav'>
						{' '}
						<Icon
							color={colorIcono}
							colorApagado={colorIcono}
							estado={hovered}
							activo={activo}
							dark={theme === 'dark'}
						/>{' '}
					</div>
				) : (
					<></>
				)}
				<p className='texto lato'>{tipo ? texto.toUpperCase() : texto}</p>
			</div>
		</div>
	);
};

export default NavBarItem;

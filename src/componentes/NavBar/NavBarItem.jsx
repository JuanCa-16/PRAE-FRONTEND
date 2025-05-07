import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Contexts/UserContext.jsx';
import { useUser } from '../../Contexts/UserContext.jsx';
import { HomeIcon } from '../Icons/Icons.jsx';
import './NavBarItem.scss';

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

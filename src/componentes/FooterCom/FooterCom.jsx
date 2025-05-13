import React, { useState, useEffect } from 'react';
import { useUser } from '../../Contexts/UserContext';
import { FacebookIcon, InstagramIcon } from '../Icons/Icons';
import './FooterCom.scss';

/**
 * Componente FooterCom que muestra el pie de página de la aplicación, con información de la institución, redes sociales y logo.
 * 
 * @component
 * 
 * @param {string} [imagen] - URL de una imagen de logo personalizada. Si no se proporciona, se usa el logo de la institución.
 * 
 * @returns {JSX.Element} El pie de página con la información de la institución y los iconos de redes sociales.
 */

const FooterCom = ({ imagen }) => {
	const { user } = useUser();
	const [colorHex, setColorHex] = useState('');
	const [colorHex2, setColorHex2] = useState('');
	const [hovered, setHovered] = useState(false);
	const [hovered2, setHovered2] = useState(false);

	useEffect(() => {
		const updateColors = () => {
			setColorHex(
				getComputedStyle(document.documentElement).getPropertyValue('--colorMezclado').trim()
			);
			setColorHex2(
				getComputedStyle(document.documentElement).getPropertyValue('--colorMezclado2').trim()
			);
		};

		updateColors(); // Aplicar colores al cargar

		const observer = new MutationObserver(updateColors);
		observer.observe(document.documentElement, {
			attributes: true,
			subtree: true,
			attributeFilter: ['style'],
		});

		return () => observer.disconnect();
	}, [user]);

	return (
		<footer className={`contenedorFooter `}>
			<div className='contenedor'>
				<h3 className='bold'>{user.institucion.nombre} </h3>
				<div className='info'>
					<div className='redes'>
						{user.institucion.facebook && (
							<a
								href={user.institucion.facebook}
								target='_blank'
								rel='noopener noreferrer'
								className='logo'
								onMouseEnter={() => setHovered(true)}
								onMouseLeave={() => setHovered(false)}
							>
								<FacebookIcon
									colorApagado={colorHex}
									color={colorHex2}
									estado={hovered}
								/>
							</a>
						)}
						{user.institucion.instagram && (
							<a
								href={user.institucion.instagram}
								target='_blank'
								rel='noopener noreferrer'
								className='logo'
								onMouseEnter={() => setHovered2(true)}
								onMouseLeave={() => setHovered2(false)}
							>
								<InstagramIcon
									colorApagado={colorHex}
									color={colorHex2}
									estado={hovered2}
								/>
							</a>
						)}
					</div>
					{user.institucion.telefono && (
						<p className='lato'>
							<span className='lato bold'>Teléfono: </span>
							{user.institucion.telefono}
						</p>
					)}
					{user.institucion.direccion && (
						<p className='lato'>
							<span className='lato bold'>Dirección: </span>
							{user.institucion.direccion}
						</p>
					)}
				</div>
			</div>
			<div className='contenedorImg'>
				{imagen ? (
					<img
						className='logo'
						alt=''
						src={imagen}
					/>
				) : (
					<img
						className='logo'
						alt=''
						src={
							user.institucion.logo
								? user.institucion.logo
								: 'https://firebasestorage.googleapis.com/v0/b/praeweb-a1526.firebasestorage.app/o/logos%2FLOGO_SOMBRERO.svg?alt=media&token=d2e2d361-8a9f-45e0-857d-2e7408c9422d '
						}
					/>
				)}
			</div>
		</footer>
	);
};

export default FooterCom;

import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './LogoPrae.scss';

/**
 * Componente LogoPrae que muestra el logo de la aplicación junto con un texto personalizado.
 * Permite personalizar el color del texto y la imagen del logo.
 * 
 * @component
 * 
 * @param {string} [texto='ESTUDIANTES'] - El texto que se muestra junto al logo (por ejemplo, "ESTUDIANTES").
 * @param {string} [color] - El color del texto, que se aplica a la clase del elemento.
 * @param {string} [imagen] - URL de la imagen del logo. Si no se proporciona, se usa un logo por defecto.
 * 
 * @returns {JSX.Element} Un contenedor con el logo y el texto correspondiente.
 */

const LogoPrae = ({ texto = 'ESTUDIANTES', color, imagen }) => {
	const { theme } = useTheme();

	return (
		<div className={`logoContenedor ${theme}`}>
			<img
				className='logoPrae'
				alt=''
				src={
					imagen
						? imagen
						: 'https://firebasestorage.googleapis.com/v0/b/praeweb-a1526.firebasestorage.app/o/logos%2FLOGO_SOMBRERO.svg?alt=media&token=d2e2d361-8a9f-45e0-857d-2e7408c9422d '
				}
			/>
			<div className='textos'>
				<p className='bold'>PRAE</p>
				<p className={`${color} texto`}>{texto}</p>
			</div>
		</div>
	);
};

export default LogoPrae;

import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './Line.scss';

/**
 * Componente Line que renderiza una línea horizontal con estilo personalizado basado en el tema actual.
 * Utilizado para separar visualmente secciones en la interfaz de usuario.
 * 
 * @component
 * 
 * @returns {JSX.Element} Una línea horizontal que se adapta al tema de la aplicación.
 */

const Line = () => {
	const { theme } = useTheme();
	return <div className={`linea ${theme}`}></div>;
};

export default Line;

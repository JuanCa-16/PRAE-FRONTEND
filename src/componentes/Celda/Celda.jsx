import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './Celda.scss';

/**
 * Componente Celda que se utiliza para mostrar un texto con estilos personalizados.
 * 
 * @component
 * 
 * @param {string} txt - El texto que se mostrará dentro de la celda (por defecto es "Valor").
 * @param {string} [color] - El color de la celda (puede ser un valor como "rojo", "verde", etc.).
 * @param {string} [tipo='titulo'] - El tipo de celda, puede ser usado para diferenciar entre diferentes estilos (por defecto es "titulo").
 * @param {string} [rol='ver'] - El rol de la celda, determina si tiene un comportamiento de visualización o de interacción (por defecto es "ver").
 * @param {function} onClick - Función que se ejecuta cuando la celda es clickeada.
 */

const Celda = ({ txt = 'Valor', color, tipo = 'titulo', rol = 'ver', clase, onClick }) => {
	const { theme } = useTheme();
	return (
		<div
			className={`${theme} celda ${clase} ${tipo} ${rol} ${color}`}
			onClick={onClick}
		>
			<p>{txt}</p>
		</div>
	);
};

export default Celda;

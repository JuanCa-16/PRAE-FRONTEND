import React, { useState } from 'react';
import Select from 'react-select';
import { useTheme } from '../../Contexts/UserContext';
import './Selector.scss';

/**
 * Componente Selector que renderiza un campo de selección múltiple o único con opciones personalizadas.
 * Utiliza **react-select** para manejar las opciones de selección.
 * 
 * @component
 * 
 * @param {string} titulo - El título que se muestra sobre el selector.
 * @param {boolean} [multi=true] - Si es `true`, permite la selección múltiple de opciones.
 * @param {boolean} [disabled=false] - Si es `true`, deshabilita el selector.
 * @param {Array} opciones - Las opciones que se mostrarán en el selector.
 * @param {Array} valores - Los valores seleccionados actualmente.
 * @param {function} onChange - Función que se ejecuta cuando se cambia la selección.
 * @param {string} [placeholder] - Texto que aparece cuando no hay opciones seleccionadas.
 * @param {string} [mensajeVacio='No hay opciones disponibles'] - Mensaje que se muestra cuando no hay opciones disponibles.
 * 
 * @returns {JSX.Element} Un campo de selección con las opciones proporcionadas y con soporte para selección múltiple o única.
 */

const Selector = ({
	titulo,
	multi = true,
	disabled = false,
	opciones,
	valores,
	onChange,
	placeholder,
	mensajeVacio = 'No hay opciones disponibles',
}) => {
	const { theme } = useTheme();
	const [isFocused, setIsFocused] = useState(false);
	return (
		<div className={`selector ${theme}`}>
			<p className={`input-title lato ${isFocused ? 'focused' : ''}`}>{titulo}</p>
			<Select
				// menuIsOpen={true}
				classNamePrefix='react-select'
				className='inputSelect'
				isMulti={multi}
				options={opciones}
				value={valores}
				isDisabled={disabled}
				onChange={onChange}
				placeholder={placeholder}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				noOptionsMessage={() => mensajeVacio}
			/>
		</div>
	);
};

export default Selector;

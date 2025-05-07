import React, { useState } from 'react';
import Select from 'react-select';
import { useTheme } from '../../Contexts/UserContext';
import './Selector.scss';

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

import React, { useState, useId } from 'react';
import { useTheme } from '../../Contexts/UserContext';
import { EyeIcon, EyeIconBlock } from '../Icons/Icons';
import './InputContainer.scss';

/**
 * Componente InputContainer que renderiza un campo de entrada personalizado con soporte para mostrar/ocultar contraseñas.
 * 
 * @component
 * 
 * @param {string} [className] - Clase adicional para aplicar estilos personalizados al contenedor.
 * @param {string} [placeholder='correo@gmail.com'] - Texto que aparece como marcador de posición en el campo de entrada.
 * @param {string} [titulo='correo electronico:'] - Título que se muestra junto al campo de entrada.
 * @param {string} [inputType='email'] - Tipo del input (por defecto es 'email', puede ser 'password', 'file', etc.).
 * @param {string} [value=''] - Valor inicial del campo de entrada.
 * @param {boolean} [required=false] - Si es `true`, el campo será obligatorio.
 * @param {boolean} [isDisabled=false] - Si es `true`, el campo estará deshabilitado.
 * @param {string} [nomInput] - Nombre del input, utilizado en el atributo `name`.
 * @param {function} [onChange] - Función que se llama cuando el valor del input cambia.
 * 
 * @returns {JSX.Element} Un contenedor con un campo de entrada, con soporte para mostrar/ocultar contraseñas.
 */


function InputContainer({
	className,
	placeholder = 'correo@gmail.com',
	titulo = 'correo electronico:',
	inputType = 'email',
	value = '',
	required = false,
	isDisabled = false,
	nomInput,
	onChange = () => {},
	tituloDisabled,
	minInicio
}) {
	const [isFocused, setIsFocused] = useState(false);
	const { theme } = useTheme();
	// Estado interno para manejar el valor del input
	// const [inputValue, setInputValue] = useState(value);

	// Función para actualizar el valor del input
	const handleInputChange = (event) => {
		// setInputValue(event.target.value);
		if (inputType === 'file') {
			onChange(event); // Pasamos el evento completo
		} else {
			onChange(event.target.value);
		}
	};

	const uniqueId = useId();

	const [ver, setVer] = useState(false);

	const manejarClick = () => {
		setVer(!ver);
	};

	return (
		<div className={`${theme} ${className} input-container ${isDisabled ? 'NoHover' : 'siHover'}`}>
			<p
				htmlFor='input-field'
				className={`input-title lato ${isFocused ? 'focused' : ''}`}
			>
				{titulo}
			</p>

			<div className='agruparInput'>
				<input
					type={inputType === 'password' ? (ver ? 'text' : 'password') : inputType}
					id={uniqueId}
					placeholder={placeholder}
					className={`input-field ${inputType === 'password' ? 'contra' : ''}`}
					value={value}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={handleInputChange}
					required={required}
					disabled={isDisabled}
					name={nomInput}
					inputMode={inputType === 'number'? 'numeric' : undefined}
					title={isDisabled && tituloDisabled? tituloDisabled: undefined}
					min={inputType === 'date'? minInicio : undefined}
				/>

				{inputType === 'password' && value.length > 0 && (
					<div
						className='logoOjo'
						onClick={manejarClick}
					>
						{ver ? <EyeIconBlock></EyeIconBlock> : <EyeIcon></EyeIcon>}
					</div>
				)}
			</div>
		</div>
	);
}

export default InputContainer;

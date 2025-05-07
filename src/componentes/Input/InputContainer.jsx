import React, { useState, useId } from 'react';
import { useTheme } from '../../Contexts/UserContext';
import { EyeIcon, EyeIconBlock } from '../Icons/Icons';
import './InputContainer.scss';

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

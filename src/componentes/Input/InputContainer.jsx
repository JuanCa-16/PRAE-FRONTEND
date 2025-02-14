import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import '../../global.scss'
import './InputContainer.scss'
import { useState } from 'react';

function InputContainer({ placeholder = "correo@gmail.com",
    titulo = "correo electronico:",
    inputType = "email",
    value = "",    // Añadimos la prop 'value' para controlar el valor del input
    required = false, // Añadimos la prop 'required' para la validación
    nomInput,
    onChange = () => {} // Añadimos 'onChange' para manejar los cambios en el input
}) {

    const [isFocused, setIsFocused] = useState(false);

    // Estado interno para manejar el valor del input
    const [inputValue, setInputValue] = useState(value);

    // Función para actualizar el valor del input
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value); // Pasamos el nuevo valor al 'onChange' recibido como prop
    };

    return (
        <div className="input-container">

            <p htmlFor="input-field" className={`input-title lato ${isFocused ? 'focused' : ''}`}>
            {titulo}</p>
    
            <input
                type={inputType}
                id="input-field"
                placeholder={placeholder}
                className="input-field"
                value={inputValue}  // Vinculamos el valor del input al estado
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleInputChange} // Llamamos a la función para manejar el cambio
                required={required} // Si 'required' es true, el input será obligatorio
                name={nomInput}
            />
        </div>
    );
}

// Validación de las props usando PropTypes
InputContainer.propTypes = {
    placeholder: PropTypes.string,
    titulo: PropTypes.string,
    inputType: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,  // Validación para la función 'onChange'
};

export default InputContainer;
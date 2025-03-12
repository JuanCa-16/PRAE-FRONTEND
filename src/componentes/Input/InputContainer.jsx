import React from 'react'
import PropTypes from 'prop-types';
import './InputContainer.scss'
import { useState } from 'react';
import { useId } from 'react';
import { useTheme } from '../../Contexts/UserContext';

/** 
 * Componente: InputContainer
 * Descripción: Renderiza un Input personalizado.
 * Props:
 *      - placeholder (string): Texto de ejemplo dentro del input (por defecto: "correo@gmail.com").
 *      - titulo (string): Texto que aparecerá como título del input (por defecto: "correo electronico:").
 *      - inputType (string): Tipo de input (por defecto: "email").
 *      - value (string): Valor del input, útil para controlarlo desde un estado externo (por defecto: "").
 *      - required (bool): Indica si el campo es obligatorio (por defecto: false).
 *      - isDisabled (bool): Deshabilita el input cuando es true (por defecto: false).
 *      - nomInput (string): Nombre del input para formularios.
 *      - onChange (func): Función que se ejecuta cuando el valor del input cambia.
 */
function InputContainer({className, placeholder = "correo@gmail.com", titulo = "correo electronico:", inputType = "email", value = "", required = false, isDisabled= false, nomInput, onChange = () => {}}) {

    const [isFocused, setIsFocused] = useState(false);
    const {theme} = useTheme()
    // Estado interno para manejar el valor del input
    // const [inputValue, setInputValue] = useState(value);

    // Función para actualizar el valor del input
    const handleInputChange = (event) => {
        // setInputValue(event.target.value);
        if (inputType === "file") {
        onChange(event); // Pasamos el evento completo
    } else {
        onChange(event.target.value);
    }
    };

    const uniqueId = useId();

    return (
        <div className={`${theme} ${className} input-container ${isDisabled? 'NoHover' : 'siHover'}`}>

            <p htmlFor="input-field" className={`input-title lato ${isFocused? 'focused' : ''}`}>
            {titulo}</p>
    
            <input
                type={inputType}
                id={uniqueId} 
                placeholder={placeholder}
                className={`input-field`}
                value= {value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleInputChange} 
                required={required} 
                disabled={isDisabled} 
                name={nomInput}
            />
        </div>
    );
}

InputContainer.propTypes = {
    placeholder: PropTypes.string,
    titulo: PropTypes.string,
    inputType: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    isDisabled: PropTypes.bool,
    nomInput: PropTypes.string,
    onChange: PropTypes.func,
};

export default InputContainer;
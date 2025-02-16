import React from 'react'
import PropTypes from 'prop-types';
import "./LogoPrae.scss";

/** 
 * Componente: LogoPrae
 * Descripción: Renderiza un logotipo con texto dinámico y color personalizado.
 * Props:
 *      - texto (string): Texto que se mostrará debajo del logo (por defecto: "ESTUDIANTES").
 *      - color (string): Clase CSS para definir el color del texto. Solo puede ser "azul", "morado" o "amarillo".
 */

const LogoPrae = ({texto = "ESTUDIANTES", color}) => {
    return (
    <div className="logoContenedor">
        <img className="logoPrae" alt="" src="LOGO.svg"/>
        <p className="bold">PRAE</p>
        <p className={`${color}`}>{texto}</p>
    </div>
    )
}

LogoPrae.propTypes = {
    texto: PropTypes.string,      
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), 
};
export default LogoPrae

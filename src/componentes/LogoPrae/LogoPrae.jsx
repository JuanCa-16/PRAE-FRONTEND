import React from 'react'
import PropTypes from 'prop-types';
import '../../global.scss'
import "./LogoPrae.scss";
const LogoPrae = ({texto = "RECTORES", color="amarillo"}) => {
    return (
    <div className="logoContenedor">
        <img className="logoPrae" alt="" src="LOGO.svg"/>
        <p className="bold">PRAE</p>
        <p className={`${color}`}>{texto}</p>
    </div>
    )
}
LogoPrae.propTypes = {
    texto: PropTypes.string,         // Asegura que `texto` sea una cadena de texto
    color: PropTypes.string,         // Asegura que `color` sea una cadena de texto
};

export default LogoPrae

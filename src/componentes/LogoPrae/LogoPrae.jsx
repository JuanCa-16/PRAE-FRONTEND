import React from 'react'
import PropTypes from 'prop-types';
import "./LogoPrae.scss";
// import icono from "../../assets/icono.svg"
import { useTheme } from '../../Contexts/UserContext';

/** 
 * Componente: LogoPrae
 * Descripción: Renderiza un logotipo con texto dinámico y color personalizado.
 * Props:
 *      - texto (string): Texto que se mostrará debajo del logo (por defecto: "ESTUDIANTES").
 *      - color (string): Clase CSS para definir el color del texto. Solo puede ser "azul", "morado" o "amarillo".
 */

const LogoPrae = ({texto = "ESTUDIANTES", color,imagen}) => {
    const {theme} = useTheme()

    return (
    <div className={`logoContenedor ${theme}`}>
        <img className="logoPrae" alt="" src={imagen? imagen : 'https://firebasestorage.googleapis.com/v0/b/praeweb-a1526.firebasestorage.app/o/logos%2FLOGO_SOMBRERO.svg?alt=media&token=d2e2d361-8a9f-45e0-857d-2e7408c9422d '}/>
        <div className="textos">
            <p className="bold">PRAE</p>
            <p className={`${color} texto`}>{texto}</p>
        </div>
    </div>
    )
}

LogoPrae.propTypes = {
    texto: PropTypes.string,      
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), 
};
export default LogoPrae

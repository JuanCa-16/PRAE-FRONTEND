import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import './PildoraTitulo.scss'
import { useTheme } from '../../Contexts/UserContext';
//Fucnion para poner mayusculas iniciales
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Componente: PildoraTitulo
 * Descripción: Representa una tarjeta con información de un estudiante, su materia y su nota.
 * Props:
 *      - color (string): Define el color de la píldora. Puede ser "azul", "morado" o "amarillo".
 *      - nombre (string): Nombre del estudiante. Se mostrará con mayúscula inicial en cada palabra.
 *      - materia (string): Nombre de la materia. Se mostrará en mayúsculas.
 *      - nota (string): Nota del estudiante.
 *      - grado (string): grado del estudiante.
 */

const PildoraTitulo = ({color="azul", nombre="Juan Camilo Henao", materia="CALCULO II", nota = "4.5", grado}) => {
    
    const {theme} = useTheme()
    return (
        <div className={`${theme} contenedorPilaTitulo ${color} `}>
            <div className="infoContainer">
                <div className="info">
                    <p className='lato nombre'>{capitalizeWords(nombre)}</p>
                    <h4 className='inter bold materia'>{materia.toUpperCase()}</h4>
                    <p className='lato nombre'>{grado}</p>
                </div>
                <h2 className='nota inter bold'>{nota}</h2>
            </div>
            <div className="elipse1"></div>
            <div className="elipse2"></div>
        </div>
    )
}

PildoraTitulo.propTypes = {
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), // El color solo puede ser "azul", "morado" o "amarillo"
    nombre: PropTypes.string.isRequired, // El nombre es obligatorio y debe ser una cadena de texto
    materia: PropTypes.string.isRequired, // La materia es obligatoria y debe ser una cadena de texto
    nota: PropTypes.string.isRequired, // La nota es obligatoria y debe ser una cadena de texto
    grado: PropTypes.string.isRequired, // La nota es obligatoria y debe ser una cadena de texto
};

export default PildoraTitulo

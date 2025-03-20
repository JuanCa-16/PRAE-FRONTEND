import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import './Pildora.scss'
import { useTheme } from '../../Contexts/UserContext';

/**
 * Componente: Pildora
 * Descripción: Representa un componente visual tipo "píldora" con informacion de la materia profesor y grado.
 * Props:
 *      - titulo (string): Texto principal, se convierte a mayúsculas. (MATERIA)
 *      - txtsuperior (string): Texto superior, se capitaliza cada palabra. (PROFESOR)
 *      - txtinferior (string): Texto inferior opcional. (GRADO opcional)
 *      - color (string): Solo permite "azul", "morado" o "amarillo".
 *      - onClick (func): Función a ejecutar cuando se hace clic en la píldora.
 */

const Pildora = ({titulo = "CALCULO 1", txtsuperior = "Juan Manuel", txtinferior, color, onClick}) => {
    
    const {theme} = useTheme()
    return (
        <div className={`pildora ${color} ${theme}`} onClick={onClick}>
            <div className="info">
                <p className="texto superior lato">{txtsuperior}</p>
                <h4 className="titulo inter bold">{titulo.toUpperCase()}</h4>
                <p className="texto inferior lato"> {txtinferior}</p>
            </div>
            <div className="elipse1" />
            <div className="elipse2"/>
        </div>
    )
}

Pildora.propTypes = {
    titulo: PropTypes.string.isRequired,  
    txtsuperior: PropTypes.string,        
    txtinferior: PropTypes.string,        
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), 
    onClick: PropTypes.func               
};

export default Pildora

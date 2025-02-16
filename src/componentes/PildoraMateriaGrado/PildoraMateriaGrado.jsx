import React from 'react'
import PropTypes from 'prop-types';
import './PildoraMateriaGrado.scss'


/**
 * Componente: PildoraMateriaGrado
 * Descripción: Representa una píldora que muestra el nombre de una materia o grado con un color específico.
 * Props:
 *      - color (string): Define el color de la píldora. Puede ser "azul", "morado" o "amarillo".
 *      - texto (string): Texto que se mostrará en la píldora (por defecto "CALCULO I").
 *      - onClick (func): Función opcional que se ejecuta al hacer clic en la píldora.
 */

const PildoraMateriaGrado = ({color = "azul", texto = "CALCULO I", onClick}) => {
    return (
        <div className= {`contenedorPildoraG ${color}`} onClick={onClick}>  
            <div className="materia">
                    <h4 className='inter'>{texto.toUpperCase()}</h4>
                    <div className='elipse1'></div>
                    <div className='elipse2'></div>
            </div>
        </div>
    )
}

PildoraMateriaGrado.propTypes = {
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), // El color solo puede ser uno de estos tres valores
    texto: PropTypes.string, // El texto debe ser una cadena de caracteres
    onClick: PropTypes.func, // onClick es una función opcional
};

export default PildoraMateriaGrado


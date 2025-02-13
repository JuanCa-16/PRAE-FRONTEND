import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import '../../global.scss'
import './PildoraMateriaGrado.scss'

const PildoraMateriaGrado = ({color = "azul", texto = "CALCULO I"}) => {
    return (
        <div className= {`contenedorPildoraG ${color}`} >  
            <div className="materia">
                    <h4 className='inter'>{texto}</h4>
                    <div className='elipse1'></div>
                    <div className='elipse2'></div>
            </div>
        </div>
    )
}

// Validación de las propiedades
PildoraMateriaGrado.propTypes = {
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]),  // El color debe ser uno de esos tres valores
    texto: PropTypes.string, // 'texto' debe ser una cadena de caracteres
};


export default PildoraMateriaGrado


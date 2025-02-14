import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import '../../global.scss'
import './PildoraTitulo.scss'



const PildoraTitulo = ({color="morado", nombre="Juan Camilo Henao", materia="CALCULO II", nota = "4.5"}) => {
    return (
        <div className={`contenedorPilaTitulo ${color} `}>
            <div className="infoContainer">
                <div className="info">
                    <p className='lato nombre'>{nombre}</p>
                    <h4 className='inter bold materia'>{materia}</h4>
                </div>
                <h2 className='nota inter bold'>{nota}</h2>
            </div>
            <div className="elipse1"></div>
            <div className="elipse2"></div>
        </div>
    )
}

PildoraTitulo.propTypes = {
    color: PropTypes.string,  // Debe ser una cadena de texto (opcional)
    nombre: PropTypes.string, // Debe ser una cadena de texto (opcional)
    materia: PropTypes.string, // Debe ser una cadena de texto (opcional)
    nota: PropTypes.string,    // Debe ser una cadena de texto (opcional)
};

export default PildoraTitulo

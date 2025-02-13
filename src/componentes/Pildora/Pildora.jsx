import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import '../../global.scss'
import './Pildora.scss'


const Pildora = ({titulo = "CALCULO 1", txtsuperior = "Juan Manuel Valencia", txtinferior, color}) => {
    return (
        <div className={`pildora ${color}`}>
            <div className="info">
                <p className="texto superior lato">{txtsuperior}</p>
                <h4 className="titulo inter bold">{titulo}</h4>
                <p className="texto inferior lato"> {txtinferior}</p>
            </div>
            <div className="elipse1" />
            <div className="elipse2"/>
        </div>
    )
}

export default Pildora

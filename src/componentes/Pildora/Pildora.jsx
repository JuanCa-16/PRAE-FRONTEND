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
Pildora.propTypes = {
    titulo: PropTypes.string,          // 'titulo' es opcional y debe ser un string
    txtsuperior: PropTypes.string,     // 'txtsuperior' es opcional y debe ser un string
    txtinferior: PropTypes.string,     // 'txtinferior' es opcional y debe ser un string
    color: PropTypes.string           // 'color' es opcional y debe ser un string
};

export default Pildora

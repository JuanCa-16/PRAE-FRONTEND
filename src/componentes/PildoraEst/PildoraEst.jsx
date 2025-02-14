import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import '../../global.scss'
import './PildoraEst.scss'

const PildoraEst = ({color = "azul", est = "JUAN CAMILO HENAO GALLEGO", curso = "11-2", clase="grande"}) => {
    return (
        <div className={`pildoraEst ${clase} ${color}`}>
            <div className="contenedor">
                <p className="nombre bold">{est}</p>
                <h4 className="inter curso">{curso}</h4>
            </div>
                <div className="elipse2" />
                <div className="elipse1" />
        </div>
    )
}

PildoraEst.propTypes = {
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), // Define los colores permitidos
    est: PropTypes.string, // El nombre del estudiante es una cadena de texto
    curso: PropTypes.string, // El curso es una cadena de texto
    clase: PropTypes.oneOf(["grande", "pequeña"]), // Define las clases posibles
}

export default PildoraEst

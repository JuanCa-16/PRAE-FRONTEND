import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import './PildoraEst.scss'
import { useTheme } from '../../Contexts/UserContext';
/**
 * Componente: PildoraEst
 * Descripción: Representa una tarjetacon información de un estudiante (Nombre y Curso).
 * Props:
 *      - color (string): Puede ser "azul", "morado" o "amarillo".
 *      - est (string) [obligatorio]: Nombre del estudiante.
 *      - curso (string) [obligatorio]: Curso del estudiante.
 *      - clase (string) [opcional]: Tamaño de la píldora, puede ser "grande" o "peque" (por defecto "grande").
 *      - onClick (func): Función a ejecutar cuando se hace clic en la píldora.
 */
const PildoraEst = ({color = "azul", est = "JUAN CAMILO HENAO GALLEGO", curso = "11-2", clase="grande", onClick, estadistica=false,children}) => {
    
    const {theme} = useTheme()
    
    return (


        <div className={`pildoraEst ${clase} ${color} ${theme}`} onClick={onClick}>
            <div className="contenedor">
                <p className="nombre bold">{est.toUpperCase()}</p>
                {!estadistica? (<h4 className="inter curso">{curso}</h4>):<h4 className="inter curso">{children}</h4>}
                
            </div>
                <div className="elipse2" />
                <div className="elipse1" />
        </div>
    )
}

PildoraEst.propTypes = {
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), 
    est: PropTypes.string.isRequired, 
    curso: PropTypes.string.isRequired, 
    clase: PropTypes.oneOf(["grande", "peque"]),
    onClick: PropTypes.func,
    estadistica: PropTypes.bool,
    children: PropTypes.node
};


export default PildoraEst

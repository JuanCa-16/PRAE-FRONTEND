import React from 'react'
import PropTypes from 'prop-types';
import './Celda.scss' 

/** 
 * Componente: Celda
 * Descripcion: Renderiza una celda (para las tablas) con texto 
 *              y segun su tipo se estila y su rol es para permitir el hover.
 * Props:
 *      - txt (string): Texto que se mostrará en la celda (por defecto: "Valor").
 *      - tipo (string): Define el tipo de celda, afecta el estilo CSS (por defecto: "titulo").
 *                       VALORES: titulo, titulo2, normal
 *      - rol (string): Determina el rol visual de la celda (por defecto: "ver").
 *                      VALORES: ver (permite el hover), NoVer (desactiva el hover)
 */

const Celda = ({txt="Valor", tipo="titulo", rol="ver"}) => {
    return (
        <div className={`celda ${tipo} ${rol}`}>
            <p>{txt}</p>
        </div>
)
}

// Validación estricta de props
Celda.propTypes = {
    txt: PropTypes.string,
    tipo: PropTypes.oneOf(["titulo", "titulo2", "normal"]), // Solo permite estos valores
    rol: PropTypes.oneOf(["ver", "NoVer"]), // "ver" activa hover, otro valor lo desactiva
};

export default Celda

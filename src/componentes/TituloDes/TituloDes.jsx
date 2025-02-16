import React from 'react'
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import './TituloDes.scss'

/**
 * Componente: TituloDes
 * Descripción: Representa un título con una breve descripción debajo.
 * Props:
 *      - titulo (string): Texto del título (por defecto: "Titulo").
 *      - desc (string): Texto de la descripción (por defecto: "Descripcion del titulo").
 */
const TituloDes = ({titulo="Titulo", desc="Descripcion del titulo"}) => {
    return (
    <div className='contenedorTituloDes'>
        <h3 className='bold'>{titulo} </h3>
        <p className='lato'>{desc} </p>
    </div>
)
}

TituloDes.propTypes = {
    titulo: PropTypes.string,        // Asegura que `titulo` sea una cadena de texto
    desc: PropTypes.string,          // Asegura que `desc` sea una cadena de texto
};

export default TituloDes

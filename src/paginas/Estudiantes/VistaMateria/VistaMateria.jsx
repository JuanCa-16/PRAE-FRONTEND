import React from 'react'
import { useLocation } from "react-router-dom";
import TableEst from '../../../componentes/TableEst/TableEst';

/** 
 * Componente: VistaMateria
 * Descripción: Muestra la información detallada de una materia, incluyendo actividades, notas y pesos.
 * Funcionalidad:
 *      - Recupera los datos de la materia, profesor, color y grado desde la ruta mediante `useLocation`.
 *      - Muestra un resumen de la materia con el nombre de la materia, el profesor y un color destacado.
 *      - Presenta una tabla con las actividades, sus respectivas notas y los pesos correspondientes.
 *      - Incluye un campo de observaciones deshabilitado con un texto predeterminado ("Sin Observaciones").
 * Props:
 *      - Ninguna.
 */
const VistaMateria = () => {

    const location = useLocation();
    const { materia, profesor,color,grado } = location.state || {};



    return (
      <TableEst materia={materia} profesor={profesor} color={color} grado={grado}></TableEst>
    )
}

export default VistaMateria

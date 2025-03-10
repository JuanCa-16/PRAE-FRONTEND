import React from 'react'
import { useLocation } from "react-router-dom";
import TableEst from '../../../componentes/TableEst/TableEst';

const VistaNotasEst = () => {

    const location = useLocation();
    const { materia, profesor,color,grado } = location.state || {};


    return (
        <TableEst materia={materia} profesor={profesor} color={color} grado={grado}></TableEst>
    )
}

export default VistaNotasEst

import React from 'react'
import { useLocation } from "react-router-dom";
import TableDocentes from '../../../componentes/TableDocentes/TableDocentes'
const VistaDocenteAct = () => {

    const location = useLocation();
    const { materia, profesor, color, grado } = location.state || {};

    return (
        <TableDocentes materia={materia} profesor={profesor} color={color} grado={grado} ></TableDocentes>
        
    )
}

export default VistaDocenteAct

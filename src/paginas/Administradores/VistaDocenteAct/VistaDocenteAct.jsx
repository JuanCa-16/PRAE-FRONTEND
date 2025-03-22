import React from 'react'
import { useLocation } from "react-router-dom";
import TableDocentes from '../../../componentes/TableDocentes/TableDocentes'
const VistaDocenteAct = () => {

    const location = useLocation();
    const { materia, profesor, color, grado, item, idProfe } = location.state || {};

    return (
        <TableDocentes materia={materia} profesor={profesor} color={color} grado={grado}  infoCurso = {item} infoDocente = {idProfe}></TableDocentes>
        
    )
}

export default VistaDocenteAct

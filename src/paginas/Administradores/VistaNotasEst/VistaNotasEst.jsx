import React from 'react'
import { useLocation } from "react-router-dom";
import TableEst from '../../../componentes/TableEst/TableEst';

const VistaNotasEst = () => {

    const location = useLocation();
    const {item, estudiante} = location.state || {};


    return (
        <TableEst infoMateria = {item} infoEst={estudiante}></TableEst>
    )
}

export default VistaNotasEst

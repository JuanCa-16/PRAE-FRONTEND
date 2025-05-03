import React from 'react'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import './EstadisticasEst.scss'
import EstEstadisticas from '../../../componentes/Estadisticas/EstEstadisticas/EstEstadisticas'

const EstadisticasEst = () => {
    return (
        <div className='contenedorEstEstudiante'>
            <TituloDes 
            titulo='ESTADÍSTICAS' 
            desc='Aquí podrás consultar diversas estadísticas...'>
            </TituloDes>
            <EstEstadisticas></EstEstadisticas>
        </div>
      )
}

export default EstadisticasEst

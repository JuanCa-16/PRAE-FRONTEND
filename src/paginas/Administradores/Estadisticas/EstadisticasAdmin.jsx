import React from 'react'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import AdminEstadisticas from '../../../componentes/Estadisticas/AdminEstadisticas/AdminEstadisticas/AdminEstadisticas'
import './EstadisticasAdmin.scss'

const EstadisticasAdmin = () => {
  return (
    <div className='contenedorEstAdmin'>
        <TituloDes 
          titulo='ESTADÍSTICAS DE LAINSTITUCIÓN' 
          desc='Aquí podrás consultar diversas estadísticas relacionadas con tu institución, 
          lo que te permitirá obtener información detallada sobre el rendimiento académico y 
          otros aspectos clave para una mejor toma de decisiones.'>
            
          </TituloDes>
        <AdminEstadisticas></AdminEstadisticas>
    </div>
  )
}

export default EstadisticasAdmin


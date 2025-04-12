import React from 'react'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import CantMaterias from '../../../componentes/Estadisticas/CantMaterias/CantMaterias'
import './EstadisticasAdmin.scss'

const EstadisticasAdmin = () => {
  return (
    <div className='contenedorEstAdmin'>
        <TituloDes titulo='ESTADISTICAS INSTITUCION' desc='Aca podras observar estadisticas relacionadas con tu institución.'></TituloDes>
        <CantMaterias></CantMaterias>
    </div>
  )
}

export default EstadisticasAdmin


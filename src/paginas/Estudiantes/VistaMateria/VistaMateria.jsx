import React from 'react'
import './VistaMateria.scss'
import InputContainer from '../../../componentes/Input/InputContainer'
import PildoraTitulo from '../../../componentes/PildoraTitulo/PildoraTitulo'
import Celda from '../../../componentes/Celda/Celda'

const VistaMateria = () => {

    const titulos = ["Actividad 1", "Actividad 2", "Actividad 3"];
    const notas = [4.5, 3.8, 4.0];
    const pesos = [30, 20, 50]; 

    return (
        <div className='contenedorVistaMateria'>
            <div className="contenedor">
                <PildoraTitulo></PildoraTitulo>
                <div className="tabla">
                    <div className="col 1">
                        <Celda txt='Actividad' tipo='titulo' rol='NoVer'></Celda>
                        {titulos.map((titulo, index) => (
                            <Celda key={index} tipo='titulo2' txt={titulo} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className="col 2">
                    <Celda txt='Notas' tipo='titulo' rol='NoVer'></Celda>
                        {titulos.map((notas, index) => (
                            <Celda key={index} tipo='normal' txt={notas} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className="col 3">
                    <Celda txt='Peso' tipo='titulo' rol='NoVer'></Celda>
                        {titulos.map((pesos, index) => (
                            <Celda key={index} tipo='normal' txt={pesos} rol='NoVer'></Celda>
                        ))}
                    </div>
                </div>
            </div>
            <InputContainer titulo='Observaciones' isDisabled={true} value='Sin Observaciones'></InputContainer>
        </div>
    )
}

export default VistaMateria

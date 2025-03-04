import React from 'react'
import { useLocation } from "react-router-dom";
import './VistaNotasEst.scss'
import InputContainer from '../../../componentes/Input/InputContainer'
import PildoraTitulo from '../../../componentes/PildoraTitulo/PildoraTitulo'
import Celda from '../../../componentes/Celda/Celda'

const VistaNotasEst = () => {

    const location = useLocation();
    const { materia, profesor,color,grado } = location.state || {};

    //Informacion de la tabla traer info del BACK
    const titulos = ["Actividad 1", "Actividad 2", "Actividad 3"];
    const notas = [4.5, 3.8, 4.0];
    const pesos = [30, 20, 50]; 

    return (
        <div className='contenedorVistaMateria'>
            <div className="contenedor">
                <PildoraTitulo materia= {materia} nombre={profesor} color={color} grado={grado}></PildoraTitulo>
                <div className="tabla">
                    <div className="col 1">
                        <Celda color={color} txt='Actividad' tipo='titulo' rol='NoVer'></Celda>
                        {titulos.map((titulo, index) => (
                            <Celda color={color} key={index} tipo='titulo2' txt={titulo} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className="col 2">
                    <Celda color={color} txt='Notas' tipo='titulo' rol='NoVer'></Celda>
                        {notas.map((notas, index) => (
                            <Celda color={color} key={index} tipo='normal' txt={notas} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className="col 3">
                    <Celda txt='Peso' color={color} tipo='titulo' rol='NoVer'></Celda>
                        {pesos.map((pesos, index) => (
                            <Celda color={color} key={index} tipo='normal' txt={pesos} rol='NoVer'></Celda>
                        ))}
                    </div>
                </div>
            </div>
            <InputContainer titulo='Observaciones' isDisabled={true} value='Sin Observaciones'></InputContainer>
        </div>
    )
}

export default VistaNotasEst

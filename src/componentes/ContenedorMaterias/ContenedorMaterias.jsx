import React from 'react'
import { useNavigate } from "react-router-dom";
import './ContenedorMaterias.scss'
import Pildora from '../Pildora/Pildora';
import { useUser } from '../../Contexts/UserContext';

const ContenedorMaterias = ({url, info, est=true, nombre,estudiante, profe}) => {

    const navigate = useNavigate();
    const {user} = useUser()

    

    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (item,materia, profesor,color,grado) => {
        const datos = { materia, profesor,color,grado, item, estudiante }; // Datos a enviar
        const datos2 = { materia, profesor,color,grado, item, profe }; // Datos a enviar
        console.log('aquii', nombre)
        console.log('item',item)
        console.log('item2',estudiante)
        if(est){
            navigate(`${url}/${nombre? nombre : user.nombre + ' ' +user.apellido}/${materia}`, { state: datos }); // Navegar con los datos
        }else{
            navigate(`${url}/${profesor}/${materia}`, { state: datos2 });
        }
    };


    

    //Informacion de las pildoras
    const infoPildoras = info
    return (
    <div className="contenedorMaterias">
        {est ? (infoPildoras.length > 0? (infoPildoras.map((item, index) => (
                                <Pildora
                                    key={index}
                                    titulo={item.materia}
                                    txtsuperior={item.nombre_completo}
                                    txtinferior={item.curso}
                                    color={item.color}
                                    onClick={() => manejarClick(item,item.materia, item.nombre_completo, item.color, item.curso)} // Pasa la función con datos dinámicos
                                />
                            ))):<p>Tu grado todavia no tiene materias asignadas</p>) : (infoPildoras.length > 0 ? (
                                    infoPildoras.map((item, index) => (
                                                        <Pildora
                                                        key={index}
                                                        titulo={item.materia}
                                                        txtsuperior={item.nombre_completo}
                                                        txtinferior={item.curso}
                                                        color={item.color}
                                                        onClick={() => manejarClick(item,item.materia, item.nombre_completo, item.color, item.curso)} // Pasa la función con datos dinámicos
                                                    />
                                                    ))
                                                ) : (
                                                    <p className="mensaje-no-cursos">No hay cursos que cumplan con estos parametros.</p>
                                                ))}
    </div>
  )
}

export default ContenedorMaterias

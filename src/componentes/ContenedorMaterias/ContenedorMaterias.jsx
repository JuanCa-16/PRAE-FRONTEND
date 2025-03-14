import React from 'react'
import { useNavigate } from "react-router-dom";
import './ContenedorMaterias.scss'
import Pildora from '../Pildora/Pildora';
import { useUser } from '../../Contexts/UserContext';

const ContenedorMaterias = ({url, info, est=true, nombre}) => {

    const navigate = useNavigate();
    const {user} = useUser()

    

    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (materia, profesor,color,grado) => {
        const datos = { materia, profesor,color,grado }; // Datos a enviar
        console.log('aquii', nombre)
        if(est){
            navigate(`${url}/${nombre? nombre : user.nombre + ' ' +user.apellido}/${materia}`, { state: datos }); // Navegar con los datos
        }else{
            navigate(`${url}/${profesor}/${materia}`, { state: datos });
        }
    };


    

    //Informacion de las pildoras
    const infoPildoras = info
    return (
    <div className="contenedorMaterias">
        {est ? (infoPildoras.map((item, index) => (
                                <Pildora
                                    key={index}
                                    titulo={item.materia}
                                    txtsuperior={item.profesor}
                                    txtinferior={item.grado}
                                    color={item.color}
                                    onClick={() => manejarClick(item.materia, item.profesor, item.color, item.grado)} // Pasa la función con datos dinámicos
                                />
                            ))) : (infoPildoras.length > 0 ? (
                                    infoPildoras.map((item, index) => (
                                                        <Pildora
                                                        key={index}
                                                        titulo={item.materia}
                                                        txtsuperior={item.profesor}
                                                        txtinferior={item.grado}
                                                        color={item.color}
                                                        onClick={() => manejarClick(item.materia, item.profesor, item.color, item.grado)} // Pasa la función con datos dinámicos
                                                    />
                                                    ))
                                                ) : (
                                                    <p className="mensaje-no-cursos">No hay cursos que cumplan con estos parametros.</p>
                                                ))}
    </div>
  )
}

export default ContenedorMaterias

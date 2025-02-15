import React from 'react'
import { useNavigate } from "react-router-dom";
import './CursosEst.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import Pildora from '../../../componentes/Pildora/Pildora'

export default function CursosEst() {

    const navigate = useNavigate();

    const manejarClick = (materia, profesor,color) => {
        const datos = { materia, profesor,color }; // Datos a enviar
        navigate("/notas", { state: datos }); // Navegar con los datos
    };

    const infoPildoras = [
        { materia: "Matemáticas", profesor: "Carlos Pérez", color:'morado' },
        { materia: "Física", profesor: "Ana Gómez", color:'azul' },
        { materia: "Química", profesor: "Luis Rodríguez",color:'amarillo' },
        { materia: "Historia", profesor: "Marta Sánchez", color:'morado' },
    ];


    return (
        <div className='contenedorCursos'>
        <TituloDes titulo='MIS MATERIAS:' desc='Accede a todas tus materias de forma organizada, consulta tus calificaciones y sigue tu progreso académico de manera sencilla y rápida.'></TituloDes>
        <div className="materias">
        {infoPildoras.map((item, index) => (
                        <Pildora
                            key={index}
                            titulo={item.materia}
                            txtsuperior={item.profesor}
                            color={item.color}
                            onClick={() => manejarClick(item.materia, item.profesor, item.color)} // Pasa la función con datos dinámicos
                        />
                    ))}
        </div>
        </div>
    )
}

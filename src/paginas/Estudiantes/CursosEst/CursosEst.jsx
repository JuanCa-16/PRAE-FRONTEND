import React from 'react'
import { useNavigate } from "react-router-dom";
import './CursosEst.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import Pildora from '../../../componentes/Pildora/Pildora'


/** 
 * Componente: CursosEst
 * Descripción: Muestra un listado de materias del estudiante con la posibilidad de navegar a una página de notas.
 * Props:
 *      - Ninguna.
 * Funcionalidad:
 *      - Muestra una lista de materias con el nombre de la materia, el nombre del profesor, grado y un color asociado.
 *      - Al hacer clic en una "píldora" de materia, navega a la página de notas pasando los datos correspondientes.
 */
export default function CursosEst() {

    const navigate = useNavigate();

    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (materia, profesor,color,grado) => {
        const datos = { materia, profesor,color,grado }; // Datos a enviar
        navigate("/materias/notas", { state: datos }); // Navegar con los datos
    };


     //TRAER NOMBRE DEL TOKEN
    const token= localStorage.getItem("usuario");
    const grado= JSON.parse(token).grado;

    //Informacion de las pildoras
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
                            txtinferior={grado}
                            color={item.color}
                            onClick={() => manejarClick(item.materia, item.profesor, item.color, grado)} // Pasa la función con datos dinámicos
                        />
                    ))}
        </div>
        </div>
    )
}

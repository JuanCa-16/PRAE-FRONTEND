import React from 'react'
import './CursosEst.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import ContenedorMaterias from '../../../componentes/ContenedorMaterias/ContenedorMaterias';

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



    //Informacion de las pildoras
    const infoPildoras = [
        { materia: "Matemáticas",  grado: "6-2",profesor: "Carlos Pérez", color:'morado' },
        { materia: "Física", grado: "6-2",profesor: "Ana Gómez", color:'azul' },
        { materia: "Química", grado: "6-2",profesor: "Luis Rodríguez",color:'amarillo' },
        { materia: "Historia", grado: "6-2",profesor: "Marta Sánchez", color:'morado' },
    ];


    return (
        <div className='contenedorCursos'>
            <TituloDes titulo='MIS MATERIAS:' desc='Accede a todas tus materias de forma organizada, consulta tus calificaciones y sigue tu progreso académico de manera sencilla y rápida.'></TituloDes>
            <ContenedorMaterias url="/materias" info={infoPildoras} ></ContenedorMaterias>
        </div>
    )
}

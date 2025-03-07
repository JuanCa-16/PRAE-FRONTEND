import React, { useState } from 'react';
import './CursosDocentes.scss';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import ContenedorMaterias from '../../../componentes/ContenedorMaterias/ContenedorMaterias.jsx';
/**
 * Componente: CursosDocentes
 * Descripción: Muestra una lista de cursos asignados a un docente con la opción de filtrar por materia y grado.
 * 

 * Estado:
 *      - materiaSeleccionada (string): Materia seleccionada en el filtro.
 *      - gradoSeleccionado (string): Grado seleccionado en el filtro.
 * 
 * Funcionalidad:
 *      - Filtra los cursos por materia y/o grado según las selecciones del usuario.
 *      - Permite limpiar los filtros para mostrar todos los cursos.
 *      - Muestra un mensaje si no hay cursos que coincidan con los filtros seleccionados.
 * 
 * Componentes utilizados:
 *      - TituloDes: Muestra un título y una descripción.
 *      - CustomSelect: Selector personalizado para elegir materia y grado.
 *      - Pildora: Representa visualmente un curso con su materia, grado y color asociado.
 */

const CursosDocentes = () => {

    //TRAER NOMBRE DEL TOKEN


    

    const infoPildoras = [
        { materia: "Matemáticas", profesor: "Carlos Pérez",grado: "6-2", color: 'morado' },
        { materia: "Física", profesor: "Carlos Pérez",grado: "6-2", color: 'azul' },
        { materia: "Química", profesor: "Ana Gómez",grado: "11-2", color: 'amarillo' },
        { materia: "Historia", profesor: "Ana Gómez",grado: "10-1", color: 'morado' },
        { materia: "Historia", profesor: "Ana Gómez",grado: "11-2", color: 'morado' },
        { materia: "Historia", profesor: "Luis Rodríguez",grado: "9-2", color: 'morado' },
    ];

    //Elimina opciones duplicadas para el selector
    const materiasUnicas = [...new Set(infoPildoras.map(item => item.materia))];
    const gradosUnicos = [...new Set(infoPildoras.map(item => item.grado))];

    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');

    // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setMateriaSeleccionada('');
        setGradoSeleccionado('');
    };

    const pildorasFiltradas = infoPildoras.filter(item =>
        (materiaSeleccionada === '' || item.materia === materiaSeleccionada) &&
        (gradoSeleccionado === '' || item.grado === gradoSeleccionado)
    );


    return (
        <div className='contenedorCursosDocentes'>
            <TituloDes 
                titulo='LISTADO DE CURSOS ASIGNADOS:' 
                desc='Consulta los cursos que tienes asignados en los distintos grados. Gestiona las calificaciones y el progreso de tus estudiantes en cada uno de tus grupos.'
            />
            <div className="informacion">
                <div className="filtros">
                    <CustomSelect
                        opciones={materiasUnicas}
                        valorSeleccionado={materiaSeleccionada}
                        setValorSeleccionado={setMateriaSeleccionada}
                        titulo='Materia'
                    />
                    <CustomSelect
                        opciones={gradosUnicos}
                        valorSeleccionado={gradoSeleccionado}
                        setValorSeleccionado={setGradoSeleccionado}
                        titulo='Grado'
                    />
                    <button onClick={limpiarFiltros}>Limpiar</button>
                </div>

                <ContenedorMaterias url="/listadoCursos" info={pildorasFiltradas} est={false}></ContenedorMaterias>
            </div>
        </div>
    );
};

export default CursosDocentes;

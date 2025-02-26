import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CursosDocentes.scss';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import { useUser } from '../../../Contexts/UserContext.jsx';
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

    const { user, setUser } = useUser();
    const nombreDocente = user.nombre
    

    const infoPildoras = [
        { materia: "Matemáticas", grado: "6-2", color: 'morado' },
        { materia: "Física", grado: "6-2", color: 'azul' },
        { materia: "Química", grado: "11-2", color: 'amarillo' },
        { materia: "Historia", grado: "10-1", color: 'morado' },
        { materia: "Historia", grado: "11-2", color: 'morado' },
        { materia: "Historia", grado: "9-2", color: 'morado' },
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

    const navigate = useNavigate();
    
    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (materia, profesor,color, grado) => {
        const datos = { materia, profesor,color, grado}; // Datos a enviar
        navigate("/listadoCursos/notas", { state: datos }); // Navegar con los datos
    };

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

                <div className="materias">
                    {pildorasFiltradas.length > 0 ? (
                        pildorasFiltradas.map((item, index) => (
                            <Pildora
                                key={index}
                                titulo={item.materia}
                                txtsuperior={nombreDocente}
                                txtinferior={item.grado}
                                color={item.color}
                                onClick={() => manejarClick(item.materia,nombreDocente, item.color, item.grado)}
                            />
                        ))
                    ) : (
                        <p className="mensaje-no-cursos">No hay cursos que cumplan con estos parametros.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CursosDocentes;

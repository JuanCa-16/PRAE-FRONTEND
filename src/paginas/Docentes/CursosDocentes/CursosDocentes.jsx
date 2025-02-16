import React, { useState } from 'react';
import './CursosDocentes.scss';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';

const CursosDocentes = ({ nombreDocente }) => {
    const infoPildoras = [
        { materia: "Matemáticas", grado: "6-2", color: 'morado' },
        { materia: "Física", grado: "6-2", color: 'azul' },
        { materia: "Química", grado: "11-2", color: 'amarillo' },
        { materia: "Historia", grado: "10-1", color: 'morado' },
        { materia: "Historia", grado: "11-2", color: 'morado' },
        { materia: "Historia", grado: "9-2", color: 'morado' },
    ];

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

                <div className="materias">
                    {pildorasFiltradas.length > 0 ? (
                        pildorasFiltradas.map((item, index) => (
                            <Pildora
                                key={index}
                                titulo={item.materia}
                                txtsuperior={nombreDocente}
                                txtinferior={item.grado}
                                color={item.color}
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

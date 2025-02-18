import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Observaciones.scss';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraEst from '../../../componentes/PildoraEst/PildoraEst.jsx';

const Observaciones = () => {

    //TRAER NOMBRE DEL TOKEN
    const token= localStorage.getItem("usuario");
    const nombreDocente= JSON.parse(token).name;
    

    const infoPildoras = [
        { nombreEstudiante: "Juan Pérez Henao Gallego", grado: "6-2", color: 'morado' },
        { nombreEstudiante: "María Gómez", grado: "6-2", color: 'azul' },
        { nombreEstudiante: "Carlos Rodríguez", grado: "11-2", color: 'amarillo' },
        { nombreEstudiante: "Ana Martínez", grado: "10-1", color: 'morado' },
        { nombreEstudiante: "Luis Fernández", grado: "11-2", color: 'morado' },
        { nombreEstudiante: "Sofía Ramírez", grado: "9-2", color: 'morado' },
    ];
    

    //Elimina opciones duplicadas para el selector
    const nombreEstudiante = [...new Set(infoPildoras.map(item => item.nombreEstudiante))];
    const gradosUnicos = [...new Set(infoPildoras.map(item => item.grado))];

    const [nombreEstudianteSeleccionada, setnombreEstudianteSeleccionada] = useState('');
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');

    // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setnombreEstudianteSeleccionada('');
        setGradoSeleccionado('');
    };

    const pildorasFiltradas = infoPildoras.filter(item =>
        (nombreEstudianteSeleccionada === '' || item.nombreEstudiante === nombreEstudianteSeleccionada) &&
        (gradoSeleccionado === '' || item.grado === gradoSeleccionado)
    );

    const navigate = useNavigate();
    
    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = ( est,color, grado) => {
        const datos = {est,color, grado}; // Datos a enviar
        navigate(`/observaciones/${est}`, { state: datos }); // Navegar con los datos
    };

    return (
        <div className='contenedorObservaciones'>
            <TituloDes 
                titulo='LISTADO DE ESTUDIANTES :' 
                desc='Consulta los estudiantes que tienes asignados en los diferentes grados, y realizales observaciones'
            />
            <div className="informacion">
                <div className="filtros">
                    <CustomSelect
                        opciones={nombreEstudiante}
                        valorSeleccionado={nombreEstudianteSeleccionada}
                        setValorSeleccionado={setnombreEstudianteSeleccionada}
                        titulo='Estudiantes'
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
                            <PildoraEst
                                key={index}
                                est={item.nombreEstudiante}
                                curso={item.grado}
                                color={item.color}
                                clase='peque'
                                onClick={() => manejarClick(item.nombreEstudiante, item.color, item.grado)}
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


export default Observaciones

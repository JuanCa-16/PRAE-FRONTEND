import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Observaciones.scss';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraEst from '../../../componentes/PildoraEst/PildoraEst.jsx';
import { useUser } from '../../../Contexts/UserContext.jsx';
const Observaciones = () => {

    //TRAER NOMBRE DEL TOKEN
    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser();

    const [infoPildoras, setInfoPildoras] = useState([]);


    useEffect(() => {
        const listaEstAsignados = async () =>{
            try {
                const response = await fetch(`${API_URL}usuario/profesor/${user.id}/estudiantes`,{
                    method: 'GET',
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if(!response.ok){
                    const errorData = await response.json(); // Obtiene respuesta del servidor
                    throw new Error(`${errorData.message || response.status}`);
                }

                const data = await response.json(); // Espera la conversión a JSON
                const dataCompleta = data.map(est => ({
                    ...est,
                    nombre_completo: `${est.estudiante_apellido} ${est.estudiante_nombre} `
                }))
                console.log('data',dataCompleta)
                setInfoPildoras(dataCompleta)
            } catch (error) {
                console.error("Error en listaEstAsignados:", error.message);
            }
        }

        listaEstAsignados()
    },[API_URL,token,user.id])
    

    //Elimina opciones duplicadas para el selector
    const nombreEstudiante = [...new Set(infoPildoras.map(item => item.nombre_completo))];
    const gradosUnicos = [...new Set(infoPildoras.map(item => item.curso_nombre))];

    const [nombreEstudianteSeleccionada, setnombreEstudianteSeleccionada] = useState('');
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');

    // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setnombreEstudianteSeleccionada('');
        setGradoSeleccionado('');
    };

    const pildorasFiltradas = infoPildoras.filter(item =>
        (nombreEstudianteSeleccionada === '' || item.nombre_completo === nombreEstudianteSeleccionada) &&
        (gradoSeleccionado === '' || item.curso_nombre === gradoSeleccionado)
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
                                est={item.nombre_completo}
                                curso={item.curso_nombre}
                                color={item.color}
                                clase='peque'
                                onClick={() => manejarClick(item.nombre_completo, item.color, item.curso_nombre)}
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

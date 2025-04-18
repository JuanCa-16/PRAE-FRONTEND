import React, { useState, useEffect} from 'react'
import './TableDocentes.scss';
import InputContainer from '../Input/InputContainer';
import PildoraTitulo from '../PildoraTitulo/PildoraTitulo'; 
import Celda from '../Celda/Celda'; 
import Modal from '../Modal/Modal';
import { useUser } from '../../Contexts/UserContext';
import Alerta from '../Alerta/Alerta';

const TableDocentes = ({infoCurso, infoDocente}) => {

    function capitalizeWords(str) {
        return str
            .split(' ') // Divide en palabras
            .map(word => word.length > 0 
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
                : ''
            )
            .join(' ');
    }

    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token')
    const {user} = useUser();
    
    const [info, setInfo] = useState([])
    const [infoNota, setInfoNota] = useState([])
    
    const [nombres, setNombres] = useState([])
    const [soloApellidos, setSoloApellidos] = useState([])
    const [soloNombre,setSoloNombre] = useState([])
    const [actividadesUnicas, setActividadesUnicas] = useState([])

    const [reload, setReload] = useState(false);


    useEffect(() => {
            const notasCursoDocente = async () => {
                try {
                    const response = await fetch(`${API_URL}calificacion/materia/${infoCurso.id_materia}/curso/${infoCurso.id_curso}/docente/${infoDocente}/institucion/${user.institucion.id_institucion}`,{
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
    
                    if (!response.ok) {
                        const errorData = await response.json(); // Obtiene respuesta del servidor
                        throw new Error(`${errorData.message || response.status}`);
                    }
    
                    const data = await response.json();
                    console.log('info',data)
                    setInfo(data)
                    setNombres((data.map(item=> ` ${item.apellido} ${item.nombre}`)).sort((a, b) =>
                        a.trim().localeCompare(b.trim(), 'es', {
                          sensitivity: 'base',       // ignora mayúsculas / tildes
                          ignorePunctuation: true
                        })
                      )) 
                    setSoloApellidos(data.map(item => ` ${item.apellido}`))
                    setSoloNombre(data.map(item => ` ${item.nombre}`))
                    setActividadesUnicas(data.map(est => est.actividades.map(act => [{ actividad: act.actividad, peso: act.peso, idAct: act.id_actividad, idNota: act.id_calificacion }]))[0].flat())

                    
                } catch (error) {
                    console.error(error);
                    Alerta.error(`Error al obtener notas: ${error.message}`, true);
                }
            }
    
            notasCursoDocente()
    },[reload, API_URL,token,user.institucion.id_institucion,infoCurso.id_curso,infoCurso.id_materia,infoDocente])
    

    useEffect(() =>{
        const promedioCurso = async () => {
            try {
                const response = await fetch(`${API_URL}calificacion/promedio/materia/${infoCurso.id_materia}/curso/${infoCurso.id_curso}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Obtiene respuesta del servidor
                    console.log(errorData)
                    throw new Error(`${errorData.error || response.status}`);
                }
                
                const data = await response.json();
                console.log(data)
                setInfoNota(data.promedio.promedioCurso)
                
            } catch (error) {
                Alerta.error(`Error al obtener nota promedio: ${error.message}`, true);
            }
        }

        promedioCurso()
    },[reload,API_URL,token,user.institucion.id_institucion,infoCurso.id_curso,infoCurso.id_materia])

    //CREAR ACTIVIDAD BACK
    const [nombreAct, setNonombreAct] = useState({
            actividad: "",
            peso: "",
        })

    //captar info de los inputs
    const handleChange = (titulo, value) => { 
        setNonombreAct({
            ...nombreAct,
            [titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault()

        const peso = parseFloat(nombreAct.peso);

        if (isNaN(peso) || peso < 0 || peso > 100) {
            Alerta.error('El peso debe ser un número entre 0 y 100.');
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}actividad/crear`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({nombre: nombreAct.actividad, peso: nombreAct.peso, id_materia: infoCurso.id_materia, id_docente: infoDocente, id_curso: infoCurso.id_curso})
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtiene respuesta del servidor
                throw new Error(`${errorData.message || response.status}`);
            }
            
            Alerta.success('Observación realizada correctamente');
            setReload(!reload);
            console.log(nombreAct)
            setNonombreAct({
                actividad: "",
                peso: "",
            })
            
        } catch (error) {
            console.error('Error al crear actividad',error);
            Alerta.error(error.message);
        }
        
        
    };


    ///MODALES

    const [modalIndexAbierto, setModalIndexAbierto] = useState(null); // Guardar el índice de la actividad que tiene el modal abierto

    const openModalAct = (index) => setModalIndexAbierto(index); // Establecer el índice de la actividad que se abre
    const closeModalAct = () => setModalIndexAbierto(null); // Cerrar el modal

    
    // Cambiar el estado modalIndexNota para que sea un objeto con los índices de actividad y estudiante
    const [modalIndexNota, setModalIndexNota] = useState({ actividadIndex: null, estudianteIndex: null });

    const openModalNota = (actividadIndex, estudianteIndex) => {
        setModalIndexNota({ actividadIndex, estudianteIndex });
        console.log(actividadIndex)
        console.log(estudianteIndex)
    };

    const closeModalNota = () => {
        setModalIndexNota({ actividadIndex: null, estudianteIndex: null });
    };

    const handleReload = () => {
        setReload(prev => !prev);
    };

    return (
        <div className='contenedorNotas'>
            <div className="contenedor">
                <PildoraTitulo nota={infoNota} materia= {infoCurso.materia} nombre={infoCurso.nombre_completo} color={infoCurso.color} grado={ infoCurso.curso} ></PildoraTitulo>
                <div className="tabla">
                    <div className="col ">
                        <Celda txt='Actividad' color={infoCurso.color} tipo='titulo' rol='NoVer'></Celda>
                        {nombres.map((nombre, index) => (
                            <Celda key={index} tipo='titulo2' color={infoCurso.color} txt={nombre} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className={`notas ${infoCurso.color}`}>

                        {actividadesUnicas.map((actividad, i) => (
                            <div key={i} className="col nota">
                                <Celda color={infoCurso.color} txt={actividad.actividad} tipo='titulo' onClick={() => openModalAct(i)} />
                                {/* Modal específico para la actividad seleccionada */}
                                {modalIndexAbierto === i && (
                                    <Modal
                                        isOpen={true}
                                        closeModal={closeModalAct}
                                        recargar = {handleReload}
                                        tipo='actividad'
                                        modalTitulo='EDITAR ACTIVIDAD'
                                        modalTexto='Edita los parametros de tu actividad'
                                        valorAct={actividad.actividad}
                                        ValorPeso={actividad.peso}
                                        extraData={{ materia: infoCurso.materia, profesor: infoCurso.nombre_completo, grado: infoCurso.curso, id_act: actividad.idAct, id_docente: infoDocente }} 
                                    />
                                )}
                                {info.map((estudiante, j) => {
                                    const actividadEncontrada = estudiante.actividades.find(act => act.id_actividad === actividad.idAct);
                                    
                                    return (
                                        <div className='full' key={j}>
                                            <Celda 
                                                tipo="normal" 
                                                color={infoCurso.color}
                                                txt={actividadEncontrada ? actividadEncontrada.nota : "N/A"} 
                                                onClick={() => openModalNota(i, j)} // Ahora pasa ambos índices
                                            />
                                            
                                            {/* Modal de nota específico para la combinación de actividad y estudiante */}
                                            {modalIndexNota.actividadIndex === i && modalIndexNota.estudianteIndex === j && (
                                                <Modal
                                                    isOpen={true}
                                                    closeModal={closeModalNota}
                                                    tipo='nota'
                                                    valorNota={actividadEncontrada ? actividadEncontrada.nota : "N/A"}
                                                    modalTitulo='EDITAR NOTA'
                                                    modalTexto='Edita la nota de esta actividad'
                                                    recargar = {handleReload}
                                                    extraData={{
                                                        notaOriginal:  actividadEncontrada.nota, 
                                                        id_nota: actividadEncontrada.id_calificacion,
                                                        materia: infoCurso.materia, profesor: infoCurso.nombre_completo, grado:  infoCurso.curso, nombreEst: soloNombre[j], apellidosEst: soloApellidos[j], actividad:actividadesUnicas[i][0],
                                                        id_actividad: actividad.idAct,
                                                        id_estudiante: estudiante.documento_identidad,
                                                    }}
                                                    
                                                />
                                            )}
                                        </div>
                                    );
                        
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="contenedorAct">
                    <div className="titulo">
                        <p className='bold'>CREAR ACTIVIDAD:</p>
                    </div>
                    <div className="crearAct">
                        <div className="campos">
                            <InputContainer titulo="Nombre"
                                            placeholder="Nombre de la actividad"
                                            inputType="text"
                                            value={nombreAct.actividad}
                                            onChange={(value) => handleChange('actividad', capitalizeWords(value))} // Pasamos la función que actualizará el estado
                                            required={true} // Hacemos que el campo sea obligatorio
                            />
                            <InputContainer titulo="Peso"
                                            placeholder="Valor entre 0 - 100"
                                            inputType="text"
                                            value={nombreAct.peso} // El valor del input viene del estado del componente padre
                                            onChange={(value) => handleChange('peso', value)} // Pasamos la función que actualizará el estado
                                            required={true} // Hacemos que el campo sea obligatorio
                            />
                            <button type='submit'>Crear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default TableDocentes

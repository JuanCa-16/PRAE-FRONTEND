import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import './ActividadesCurso.scss'
import InputContainer from '../../../componentes/Input/InputContainer'
import PildoraTitulo from '../../../componentes/PildoraTitulo/PildoraTitulo'
import Celda from '../../../componentes/Celda/Celda'
import Modal from '../../../componentes/Modal/Modal';
const ActividadesCurso = () => {

        const location = useLocation();
        const { materia, profesor, color, grado } = location.state || {};
    
        //Informacion de la tabla traer info del BACK
        const datos =  [
                {
                "documento_identidad": "1006321",
                "nombre": "Julian",
                "apellido": "Castro Henao",
                "actividades": [
                    {
                    "nota": "4.50",
                    "actividad": "Examen Final"
                    },
                    {
                    "nota": "5.00",
                    "actividad": "Primer Examen"
                    },
                    {
                    "nota": "4.75",
                    "actividad": "Exposiciones"
                    },
                    {
                    "nota": "2.10",
                    "actividad": "Talleres en clase"
                    }
                                    ]
                },

                {
                "documento_identidad": "1006322",
                "nombre": "Esteban",
                "apellido": "Castro Henao",
                "actividades": [
                    {
                    "nota": "5.00",
                    "actividad": "Examen Final"
                    },
                    {
                    "nota": "5.00",
                    "actividad": "Primer Examen"
                    },
                    {
                    "nota": "5.00",
                    "actividad": "Exposiciones"
                    },
                    {
                    "nota": "5.00",
                    "actividad": "Talleres en clase"
                   },
                    {
                    "nota": "5.00",
                    "actividad": "Talleres en clase6"
                   }

                ]
              },

            {
            "documento_identidad": "1006322",
            "nombre": "Esteban",
            "apellido": "Castro Henao",
            "actividades": [
                {
                "nota": "5.00",
                "actividad": "Examen Final"
                },
                {
                "nota": "5.00",
                "actividad": "Primer Examen"
                },
                {
                "nota": "5.00",
                "actividad": "Exposiciones"
                },
                {
                "nota": "5.00",
                "actividad": "Talleres en clase"
               },
                {
                "nota": "5.00",
                "actividad": "Talleres en clase6"
               }

            ]
          },{
            "documento_identidad": "1006321",
            "nombre": "Julian",
            "apellido": "Castro Henao",
            "actividades": [
                {
                "nota": "4.50",
                "actividad": "Examen Final"
                },
                {
                "nota": "5.00",
                "actividad": "Primer Examen"
                },
                {
                "nota": "4.75",
                "actividad": "Exposiciones"
                },
                {
                "nota": "2.10",
                "actividad": "Talleres en clase"
                }
                                ]
            },

            {
            "documento_identidad": "1006322",
            "nombre": "Esteban",
            "apellido": "Castro Henao",
            "actividades": [
                {
                "nota": "5.00",
                "actividad": "Examen Final"
                },
                {
                "nota": "5.00",
                "actividad": "Primer Examen"
                },
                {
                "nota": "5.00",
                "actividad": "Exposiciones"
                },
                {
                "nota": "5.00",
                "actividad": "Talleres en clase"
               },
                {
                "nota": "5.00",
                "actividad": "Talleres en clase6"
               }

            ]
          },

        {
        "documento_identidad": "1006322",
        "nombre": "Esteban",
        "apellido": "Castro Henao",
        "actividades": [
            {
            "nota": "5.00",
            "actividad": "Examen Final"
            },
            {
            "nota": "5.00",
            "actividad": "Primer Examen"
            },
            {
            "nota": "5.00",
            "actividad": "Exposiciones"
            },
            {
            "nota": "5.00",
            "actividad": "Talleres en clase"
           },
            {
            "nota": "5.00",
            "actividad": "Talleres en clase6"
           }

        ]
      }
        ]

        const nombres = datos.map(item => ` ${item.apellido} ${item.nombre}`);
        const soloApellidos = datos.map(item => ` ${item.apellido}`);
        const soloNombre = datos.map(item => ` ${item.nombre}`);
        const actividadesUnicas = [
            ...new Set(datos.flatMap(estudiante => estudiante.actividades.map(act => act.actividad)))
        ];
        

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
        
        const handleSubmit = (e) => {
            e.preventDefault()
            console.log(nombreAct)
            setNonombreAct({
                actividad: "",
                peso: "",
            })
            
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

        return (
            <div className='contenedorNotas'>
                <div className="contenedor">
                    <PildoraTitulo materia= {materia} nombre={profesor} color={color} grado={grado} ></PildoraTitulo>
                    <div className="tabla">
                        <div className="col ">
                            <Celda txt='Actividad' tipo='titulo' rol='NoVer'></Celda>
                            {nombres.map((nombre, index) => (
                                <Celda key={index} tipo='titulo2' txt={nombre} rol='NoVer'></Celda>
                            ))}
                        </div>
                        <div className="notas">

                            {actividadesUnicas.map((actividad, i) => (
                                <div key={i} className="col nota">
                                    <Celda txt={actividad} tipo='titulo' onClick={() => openModalAct(i)} />
                                    {/* Modal específico para la actividad seleccionada */}
                                    {modalIndexAbierto === i && (
                                        <Modal
                                            isOpen={true}
                                            closeModal={closeModalAct}
                                            tipo='actividad'
                                            modalTitulo='EDITAR ACTIVIDAD'
                                            modalTexto='Edita los parametros de tu actividad'
                                            valorAct={actividad}
                                            ValorPeso='40%'
                                            extraData={{ materia: materia, profesor: profesor, grado: grado }} 
                                        />
                                    )}
                                    {datos.map((estudiante, j) => {
                                        const actividadEncontrada = estudiante.actividades.find(act => act.actividad === actividad);
                                        return (
                                            <div className='full' key={j}>
                                                <Celda 
                                                    tipo="normal" 
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
                                                        extraData={{ materia: materia, profesor: profesor, grado: grado, nombreEst: soloNombre[j], apellidosEst: soloApellidos[j], actividad:actividadesUnicas[i] }}
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
                                                onChange={(value) => handleChange('actividad', value)} // Pasamos la función que actualizará el estado
                                                required={true} // Hacemos que el campo sea obligatorio
                                />
                                <InputContainer titulo="Peso"
                                                placeholder="Nuevo Peso"
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

export default ActividadesCurso

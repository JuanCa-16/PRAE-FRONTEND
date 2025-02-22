import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import './VistaDocenteAct.scss'
import PildoraTitulo from '../../../componentes/PildoraTitulo/PildoraTitulo'
import Celda from '../../../componentes/Celda/Celda'

const VistaDocenteAct = () => {

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



    return (
        <div className='vistaDocenteAct'>
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
                                <Celda txt={actividad} tipo='titulo'rol='NoVer' />
                                {datos.map((estudiante, j) => {
                                    const actividadEncontrada = estudiante.actividades.find(act => act.actividad === actividad);
                                    return (
                                        <div className='full' key={j}>
                                            <Celda 
                                                tipo="normal" 
                                                txt={actividadEncontrada ? actividadEncontrada.nota : "N/A"} 
                                                rol='NoVer'
                                            />
                                        </div>
                                    );
                        
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VistaDocenteAct

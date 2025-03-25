import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './CrearObservacion.scss';
import Alerta from '../../../componentes/Alerta/Alerta';
import { useUser } from '../../../Contexts/UserContext';

const CrearObservacion = () => {

        const API_URL = process.env.REACT_APP_API_URL; 
        const token = localStorage.getItem("token");
        const location = useLocation();
        const {est} = location.state || {};

        const {user} = useUser()

        const [reload, setReload] = useState(false);

        //Datos inciales a mostrar
        const [formData, setFormData] = useState({
            observacion: '',
        });
    
        //Actualizar inputs
        const handleChange = (titulo, value) => {
            setFormData({
                ...formData,
                [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
            });
        };
    
        //Envio del formulario
        const handleSubmit = async(e) => {
            e.preventDefault()

            try {
                const response = await fetch(`${API_URL}comentarios/`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({comentario:formData.observacion,documento_profe:user.id,documento_estudiante:est.estudiante_id})
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Obtiene respuesta del servidor
                    throw new Error(`${errorData.message || response.status}`);
                }
                console.log('Datos enviados:', formData);
                Alerta.success('Observación realizada correctamente');
                setReload(!reload);
                setFormData({observacion: ''})
            } catch (error) {
                console.error('Error al crear observacion',error);
                Alerta.error(error.message);
            }

            
        };


        const [observacionesEst, setObservacionesEst] = useState([])

        useEffect(() => {
            const listaObservaciones = async () => {
                try {
                    const response = await fetch(`${API_URL}comentarios/profesor/${user.id}/estudiante/${est.estudiante_id}`,{
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
                    setObservacionesEst(data)
                    console.log(data)
                } catch (error) {
                    console.error('Error al traer observaciones',error);
                    Alerta.error(error.message);
                }
            }

            listaObservaciones()
        },[reload,API_URL,est.estudiante_id,user.id,token])
    
        return (
            <div className='contenedorCrearObser'>
                <div className="editar">
                    <TituloDes titulo='REALIZAR OBSERVACION ESTUDIANTE' desc='Realiza observacion a tu estudiante' />
                    <form onSubmit={handleSubmit} className="formulario">
                        <div className="inputs">
                            <div className="input-container">
                                <label htmlFor='observacionDocente'>Observaciones</label>
                                <textarea
                                    id='observacionDocente'
                                    value={formData.observacion}
                                    onChange={(e) => handleChange('observacion',  e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' >Guardar Cambios</button>
                    </form>
                </div>
                <div className="observaciones">
                    {(observacionesEst.length > 0)? (
                        observacionesEst.map((observacionesEst, index) => (<TituloDes key={index} desc={observacionesEst.comentario} titulo={`Observacion #${index + 1}`} ></TituloDes>))
                    ):(
                        <p className="">
                            El estudiante todavia no tiene observaciones
                        </p>
                        )}
                </div>
            </div>
        );
    };



export default CrearObservacion

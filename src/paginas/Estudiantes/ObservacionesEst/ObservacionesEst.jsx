import React, {useEffect, useState} from 'react'
import TituloDes from '../../../componentes/TituloDes/TituloDes'
import { useUser } from '../../../Contexts/UserContext';
import './ObservacionesEst.scss'
const ObservacionesEst = () => {

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser()

    const [observacionesEst, setObservacionesEst] = useState([])

        useEffect(() => {
            const listaObservaciones = async () => {
                try {
                    const response = await fetch(`${API_URL}comentarios/estudiante/${user.id}`,{
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
                    console.log('observaciones', data)


                } catch (error) {
                    console.error('Error al traer observaciones',error);
                    
                }
            }

            listaObservaciones()
        },[API_URL,token,user.id])
    

  return (
    <div className='contenedorObservacionesEst'>
      <TituloDes titulo='MIS OBSERVACIONES' desc='Lee las observaciones que los docentes han realizado sobre tu desempeño académico. Estas te ayudarán a conocer tus fortalezas y tus áreas a mejorar.' />
      <div className="observaciones">
                    {(observacionesEst.length > 0)? (
                        <>
                        
                        {observacionesEst.map((observacion, index) => {
                          // Convertir fecha
                        const fechaFormateada = new Date(observacion.fecha).toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });
                    
                        return (
                            <p key={index}>
                              <strong className='fuerte'>Profesor(a):</strong> {observacion.nombre_profesor}<br />
                              <strong className='fuerte'>{fechaFormateada}:</strong> {observacion.comentario}
                            </p>
                          );
                        })}
                      </>
                    ):(
                        <p className="">
                            El estudiante todavia no tiene observaciones
                        </p>
                        )}
                </div>
    </div>
  )
}

export default ObservacionesEst

import React, {useState, useEffect } from 'react'
import './TableEst.scss'
import InputContainer from '../Input/InputContainer';
import PildoraTitulo from '../PildoraTitulo/PildoraTitulo';
import Celda from '../Celda/Celda';
import { useUser } from '../../Contexts/UserContext';

const TableEst = ({infoMateria, idEst } ) => {


    //Informacion de la tabla traer info del BACK

    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token')
    const {user} = useUser();

    const [info, setInfo] = useState([])

    useEffect(() => {
        const notasMateriaEstudiante = async () => {
            try {
                const response = await fetch(`${API_URL}calificacion/materia/${infoMateria.id_materia}/estudiante/${idEst}/docente/${infoMateria.profesor_documento}/institucion/${user.institucion.id_institucion}`,{
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
                
            } catch (error) {
                console.error(error);
            }
        }

        notasMateriaEstudiante()
    },[API_URL,infoMateria.id_materia,idEst, infoMateria.profesor_documento, token,user.institucion.id_institucion])



    return (
        <div className='contenedorVistaMateria'>
            <div className="contenedor">
                <PildoraTitulo materia= {infoMateria.materia} nombre={infoMateria.nombre_completo} color={infoMateria.color} grado={infoMateria.curso}></PildoraTitulo>
                <div className="tabla">
                    <div className="col 1">
                        <Celda color={infoMateria.color} txt='Actividad' tipo='titulo' rol='NoVer'></Celda>
                        {info.map((item, index) => (
                            <Celda color={infoMateria.color} key={index} tipo='titulo2' txt={item.actividad} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className="col 2">
                    <Celda color={infoMateria.color} txt='Notas' tipo='titulo' rol='NoVer'></Celda>
                        {info.map((item, index) => (
                            <Celda color={infoMateria.color} key={index} tipo='normal' txt={item.nota} rol='NoVer'></Celda>
                        ))}
                    </div>
                    <div className="col 3">
                    <Celda color={infoMateria.color} txt='Peso' tipo='titulo' rol='NoVer'></Celda>
                        {info.map((item, index) => (
                            <Celda color={infoMateria.color} key={index} tipo='normal' txt={item.peso + '%'} rol='NoVer'></Celda>
                        ))}
                    </div>
                </div>
                {/* {(info.length > 0)? (<h1>MAYOR</h1>) : <p>No hay actividades todavia</p>} */}
            </div>
            <InputContainer titulo='Observaciones' isDisabled={true} value='Sin Observaciones'></InputContainer>
        </div>
    )
}


export default TableEst

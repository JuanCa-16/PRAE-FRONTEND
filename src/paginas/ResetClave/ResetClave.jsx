import React, { useState,useEffect } from 'react'
import './ResetClave.scss';
import TituloDes from '../../componentes/TituloDes/TituloDes';
import imagenLogin from "../../assets/imagenLogin.png";
import resetLogo from '../../assets/resetLogo.png'
import InputContainer from '../../componentes/Input/InputContainer';
import { useNavigate,useParams } from 'react-router-dom';


import Alerta from '../../componentes/Alerta/Alerta';

export default function ResetClave() {

    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useParams();
    const [validado,setValidado] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const checkTokenReset = async () =>{
            try {
                const response = await fetch(`${API_URL}auth/validateResetToken`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
    
                if(!response.ok){
                    const errorData = await response.json(); // Obtiene respuesta del servidor
                    throw new Error(`${errorData.detalle || response.status}`);
                }
    
                console.log('Token Valido')
                setValidado(true)


            } catch (error) {
                console.error(error);
                navigate("/login")

            }
        }

        checkTokenReset();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[API_URL,token])

    //Valores de los inputs
    const [getClave, setGetClave] = useState({
        clave: "",
    })

    

    //captar info de los inputs
    const handleChange = (titulo, value) => { 
        setGetClave({
            ...getClave,
            [titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

    //ENVIO DEL FORMULARIO ------ BACK
    const handlerReset = async (e) => {
        e.preventDefault()
        console.log(getClave)

        try {
            const response = await fetch(`${API_URL}usuario/updatePassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nuevaContraseña: getClave.clave
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`${errorData.error || response.status}`);
            }

            const data = await response.json();

            Alerta.success('Contraseña actualizada correctamente');
            console.log('contraseña exitosa', data);
            navigate("/login")


        } catch (error) {
            console.error('Error al editar',error);
            Alerta.error(error.message);
        }
    }

    return (validado &&
        <div className='contenedorResetClave'>
            <div className=' pagReset'>
                <div className="izq">
                    <div className='imagen_logo'>
                        <img className='img_login' src={imagenLogin} alt="images" />
                        <div className='info'>
                            <img className="logo" src={resetLogo} alt="imges_logo" />
                            <h4 className='lato'>Plataforma de Registro Académico Estudiantil</h4>
                            <p className='lato'>Gestiona cursos, docentes y estudiantes de forma rápida y eficiente</p>
                        </div>
                    </div>
                </div>

                <div className="der">
                    <div className='title'>
                        <TituloDes titulo="Reestablacer Contraseña" desc='Ingresa tu nueva clave'></TituloDes>
                    </div>
                    <form onSubmit={handlerReset} className='Form_login'>
                        <div  className='inputs'>
                            <InputContainer
                                placeholder="*******"
                                titulo="Clave:"
                                inputType="password"
                                value={getClave.clave} 
                                required={true}  
                                nomInput="password"
                                onChange={(value) => handleChange('clave', value)} 
                            />
                        </div>
                        <div className='btn_login'><button type='submit'>Enviar</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
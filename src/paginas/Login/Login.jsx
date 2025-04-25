import React, { useState } from 'react'
import './Login.scss';
import TituloDes from '../../componentes/TituloDes/TituloDes';
import imagenLogin from "../../assets/imagenLogin.png"
import Logo from "../../assets/logo.png"
import InputContainer from '../../componentes/Input/InputContainer';
import { useNavigate } from 'react-router-dom';

/** 
 * Componente: Login
 * Descripción: Permite a los usuarios iniciar sesión en la plataforma de registro académico estudiantil.
 * Funcionalidad:
 *      - Presenta un formulario de inicio de sesión con campos para correo electrónico y contraseña.
 *      - Al enviar el formulario, se captura la información del correo y la contraseña.
 *      - Utiliza la función `func` pasada como prop para realizar alguna acción con los datos del usuario.
 *      - Incluye un enlace para recuperar la contraseña si el usuario la ha olvidado.
 *      - Después de un inicio de sesión exitoso, redirige a una página de inicio (actualmente comentada).
 * Props:
 *      - `func` (function): Función que maneja el proceso de autenticación con las credenciales del usuario.
 */


export default function Login({func}) {

    //Valores de los inputs
    const [getDataLogin, SetgetDatasLogin] = useState({
        correo: "",
        password: "",
    })

    const navigate = useNavigate()

    //captar info de los inputs
    const handleChange = (titulo, value) => { 
        SetgetDatasLogin({
            ...getDataLogin,
            [titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

    //ENVIO DEL FORMULARIO ------ BACK
    const handlerLogin = (e) => {
        e.preventDefault()
        console.log(getDataLogin)

        //Le envio a APP el resultado para actualiar valores del usuario. por ahora esto luego TOKEN
        func(getDataLogin.correo, getDataLogin.password)
        // navigate("/home") /* cambiar la ruta despues */
    }

    return (
        <div className='contenedorLogin'>
            <div className=' pagLogin'>
                <div className="izq">
                    <div className='imagen_logo'>
                        <img className='img_login' src={imagenLogin} alt="images" />
                        <div className='info'>
                            <img className="logo" src={Logo} alt="imges_logo" />
                            <h4 className='lato'>Plataforma de Registro Académico Estudiantil</h4>
                            <p className='lato'>Gestiona cursos, docentes y estudiantes de forma rápida y eficiente</p>
                        </div>
                    </div>
                </div>

                <div className="der">
                    <div className='title'>
                        <TituloDes titulo="Bienvenido" desc='Accede a tu información académica en un solo lugar.'></TituloDes>
                    </div>
                    <form onSubmit={handlerLogin} className='Form_login'>
                        <div  className='inputs'>
                            <InputContainer
                                placeholder="correo@gmail.com"
                                titulo="correo electronico:"
                                inputType="email"
                                value={getDataLogin.correo}   
                                required={true}  
                                nomInput="correo"
                                onChange={(value) => handleChange('correo', value)} 
                            />
                            <InputContainer
                                placeholder="*"
                                titulo="Clave:"
                                inputType="password"
                                value={getDataLogin.password} 
                                required={true}  
                                nomInput="password"
                                onChange={(value) => handleChange('password', value)} 
                            />

                        </div>
                        <p className='lato_1' onClick={() => navigate("/")}>Olvidaste tu contraseña?</p>
                        <div className='btn_login'><button type='submit'>Ingresar</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
import React, { useState } from 'react'
import './Login.scss';
import TituloDes from '../../componentes/TituloDes/TituloDes';
import imagenLogin from "../../assets/imagenLogin.png"
import Logo from "../../assets/logo.png"
import InputContainer from '../../componentes/Input/InputContainer';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [getDataLogin, SetgetDatasLogin] = useState({
        correo: "",
        password: "",
    })

    const navigate = useNavigate()


    const handleChange = (titulo, value) => {
        SetgetDatasLogin({
            ...getDataLogin,
            [titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };



    const handlerLogin = () => {
        console.log(getDataLogin)
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
                        <TituloDes titulo="Bienvenido" desc='Accede a tu información académica, consulta tus cursos y gestiona calificaciones en un solo lugar.'></TituloDes>
                    </div>
                    <div className='Form_login'>
                        <div className='inputs'>
                            <InputContainer
                                placeholder="correo@gmail.com"
                                titulo="correo electronico:"
                                inputType="email"
                                value={getDataLogin.correo}   // Añadimos la prop 'value' para controlar el valor del input
                                required={true}  // Añadimos la prop 'required' para la validación
                                nomInput="correo"
                                onChange={(value) => handleChange('correo', value)} 
                            />
                            <InputContainer
                                placeholder="*"
                                titulo="Clave:"
                                inputType="password"
                                value={getDataLogin.password}   // Añadimos la prop 'value' para controlar el valor del input
                                required={true}  // Añadimos la prop 'required' para la validación
                                nomInput="password"
                                onChange={(value) => handleChange('password', value)} 
                            />

                        </div>
                        <p className='lato_1' onClick={() => navigate("/")}>Olvidaste tu contraseña?</p>
                        <div className='btn_login' onClick={handlerLogin}><button>Ingresar</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
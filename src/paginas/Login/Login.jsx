import React from 'react'
import './Login.scss';
import TituloDes from '../../componentes/TituloDes/TituloDes';



const Login = () => {
    return (
        <div className='contenedorLogin'>
            <div className=' pagLogin'>
                <div className="izq"></div>
                <div className="der">
                    <TituloDes titulo="LISTADO ESTUDIANTES" desc='el texto que acompaaña'></TituloDes>
                </div>
            </div>
        </div>
    )
}

export default Login

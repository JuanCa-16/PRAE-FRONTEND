import React, { useState } from 'react';
import InputContainer from '../../../componentes/Input/InputContainer';
import NavBarItem from '../../../componentes/NavBar/NavBarItem';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import './AjustesInstitucion.scss';
import NavBar from '../../../componentes/NavBar/NavBar';


const AjustesInstitucion = () => {

    function capitalizeWords(str) {
        return str
            .split(' ') // Divide en palabras
            .map(word => word.length > 0 
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
                : ''
            )
            .join(' ');
    }

    const [formData, setFormData] = useState({
        color_principal: '#157AFE' ,
        color_secundario:'#F5F7F9',
        color_pildora1: '#157AFE',
        color_pildora2: '#4946E2',
        color_pildora3: '#EF9131',
        fondo: '#FFFFFF',
        institucion: ''
    });


    //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

    //Envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Datos enviados:', formData);
    };

    return (
        <div className='contenedorInstitucion' style={{
            '--color-principal': formData.color_principal,
            '--color-secundario': formData.color_secundario,
            '--color-pildora1': formData.color_pildora1,
            '--color-pildora2': formData.color_pildora2,
            '--color-pildora3': formData.color_pildora3,
            '--color-fondo': formData.fondo
        }}>
            <div className="editar">
                <TituloDes titulo='EDITAR PERFIL DOCENTE' desc='Accede a tu perfil y realiza cambios en tus datos personales para tenerlo siempre actualizado.' />
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="color_principal" titulo='color_principal' inputType='text' value={formData.color_principal} required={true} onChange={(value) => handleChange('color_principal', value)} />
                        <InputContainer nomInput="color_secundario" titulo='color_secundario' inputType='text' value={formData.color_secundario} required={true} onChange={(value) => handleChange('color_secundario', value)}/>
                        <InputContainer nomInput="color_pildora1" titulo='color_pildora1'  inputType='text' value={formData.color_pildora1} required={true} onChange={(value) => handleChange('color_pildora1', value)} />
                        <InputContainer nomInput="color_pildora2" titulo='color_pildora2' inputType='text' value={formData.color_pildora2} required={true}  onChange={(value) => handleChange('color_pildora2', value)} />
                        <InputContainer nomInput="color_pildora3" titulo='color_pildora3' inputType='text' value={formData.color_pildora3} required={true} onChange={(value) => handleChange('color_pildora3', value)}/>
                        <InputContainer nomInput="fondo" titulo='fondo' inputType='text' value={formData.fondo} required={true} onChange={(value) => handleChange('fondo', value)}/>
                        <InputContainer nomInput="institucion" titulo='institucion' inputType='text' value={formData.institucion} required={true} onChange={(value) => handleChange('institucion', value)} />
                    </div>
                    
                    <button type='submit'>Guardar Cambios</button>
                </form>
            </div>
            <div className="vistas">
                <div className="p1">
                    <div className="casilla input"><InputContainer
                                        titulo="Correo electrónico:"
                                        placeholder="correo@example.com"
                                        
                                        /></div>
                    <div className="casilla"><button className='btn'>Boton</button></div>
                    <div className="casilla tipo"><NavBarItem tipo={true}></NavBarItem></div>
                    <div className="casilla capsula"><PildoraMateriaGrado texto='MATEMATICAS' color='azul'></PildoraMateriaGrado></div>
                    <div className="casilla capsula"><PildoraMateriaGrado texto='MATEMATICAS' color='morado'></PildoraMateriaGrado></div>
                    <div className="casilla capsula"><PildoraMateriaGrado texto='MATEMATICAS' color='amarillo'></PildoraMateriaGrado></div>
                </div>
                <div className="p2">
                    <NavBar></NavBar>
                </div>
            </div>
        </div>
    );
}

export default AjustesInstitucion

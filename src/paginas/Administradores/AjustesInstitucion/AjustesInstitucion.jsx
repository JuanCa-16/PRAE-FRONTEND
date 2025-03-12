import React, { useState } from 'react';
import InputContainer from '../../../componentes/Input/InputContainer';
import NavBarItem from '../../../componentes/NavBar/NavBarItem';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import FooterCom from '../../../componentes/FooterCom/FooterCom';

import './AjustesInstitucion.scss';
import NavBar from '../../../componentes/NavBar/NavBar';


const AjustesInstitucion = () => {

    const [formData, setFormData] = useState({
        color_principal: '#157AFE' ,
        color_secundario:'#F5F7F9',
        color_pildora1: '#157AFE',
        color_pildora2: '#4946E2',
        color_pildora3: '#EF9131',
        fondo: '#FFFFFF',
        institucion: '',
        logo:null
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

    const [preview, setPreview] = useState(null); // Estado para la vista previa

    const handleFileChange = (event) => {
        if (!event || !event.target || !event.target.files) {
            console.error("Evento de archivo inválido:", event);
            return;
        }
    
        const file = event.target.files[0]; 
        if (file && file.type.startsWith("image/")) {
            setFormData((prev) => ({ ...prev, logo: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            alert("Por favor, selecciona una imagen válida.");
        }
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
                        <InputContainer className={'colorInput'} nomInput="color_principal" titulo='Principal' inputType='color' value={formData.color_principal} required={true} onChange={(value) => handleChange('color_principal', value)} />
                        <InputContainer className={'colorInput'} nomInput="color_secundario" titulo='Secundario' inputType='color' value={formData.color_secundario} required={true} onChange={(value) => handleChange('color_secundario', value)}/>
                        <InputContainer className={'colorInput'} nomInput="color_pildora1" titulo='Color-1'  inputType='color' value={formData.color_pildora1} required={true} onChange={(value) => handleChange('color_pildora1', value)} />
                        <InputContainer className={'colorInput'} nomInput="color_pildora2" titulo='Color-2' inputType='color' value={formData.color_pildora2} required={true}  onChange={(value) => handleChange('color_pildora2', value)} />
                        <InputContainer className={'colorInput'} nomInput="color_pildora3" titulo='Color-3' inputType='color' value={formData.color_pildora3} required={true} onChange={(value) => handleChange('color_pildora3', value)}/>
                        <InputContainer  className={'colorInput'} nomInput="fondo" titulo='Fondo' inputType='color' value={formData.fondo} required={true} onChange={(value) => handleChange('fondo', value)}/>
                        <InputContainer nomInput="institucion" titulo='Institucion' inputType='text' value={formData.institucion} required={true} onChange={(value) => handleChange('institucion', value)} />
                        <InputContainer nomInput="logo" titulo='Logo' inputType='file' accept="image/*" onChange={handleFileChange} />

                        {preview && <img src={preview} alt="Vista previa" width="100px" style={{ 
                            borderRadius: "0.5rem",
                            margin:'1rem',
                            maxWidth: "4rem", // Máximo ancho permitido
                            width: "100%", // Se ajusta sin exceder maxWidth
                            height: "auto", // Mantiene la proporción
                        }}  />}
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
                    <div className="casilla capsula"><FooterCom></FooterCom></div>

                </div>
                <div className="p2">
                    
                    <NavBar imagen={preview? preview:''}></NavBar>
                </div>
            </div>
        </div>
    );
}

export default AjustesInstitucion

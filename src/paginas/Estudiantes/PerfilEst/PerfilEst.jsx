import React, { useState } from 'react';
import InputContainer from '../../../componentes/Input/InputContainer';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './PerfilEst.scss';

/** 
 * Componente: PerfilEst
 * Descripción: Permite al estudiante editar su perfil, incluyendo su correo, contraseña y curso.
 * Funcionalidad:
 *      - Muestra un formulario con los campos de apellidos, nombres, correo, contraseña, documento y curso.
 *      - Los campos de apellidos, nombres y documento están deshabilitados y no pueden ser editados.
 *      - Los campos de correo, contraseña y curso son editables y permiten actualizar el perfil.
 *      - Al enviar el formulario, los datos son consolidados y mostrados en la consola.
 * Props:
 *      - Ninguna.
 */
const PerfilEst = () => {

    //Datos inciales a mostrar
    const [formData, setFormData] = useState({
        apellidos: 'Henao Gallego' ,
        nombre:'Juan Camilo',
        correo: 'juan.henao.gallego@gmail.com',
        doc: '20221598320',
        contrasena: '1234',
        curso: '11-2',
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
        <div className='contenedorPerfilEst'>
            <div className="editar">
                <TituloDes titulo='EDITAR PERFIL ESTUDIANTE' desc='Accede a tu perfil y realiza cambios en tus datos personales para tenerlo siempre actualizado.' />
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" titulo='Apellidos' value={formData.apellidos} isDisabled={true} />
                        <InputContainer nomInput="nombres" titulo='Nombres' value={formData.nombre} isDisabled={true} />
                        <InputContainer nomInput="coreo" titulo='Correo' value={formData.correo} required={true} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" titulo='Contraseña' value={formData.contrasena} required={true} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" titulo='Documento' inputType='text' value={formData.doc} isDisabled={true} />
                        <InputContainer nomInput="curso" titulo='Curso' inputType='text' value={formData.curso} required={true} onChange={(value) => handleChange('curso', value)} />
                    </div>
                    <button type='submit'>Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default PerfilEst;

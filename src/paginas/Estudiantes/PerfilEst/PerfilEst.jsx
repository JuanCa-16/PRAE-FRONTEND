import React, { useState } from 'react';
import InputContainer from '../../../componentes/Input/InputContainer';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './PerfilEst.scss';

const PerfilEst = () => {
    const [formData, setFormData] = useState({
        correo: 'juan.henao.gallego@gmail.com',
        contrasena: '1234',
        curso: '11-2',
    });

    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

    const handleSubmit = () => {
        console.log('Datos enviados:', formData);
    };

    return (
        <div className='contenedorPerfilEst'>
            <div className="editar">
                <TituloDes titulo='EDITAR PERFIL ESTUDIANTE' desc='Accede a tu perfil y realiza cambios en tus datos personales para tenerlo siempre actualizado.' />
                <div className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" titulo='Apellidos' value='Henao Gallego' isDisabled={true} />
                        <InputContainer nomInput="nombres" titulo='Nombres' value='Juan Camilo' isDisabled={true} />
                        <InputContainer nomInput="coreo" titulo='Correo' value={formData.correo} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" titulo='Contraseña' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" titulo='Documento' value='2159831' isDisabled={true} />
                        <InputContainer nomInput="curso" titulo='Curso' value={formData.curso} onChange={(value) => handleChange('curso', value)} />
                    </div>
                    <button onClick={handleSubmit}>Guardar Cambios</button>
                </div>
            </div>
        </div>
    );
};

export default PerfilEst;

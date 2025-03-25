import React, { useState } from 'react';
import InputContainer from '../../../componentes/Input/InputContainer';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './EditarPerfilDoc.scss';
import Select from "react-select";
import Alerta from '../../../componentes/Alerta/Alerta';

const EditarPerfilDoc = () => {
  //Datos inciales a mostrar
    const [formData, setFormData] = useState({
        apellidos: 'Henao Gallego' ,
        nombre:'Juan Camilo',
        correo: 'juan.henao.gallego@gmail.com',
        doc: '20221598320',
        contrasena: '1234',
        materias: [{ value: "matematicas", label: "Matemáticas" },
            { value: "fisica", label: "Física" },]
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
        Alerta.success('Datos actualizados correctamente');
        console.log('Datos enviados:', formData);
    };

    return (
        <div className='contenedorPerfilDoc'>
            <div className="editar">
                <TituloDes titulo='EDITAR PERFIL DOCENTE' desc='Accede a tu perfil y realiza cambios en tus datos personales para tenerlo siempre actualizado.' />
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" titulo='Apellidos' value={formData.apellidos} isDisabled={true} />
                        <InputContainer nomInput="nombres" titulo='Nombres' value={formData.nombre} isDisabled={true} />
                        <InputContainer nomInput="coreo" titulo='Correo' value={formData.correo} required={true} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" titulo='Contraseña' value={formData.contrasena} required={true} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" titulo='Documento' inputType='text' value={formData.doc} isDisabled={true} />
                        <div className="selector">
                            <p className='lato'>Materias asignadas</p>
                            <Select
                                isMulti
                                value={formData.materias}
                                isDisabled={true} 
                                placeholder="Materias asignadas"
                            />


                    </div>
                    </div>
                    
                    <button type='submit'>Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default EditarPerfilDoc

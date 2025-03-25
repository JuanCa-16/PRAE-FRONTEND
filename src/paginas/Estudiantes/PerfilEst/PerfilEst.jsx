import React, { useState, useRef } from 'react';
import InputContainer from '../../../componentes/Input/InputContainer';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import './PerfilEst.scss';
import { useUser } from '../../../Contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import Alerta from '../../../componentes/Alerta/Alerta';
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

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user, setUser} = useUser();


    const initialFormData = useRef({
                apellidos: user.apellido,
                nombre: user.nombre,
                correo: user.email,
                doc: user.id,
                contrasena: '',
                curso: user.curso,
    });

    //Datos inciales a mostrar
    const [formData, setFormData] = useState(initialFormData.current);
    

    //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

   //Envio del formulario
    const handleSubmit = async(e) => {
        e.preventDefault()
        const dataToSend = { 
                    ...formData, 
                    contrasena: formData.contrasena || null 
                };
                console.log("Datos enviados:", dataToSend);
        
        
                try {
                    const response = await fetch(`${API_URL}usuario/updateEstudiante/${dataToSend.doc}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            nombre: dataToSend.nombre,
                            apellido: dataToSend.apellidos,
                            correo: dataToSend.correo,
                            id_curso: user.id_curso,
                            contraseña: dataToSend.contrasena || undefined,
                            id_institucion: user.institucion.id_institucion
                        })
                    });
        
                    if (!response.ok) {
                        const errorData = await response.json();
                        //toast
                        throw new Error(`${errorData.error || response.status}`);
                    }
        
                    const data = await response.json();
        
                    Alerta.success('Datos actualizados correctamente');
                    console.log('ESTUDIANTE EDITADO EXITOSAMENTE', data);
        
                    if (data.token) {
                        // 2. Guarda el nuevo token en localStorage
                        localStorage.setItem("token", data.token);
            
                        setUser(jwtDecode(data.token));
                    }
        
                    
                } catch (error) {
                    Alerta.error(error.message);
                    console.error(error);
                }
    };

    const isFormUnchanged = (
        JSON.stringify({ ...formData, contrasena: '', doc: '' }) === 
        JSON.stringify({ ...initialFormData.current, contrasena: '', doc: '' }) 
        && !formData.contrasena // Permite activar si escriben algo en "contrasena"
    );

    return (
        <div className='contenedorPerfilEst'>
            <div className="editar">
                <TituloDes titulo='EDITAR PERFIL ESTUDIANTE' desc='Accede a tu perfil y realiza cambios en tus datos personales para tenerlo siempre actualizado.' />
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" titulo='Apellidos' value={formData.apellidos} isDisabled={true} />
                        <InputContainer nomInput="nombres" titulo='Nombres' value={formData.nombre} isDisabled={true} />
                        <InputContainer nomInput="coreo" titulo='Correo' value={formData.correo} required={true} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" titulo='Contraseña' value={formData.contrasena} required={false} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" titulo='Documento' inputType='text' value={formData.doc} isDisabled={true} />
                        <InputContainer nomInput="curso" titulo='Curso' inputType='text' value={formData.curso} isDisabled={true} onChange={(value) => handleChange('curso', value)} />
                    </div>
                    <button type='submit' disabled={isFormUnchanged}>Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default PerfilEst;

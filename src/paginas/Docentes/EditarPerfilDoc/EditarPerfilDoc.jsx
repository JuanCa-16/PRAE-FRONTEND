import React, { useState, useRef, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import Alerta from '../../../componentes/Alerta/Alerta';
import InputContainer from '../../../componentes/Input/InputContainer';
import Selector from '../../../componentes/Selector/Selector';
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import { useUser } from '../../../Contexts/UserContext';

import './EditarPerfilDoc.scss';

const EditarPerfilDoc = () => {

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user, setUser} = useUser();

    function capitalizeWords(str) {
        return str
            .split(' ') // Divide en palabras
            .map(word => word.length > 0 
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
                : ''
            )
            .join(' ');
    }
    
    const initialFormData = useRef({
            apellidos: user.apellido,
            nombre: user.nombre,
            correo: user.email,
            doc: user.id,
            contrasena: '',
            area: '',
            materias: [],
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
                    const response = await fetch(`${API_URL}usuario/updateProfesor/${dataToSend.doc}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            nombre: dataToSend.nombre,
                            apellido: dataToSend.apellidos,
                            correo: dataToSend.correo,
                            area_ensenanza:dataToSend.area,
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
                    console.log('DOCENTE EDITADO EXITOSAMENTE', data);
        
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


    useEffect(() => {
            const listaProfes = async () => {

                
                try {
                    console.log(user.id)
                    const response = await fetch(`${API_URL}usuario/profesor/${user.id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
        
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`${errorData.error || response.status}`);
                    }
        
                    const profesorData = await response.json();
        
                    console.log("Respuesta del servidor profe:", profesorData);
    
                    initialFormData.current = {
                        ...initialFormData.current, // Mantiene los valores actuales
                        area: profesorData.area_ensenanza,
                        materias: profesorData.materias.map(materia => materia.id_materia)
                    };
    
                    setFormData(prevState => ({
                        ...prevState,
                        area: profesorData.area_ensenanza,
                        materias: profesorData.materias.map(materia => materia.id_materia)
                    }));
        
                    
                } catch (error) {
                    console.log(error)
                    
                    console.error(error);
                }
            };
        
            
            if (user?.id) {
                listaProfes();
            }
            
        }, [user.id, API_URL, token]); 


        const [opcionesMaterias, setOpcionesMaterias] = useState([]);
        const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
                
            useEffect(() => {
                    const listaMaterias = async () => {
                        try {
                            const response = await fetch(`${API_URL}materias/institucion/${user.institucion.id_institucion}`,{
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                            });
            
                            if (!response.ok) {
                                const errorData = await response.json(); // Obtiene respuesta del servidor
                                throw new Error(`${errorData.message || response.status}`);
                            }
            
                            const data = await response.json(); // Espera la conversión a JSON
                            if (data.length > 1) {
                                data.sort((a, b) => (a.materia?.localeCompare(b.materia || '') || 0));
                            }
                            
                            console.log("Respuesta del servidor:", data);
                            const opciones = data.map(materia => ({
                                value: materia.id_materia,
                                label: materia.nombre
                            }));
                            
                            setOpcionesMaterias(opciones);
                        } catch (error) {
                            console.error(error);
                        }
                    }
            
                    listaMaterias()
            },[API_URL, token, user.institucion.id_institucion])


        useEffect(() => {
                if (opcionesMaterias.length > 0) {
                    const initialMaterias = opcionesMaterias.filter(opt => 
                        formData.materias.includes(opt.value)
                    );
                    setMateriasSeleccionadas(initialMaterias);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [formData.materias, opcionesMaterias]); 
        

    return (
        <div className='contenedorPerfilDoc'>
            <div className="editar">
                <TituloDes 
                titulo='EDITA TU PERFIL' 
                desc='Accede a tu perfil para revisar y actualizar tus datos personales, asegurando una correcta gestión y comunicación.' />
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" titulo='Apellidos' value={formData.apellidos} isDisabled={true} />
                        <InputContainer nomInput="nombres" titulo='Nombres' value={formData.nombre} isDisabled={true}  />
                        <InputContainer nomInput="coreo" titulo='Correo Electrónico' placeholder='Ej: correo@example.com' value={formData.correo} required={true} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" titulo='Contraseña' placeholder='******' value={formData.contrasena} required={false} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" titulo='Documento' inputType='text' value={formData.doc} isDisabled={true} />
                        <InputContainer nomInput="area" required={true} placeholder='Ej: Humanidades' inputType='text' titulo='Area Enseñanza' value={formData.area} onChange={(value) => handleChange('area', capitalizeWords(value))} />
                        <Selector
                                titulo={'Materias Asignadas'} 
                                isMulti
                                disabled 
                                placeholder="Sin materias"
                                opciones={opcionesMaterias}
                                valores={materiasSeleccionadas}
                            />
                    </div>
                    
                    <button type='submit' disabled={isFormUnchanged}>Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default EditarPerfilDoc

import React, {useState,useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import './VistaEst.scss'
import { useNavigate } from "react-router-dom";
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import Selector from '../../../componentes/Selector/Selector.jsx';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import Line from '../../../componentes/Line/Line.jsx';
const VistaEst = () => {
    const location = useLocation();
    const { est } = location.state || {};

     // Estado inicial que se usará para comparar
    const initialFormData = useRef({
        apellidos: 'HENAO',
        nombre: 'JUAN',
        correo: 'juan@gmail.com',
        doc: '123456789',
        contrasena: 'juan',
        grado: '7-2'
    });

    const [formData, setFormData] = useState(initialFormData.current);

    useEffect(() => {
        setGradoAsignado(formData.grado ? { value: formData.grado, label: formData.grado } : null);
    }, [formData.grado]);
    
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

        if (!gradoAsignado) {
            alert('Debes seleccionar un grado');
            return;
        }
        console.log('Datos enviados:', formData);
        setFormData({
            apellidos: '' ,
            nombre:'',
            correo: '',
            doc: '',
            contrasena: '',
            grado: '',
        })
        setGradoAsignado(null);
    };

    // Estado de selección de una sola materia
    const [gradoAsignado, setGradoAsignado] = useState(
        formData.grado ? { value: formData.grado, label: formData.grado } : null
    );
    
    
    // Actualización de materia seleccionada
    const handleChangeGrado = (selectedOption) => {
        setGradoAsignado(selectedOption);
        setFormData({
            ...formData,
            grado: selectedOption ? selectedOption.value : '',
        });
    };
    

    const opcionesGrados = [
        { value: "6-2", label: "6-2" },
        { value: "7-2", label: "7-2" },
    ];

    const navigate = useNavigate();

    //Informacion de las pildoras
    const infoPildoras = [
        { materia: "Matemáticas", profesor: "Carlos Pérez", color:'morado' },
        { materia: "Física", profesor: "Ana Gómez", color:'azul' },
        { materia: "Química", profesor: "Luis Rodríguez",color:'amarillo' },
        { materia: "Historia", profesor: "Marta Sánchez", color:'morado' },
    ];
            
    
    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (materia, profesor,color,grado) => {
        const datos = { materia, profesor,color,grado }; // Datos a enviar
        navigate(`/estudiantes/${est}/${materia}`, { state: datos });
    };

     // Comparar el estado actual con el inicial para deshabilitar el botón si no hay cambios
    const isFormUnchanged = JSON.stringify(formData) === JSON.stringify(initialFormData.current);


    const [isModalOpen, setIsModalOpen] = useState(false);
        
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
    
        const handleEliminar = () => {
            closeModal()
        }
    return (
        <div className='contenedorCreacionEst'>
            <div className="editar">
                <TituloDes titulo='EDITAR ESTUDIANTE' desc='Registra un nuevo profesor en la plataforma y asígnale los cursos que gestionará.'></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Apellidos' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', value)}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Nombres' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre', value)}  />
                        <InputContainer nomInput="coreo" required={true}  titulo='Correo' value={formData.correo} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={true}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={true}  titulo='Documento' inputType='text' placeholder='Documento' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                    </div>
                    <div className="selectorGrado">
                        <Selector multi={false}  opciones={opcionesGrados} valores={gradoAsignado} onChange={handleChangeGrado} placeholder={"Selecciona el grado"}></Selector>
                    </div>
                    <button type='submit' disabled={isFormUnchanged}>Guardar Cambios</button>
                </form>
                <button onClick={openModal} className='rojo'>Eliminar</button>
                    <Modal
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        tipo='eliminar'
                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
                        modalTitulo = {`ELIMINAR ESTUDIANTE ${est}`}
                        >
                            <button onClick={() => handleEliminar()} className='rojo'>ELIMINAR</button>
                    </Modal>
            </div>
            <Line></Line>
            <div className='contenedorCursos'>
                        <TituloDes titulo='MIS MATERIAS:' desc='Accede a todas tus materias de forma organizada, consulta tus calificaciones y sigue tu progreso académico de manera sencilla y rápida.'></TituloDes>
                        <div className="materias">
                        {infoPildoras.map((item, index) => (
                                        <Pildora
                                            key={index}
                                            titulo={item.materia}
                                            txtsuperior={item.profesor}
                                            txtinferior={formData.grado}
                                            color={item.color}
                                            onClick={() => manejarClick(item.materia, item.profesor, item.color, formData.grado)} // Pasa la función con datos dinámicos
                                        />
                                    ))}
                        </div>
                    </div>
        </div>
    )
}


export default VistaEst

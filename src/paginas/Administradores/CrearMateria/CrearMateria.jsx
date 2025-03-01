import React, { useState, useEffect } from 'react';
import './CrearMateria.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import InputContainer from '../../../componentes/Input/InputContainer';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Modal from '../../../componentes/Modal/Modal';
import { useUser } from '../../../Contexts/UserContext.jsx';
import Line from '../../../componentes/Line/Line.jsx';


const CrearMateria = () => {

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser();
    const [reload, setReload] = useState(false);

    function capitalizeWords(str) {
        return str.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    const [formData, setFormData] = useState({
        materia: '',
    });
    
    //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };
    
    //Envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()
        const nombreCapitalize = capitalizeWords(formData.materia)
        console.log('Datos enviados:', nombreCapitalize);

        try {
            const response = await fetch(`${API_URL}materias`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre: nombreCapitalize, institucion: user.institucion })
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtiene respuesta del servidor
                throw new Error(`${errorData.message || response.status}`);
            }

            console.log('MATERIA CREADO EXITOSAMENTE');
            setReload(!reload);
            setFormData({materia: ''})

        } catch (error) {
            //toast
            console.error(error);
        }
        
    };

    const [infoPildoras, setInfoPildoras] = useState([]);

    useEffect(() => {
        const listaMaterias = async () => {
            try {
                const response = await fetch(`${API_URL}materias/institucion/${user.institucion}`,{
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
                setInfoPildoras(data);
            } catch (error) {
                console.error(error);
            }
        }

        listaMaterias()
    },[reload,API_URL, token, user.institucion])

    
    
        //Elimina opciones duplicadas para el selector
    const materiasUnicas = [...new Set(infoPildoras.map(item => item.nombre))];
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    
        // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setMateriaSeleccionada('');
    };
    
    const pildorasFiltradas = infoPildoras.filter(item =>
        (materiaSeleccionada === '' || item.materia === materiaSeleccionada)
    );


    const [isModalOpen, setIsModalOpen] = useState(null);
    
    const openModal = (index) => setIsModalOpen(index);
    const closeModal = () => setIsModalOpen(null);

    const handleEliminar = async (index,materia,id) => {
        console.log(materia,index,id)

        try {
            const response = await fetch(`${API_URL}materias/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtiene respuesta del servidor
                throw new Error(`${errorData.message || response.status}`);
            }

            console.log('MATERIA ELIMINADA EXITOSAMENTE');
            closeModal()
            setReload(!reload);
        } catch (error) {
            //toast
            console.error(error);
        }
    }

    return (
        <div className='contenedorMaterias'>
            <div className="crear">
                <TituloDes titulo='CREAR MATERIA' desc='Ingresa el nombre de la materia nueva' ></TituloDes>
                <form onSubmit={handleSubmit} className='formulario'>
                    <InputContainer value={formData.materia} inputType='text' placeholder='Materia' titulo='Materia' required={true} onChange={(value) => handleChange('materia',  value)}></InputContainer>
                    <button type='submit'>CREAR</button>
                </form>
            </div>
            <Line></Line>
            <div className="todosMaterias">
                <TituloDes 
                    titulo='LISTADO DE MATERIAS:' 
                    desc='Eliminar una materia.'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={materiasUnicas}
                            valorSeleccionado={materiaSeleccionada}
                            setValorSeleccionado={setMateriaSeleccionada}
                            titulo='Materia'
                        />
                        <button onClick={limpiarFiltros}>Limpiar</button>
                    </div>

                    <div className="materias">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                <React.Fragment key={index}>
                                    <PildoraMateriaGrado 
                                        texto={item.nombre} 
                                        color={item.color} 
                                        key={index} 
                                        onClick={() => openModal(index)}
                                    />
                                    {isModalOpen === index && (
                                        <Modal
                                        isOpen={true}
                                        closeModal={closeModal}
                                        tipo='eliminar'
                                        modalTexto={`Seguro de que quieres eliminar ${item.nombre} como materia de la institucion.`}
                                        modalTitulo = {`ELIMINAR MATERIA ${item.nombre.toUpperCase()}`}
                                        >
                                            <button onClick={() => handleEliminar(index, item.nombre, item.id_materia)} className='rojo'>ELIMINAR</button>
                                        </Modal>
                                    )}
                                    </React.Fragment>
                            ))
                        ) : (
                            <p className="mensaje-no-cursos">No hay cursos que cumplan con estos parametros.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrearMateria

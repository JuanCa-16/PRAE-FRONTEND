import React, { useState, useEffect } from 'react';
import './CrearGrados.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import InputContainer from '../../../componentes/Input/InputContainer';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Modal from '../../../componentes/Modal/Modal';
import { useUser } from '../../../Contexts/UserContext.jsx';
import Line from '../../../componentes/Line/Line.jsx';

const CrearGrados = () => {

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser();

    const [reload, setReload] = useState(false);

    
    const [formData, setFormData] = useState({
        grado: '',
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
        e.preventDefault();
        console.log('Datos enviados:', formData);
    
        const regex = /^(1[0-1]|[1-9])-([1-9]|[A-Za-z])$/;
    
        if (!regex.test(formData.grado)) {
            console.log('Formato no válido, debe ser 1-1, 9-2 o 3-A');
            return;
        }
    
        const nuevoGrado = formData.grado.toUpperCase();
        
    
        try {
            const response = await fetch(`${API_URL}cursos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre: nuevoGrado, id_institucion: user.institucion.id_institucion })
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Obtiene respuesta del servidor
                throw new Error(`${errorData.message || response.status}`);
            }
    
            console.log('GRADO CREADO EXITOSAMENTE');
            setReload(!reload);
            setFormData({ grado: '' });
    
        } catch (error) {
            //toast
            console.error(error);
        }
    };

    const [infoPildoras, setInfoPildoras] = useState([]);

    
    useEffect(()=>{
        const listaGrados = async () => {
            try {
                const response = await fetch(`${API_URL}cursos/institucion/${user.institucion.id_institucion}`, {
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
                data.sort((a, b) => {
                    const [numA, subA] = a.nombre.split('-');
                    const [numB, subB] = b.nombre.split('-');
    
                    return parseInt(numA) - parseInt(numB) || subA.localeCompare(subB, 'es', { numeric: true });
                });
                console.log("Respuesta del servidor:", data);
                setInfoPildoras(data); // Guarda los datos en el estado

            } catch (error) {
                console.error(error);
            }
        }

        listaGrados()
    },[reload,API_URL, token, user.institucion.id_institucion])

    
    //Elimina opciones duplicadas para el selector
    const gradosUnicos = [...new Set(infoPildoras.map(item => item.nombre))];
    const gradosOrdenados = gradosUnicos.sort((a, b) => {
        const [numA, subA] = a.split('-');
        const [numB, subB] = b.split('-');
    
        return parseInt(numA) - parseInt(numB) || subA.localeCompare(subB, 'es', { numeric: true });
    });
    
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');
    
        // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setGradoSeleccionado('');
    };
    
    const pildorasFiltradas = infoPildoras.filter(item =>
        (gradoSeleccionado === '' || item.nombre === gradoSeleccionado)
    );


    const [isModalOpen, setIsModalOpen] = useState(null);
    
    const openModal = (index) => setIsModalOpen(index);
    const closeModal = () => setIsModalOpen(null);

    const handleEliminar = async (index,grado, id) => {
        console.log(grado, index, id)
        try {
            const response = await fetch(`${API_URL}cursos/${id}`, {
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
    
            console.log('GRADO ELIMINADO EXITOSAMENTE');
            closeModal()
            setReload(!reload);
            
    
        } catch (error) {
            //toast
            console.error(error);
        }
        
    }

    
    return (
        <div className='grados'>
            <div className="crear">
                <TituloDes titulo='CREAR GRADO' desc='Ingresa el curso a crear, puedes creear cursos desde 1 hasta 11' ></TituloDes>
                <form onSubmit={handleSubmit} className='formulario'>
                    <InputContainer value={formData.grado} inputType='text' placeholder='6-2' titulo='Grado' required={true} onChange={(value) => handleChange('grado',  value)}></InputContainer>
                    <button type='submit'>CREAR</button>
                </form>
            </div>
            <Line></Line>
            <div className="todosGrados">
                <TituloDes 
                    titulo='LISTADO DE GRADOS:' 
                    desc='Eliminar un grado'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={gradosOrdenados}
                            valorSeleccionado={gradoSeleccionado}
                            setValorSeleccionado={setGradoSeleccionado}
                            titulo='Grado'
                        />
                        <button onClick={limpiarFiltros}>Limpiar</button>
                    </div>

                    <div className="materias">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                <React.Fragment key={index}>
                                    <PildoraMateriaGrado 
                                        texto={item.nombre} 
                                        color={item.color || 'azul'}
                                        key={index} 
                                        onClick={() => openModal(index)}
                                    />
                                    {isModalOpen === index && (
                                        <Modal
                                        isOpen={true}
                                        closeModal={closeModal}
                                        tipo='eliminar'
                                        modalTexto={`Seguro de que quieres eliminar ${item.nombre} como grado de la institucion.`}
                                        modalTitulo = {`ELIMINAR GRADO ${item.nombre}`}
                                        >
                                            <button onClick={() => handleEliminar(index, item.nombre, item.id_curso)} className='rojo'>ELIMINAR</button>
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

export default CrearGrados

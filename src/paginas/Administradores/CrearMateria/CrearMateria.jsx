import React, { useState } from 'react';
import './CrearMateria.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import InputContainer from '../../../componentes/Input/InputContainer';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Modal from '../../../componentes/Modal/Modal';

const CrearMateria = () => {

    
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
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Datos enviados:', formData);
        setFormData({materia: ''})
    };

    
    const infoPildoras = [
        {materia: "Matematicas", color: 'morado' },
        {materia: "Español", color: 'azul' },
        {materia: "Sociales", color: 'amarillo' },
        {materia: "Ingles", color: 'azul' },
        {materia: "Filosofia", color: 'morado' },
    ];
    
        //Elimina opciones duplicadas para el selector
    const materiasUnicas = [...new Set(infoPildoras.map(item => item.materia))];
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

    const handleEliminar = (index,grado) => {
        console.log(grado)
        closeModal()
    }

    return (
        <div className='contenedorMaterias'>
            <div className="crear">
                <TituloDes titulo='CREAR MATERIA' desc='Ingresa el nombre de la materia nueva' ></TituloDes>
                <form onSubmit={handleSubmit} className='formulario'>
                    <InputContainer value={formData.materia} inputType='text' placeholder='Materia' titulo='Materia' onChange={(value) => handleChange('materia',  value)}></InputContainer>
                    <button type='submit'>CREAR</button>
                </form>
            </div>
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
                            titulo='Grado'
                        />
                        <button onClick={limpiarFiltros}>Limpiar</button>
                    </div>

                    <div className="materias">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                <React.Fragment key={index}>
                                    <PildoraMateriaGrado 
                                        texto={item.materia} 
                                        color={item.color} 
                                        key={index} 
                                        onClick={() => openModal(index)}
                                    />
                                    {isModalOpen === index && (
                                        <Modal
                                        isOpen={true}
                                        closeModal={closeModal}
                                        tipo='eliminar'
                                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar esta materia será permanente y no se podrá cancelar.'
                                        modalTitulo = {`ELIMINAR MATERIA ${item.materia}`}
                                        >
                                            <button onClick={() => handleEliminar(index, item.materia)} className='rojo'>ELIMINAR</button>
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

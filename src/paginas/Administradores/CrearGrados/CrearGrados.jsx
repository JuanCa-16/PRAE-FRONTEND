import React, { useState } from 'react';
import './CrearGrados.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes';
import InputContainer from '../../../componentes/Input/InputContainer';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Modal from '../../../componentes/Modal/Modal';
const CrearGrados = () => {

    
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
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Datos enviados:', formData);
        setFormData({grado: ''})
    };

    
    const infoPildoras = [
        {grado: "6-2", color: 'morado' },
        {grado: "6-2", color: 'azul' },
        {grado: "11-2", color: 'amarillo' },
        {grado: "10-1", color: 'morado' },
        {grado: "11-2", color: 'morado' },
        {grado: "9-2", color: 'morado' },
    ];
        
    
        //Elimina opciones duplicadas para el selector
    const gradosUnicos = [...new Set(infoPildoras.map(item => item.grado))];
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');
    
        // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setGradoSeleccionado('');
    };
    
    const pildorasFiltradas = infoPildoras.filter(item =>
        (gradoSeleccionado === '' || item.grado === gradoSeleccionado)
    );


    const [isModalOpen, setIsModalOpen] = useState(null);
    
    const openModal = (index) => setIsModalOpen(index);
    const closeModal = () => setIsModalOpen(null);

    const handleEliminar = (index,grado) => {
        console.log(grado)
        closeModal()
    }

    return (
        <div className='grados'>
            <div className="crear">
                <TituloDes titulo='CREAR GRADO' desc='Ingresa el curso a crear' ></TituloDes>
                <form onSubmit={handleSubmit} className='formulario'>
                    <InputContainer value={formData.grado} inputType='text' placeholder='Grado' titulo='Grado' onChange={(value) => handleChange('grado',  value)}></InputContainer>
                    <button type='submit'>CREAR</button>
                </form>
            </div>
            <div className="todosGrados">
                <TituloDes 
                    titulo='LISTADO DE GRADOS:' 
                    desc='Eliminar un grado'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={gradosUnicos}
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
                                        texto={item.grado} 
                                        color={item.color} 
                                        key={index} 
                                        onClick={() => openModal(index)}
                                    />
                                    {isModalOpen === index && (
                                        <Modal
                                        isOpen={true}
                                        closeModal={closeModal}
                                        tipo='eliminar'
                                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
                                        modalTitulo = {`ELIMINAR GRADO ${item.grado}`}
                                        >
                                            <button onClick={() => handleEliminar(index, item.grado)} className='rojo'>ELIMINAR</button>
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

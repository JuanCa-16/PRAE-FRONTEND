import React, {useState,useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import './VistaDocente.scss'
import { useNavigate } from "react-router-dom";
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import Select from "react-select";
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
const VistaDocente = () => {

    const location = useLocation();
    const { profe } = location.state || {};
    
  
     // Estado inicial que se usará para comparar
     const initialFormData = useRef({
        apellidos: 'HENAO',
        nombre: 'JUAN',
        correo: 'juan@gmail.com',
        doc: '123456789',
        contrasena: 'juan',
        materias: ['fisica', 'quimica']
    });

    const [formData, setFormData] = useState(initialFormData.current);

    useEffect(() => {
        const initialMaterias = opcionesMaterias.filter(opt => 
            formData.materias.includes(opt.value)
        );
        setMateriasSeleccionadas(initialMaterias);
    }, [formData.materias]); 
    
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

        if(materiasSeleccionadas.length === 0){
            alert('Debes seleccionar alemnos una materia')
            return;
        }
        console.log('Datos enviados:', formData);
        setFormData({
            apellidos: '' ,
            nombre:'',
            correo: '',
            doc: '',
            contrasena: '',
            materias: []
        })
        setMateriasSeleccionadas([])
    };

    const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

        // Opciones de materias
    const opcionesMaterias = [
        { value: "matematicas", label: "Matemáticas" },
        { value: "fisica", label: "Física" },
        { value: "quimica", label: "Química" },
        { value: "biologia", label: "Biología" },
    ];
    
    const handleChangeMaterias = (selectedOptions) => {
        setMateriasSeleccionadas(selectedOptions);
        setFormData({
            ...formData,
            materias: selectedOptions.map((materia) => materia.value),
        });
    };   

    const navigate = useNavigate();

    const infoPildoras = [
        { materia: "Matemáticas", grado: "6-2", color: 'morado' },
        { materia: "Física", grado: "6-2", color: 'azul' },
        { materia: "Química", grado: "11-2", color: 'amarillo' },
        { materia: "Historia", grado: "10-1", color: 'morado' },
        { materia: "Historia", grado: "11-2", color: 'morado' },
        { materia: "Historia", grado: "9-2", color: 'morado' },
    ];
            
        
   //Elimina opciones duplicadas para el selector
    const materiasUnicas = [...new Set(infoPildoras.map(item => item.materia))];
    const gradosUnicos = [...new Set(infoPildoras.map(item => item.grado))];
   
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');
   
            // Función para limpiar los filtros
    // Función para limpiar los filtros
    const limpiarFiltros = () => {
        setMateriaSeleccionada('');
        setGradoSeleccionado('');
    };

    const pildorasFiltradas = infoPildoras.filter(item =>
        (materiaSeleccionada === '' || item.materia === materiaSeleccionada) &&
        (gradoSeleccionado === '' || item.grado === gradoSeleccionado)
    );

    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (profe,materia, profesor,color,grado) => {
        // const datos = { materia, profesor,color,grado }; // Datos a enviar
        // navigate("/materias/notas", { state: datos }); // Navegar con los datos
        navigate(`/profesores/${profe}`);
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
        <div className='contenedorCreacionDocente'>
            <div className="crear">
                <TituloDes titulo='EDITAR PROFESOR' desc='Registra un nuevo profesor en la plataforma y asígnale los cursos que gestionará.'></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Apellidos' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', value)}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Nombres' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre', value)}  />
                        <InputContainer nomInput="coreo" required={true}  titulo='Correo' value={formData.correo} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={true}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={true}  titulo='Documento' inputType='text' placeholder='Documento' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                    </div>
                    <div className="selectorMat">
                        <div className="selector">
                            <h4>Asignacion de Materias</h4>
                            <Select
                                isMulti
                                options={opcionesMaterias}
                                value={materiasSeleccionadas}
                                onChange={handleChangeMaterias}
                                placeholder="Selecciona las materias"
                            />
                        </div>
                        <div className="selecciones">
                            <h4>Materias seleccionadas:</h4>
                            {materiasSeleccionadas.length === 0? (
                                <p>No has seleccionado ninguna materia todavía.</p>
                            ): (
                                <ul>
                                {materiasSeleccionadas.map((materia) => (
                                    <li key={materia.value}>{materia.label}</li>
                                ))}
                                </ul>
                            ) }
                            
                        </div>
                    </div>
                    <button type='submit' disabled={isFormUnchanged}>Guardar Cambios</button>
                </form>
                <button onClick={openModal} className='rojo'>Eliminar</button>
                    <Modal
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        tipo='eliminar'
                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
                        modalTitulo = {`ELIMINAR PROFESOR ${profe}`}
                        >
                            <button onClick={() => handleEliminar()} className='rojo'>ELIMINAR</button>
                    </Modal>
            </div>
            <div className="linea"></div>
            <div className="lista">
            <TituloDes 
                    titulo='LISTADO DE CURSOS ASIGNADOS::' 
                    desc='Consulta los cursos que tienes asignados en los distintos grados. Gestiona las calificaciones y el progreso de tus estudiantes en cada uno de tus grupos.'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={materiasUnicas}
                            valorSeleccionado={materiaSeleccionada}
                            setValorSeleccionado={setMateriaSeleccionada}
                            titulo='Materia'
                        />
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
                                
                                <Pildora
                                    key={index} 
                                    titulo={item.materia}
                                    txtsuperior={profe}
                                    txtinferior={item.grado}
                                    color={item.color}
                                    onClick={() => manejarClick(item.profe)}
                                />
                                    
                                    
                            ))
                        ) : (
                            <p>No hay profesores que cumplan con estos parametros</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VistaDocente

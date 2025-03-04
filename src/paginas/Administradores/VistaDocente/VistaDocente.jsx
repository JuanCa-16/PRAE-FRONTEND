import React, {useState,useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import './VistaDocente.scss'
import { useNavigate } from "react-router-dom";
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import Selector from '../../../componentes/Selector/Selector.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import { useUser } from '../../../Contexts/UserContext.jsx';
const VistaDocente = () => {

    const location = useLocation();
    const { profe } = location.state || {};

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser();
    const [reload, setReload] = useState(false);

    // Estado inicial que se usará para comparar
    const initialFormData = useRef({
        apellidos: '',
        nombre: '',
        correo: '',
        doc: '',
        contrasena: '',
        area: '',
        materias: [] // Inicializado con un array vacío
    });

    const [formData, setFormData] = useState(initialFormData.current);
    
    useEffect(() => {
        const listaProfes = async () => {
            try {
                const response = await fetch(`${API_URL}usuario/profesor/${profe.documento_identidad}`, {
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
                    apellidos: profesorData.apellido,
                    nombre: profesorData.nombre,
                    correo: profesorData.correo,
                    doc: profesorData.documento_identidad,
                    contrasena: '',
                    area: profesorData.area_ensenanza,
                    materias: profesorData.materias.map((materia) => materia.id_materia)
                };

                setFormData({
                    apellidos: profesorData.apellido,
                    nombre: profesorData.nombre,
                    correo: profesorData.correo,
                    doc: profesorData.documento_identidad,
                    contrasena: '',
                    area: profesorData.area_ensenanza,
                    materias: profesorData.materias.map((materia) => materia.id_materia)
                });
    
                
            } catch (error) {
                console.error(error);
            }
        };
    
        if (profe?.documento_identidad) {
            listaProfes();
        }
    }, [reload,profe.documento_identidad, API_URL, token]); // ✅ Dependencias correctas
    

    const [opcionesMaterias, setOpcionesMaterias] = useState([]);
        
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
    },[API_URL, token, user.institucion])

        //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };
    
        //Envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(materiasSeleccionadas.length === 0){
            alert('Debes seleccionar alemnos una materia')
            return;
        }

        const dataToSend = { 
            ...formData, 
            contrasena: formData.contrasena || null 
        };

        // console.log('envio',dataToSend)
        // console.log('original',initialFormData.current)

        try {
            const response = await fetch(`${API_URL}usuario/updateProfesor/${dataToSend.doc}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre: dataToSend.nombre,
                    apellido: dataToSend.apellidos,
                    correo: dataToSend.correo,
                    contraseña: dataToSend.contrasena || undefined,
                    area_ensenanza:dataToSend.area, institucion: user.institucion })
            });

            if (!response.ok) {
                const errorData = await response.json();
                //toast
                throw new Error(`${errorData.error || response.status}`);
            }

            const data = await response.json(); 
            console.log('DOCENTE EDITADO EXITOSAMENTE', data);
            
            setReload(!reload);
        } catch (error) {
            //toast
            console.error(error);
        }

    };

    const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);



    useEffect(() => {
        if (opcionesMaterias.length > 0) {
            const initialMaterias = opcionesMaterias.filter(opt => 
                formData.materias.includes(opt.value)
            );
            setMateriasSeleccionadas(initialMaterias);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.materias, opcionesMaterias]); 
    
    
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
    const manejarClick = (materia, profesor,color,grado) => {
        const datos = { materia, profesor,color,grado }; // Datos a enviar
        navigate(`/profesores/${profesor}/${materia}`, { state: datos });
    };

     // Comparar el estado actual con el inicial para deshabilitar el botón si no hay cambios
    const isFormUnchanged = (
        JSON.stringify({ ...formData, contrasena: '', doc: '' }) === 
        JSON.stringify({ ...initialFormData.current, contrasena: '', doc: '' }) 
        && !formData.contrasena // Permite activar si escriben algo en "contrasena"
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
        
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
    
        const handleEliminar = async () => {
            try {
                const response = await fetch(`${API_URL}usuario/${formData.doc}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
        
                if (!response.ok) {
                    const errorData = await response.json(); // Obtiene respuesta del servidor
                    throw new Error(`${errorData.error || response.status}`);
                }
        
                console.log('DOCENTE ELIMINADO EXITOSAMENTE');
                closeModal()
                
                navigate(`/profesores`);
                
                
        
            } catch (error) {
                //toast
                console.error(error);
            }
            
        }
    return (
        <div className='contenedorCreacionEst'>
            <div className="editar">
                <TituloDes titulo='EDITAR PROFESOR' desc='Registra un nuevo profesor en la plataforma y asígnale los cursos que gestionará.'></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Apellidos' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', value)}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Nombres' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre', value)}  />
                        <InputContainer nomInput="coreo" required={false}  titulo='Correo' value={formData.correo} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={false}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={false} isDisabled={true} titulo='Documento' inputType='text' placeholder='Documento' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                        <InputContainer nomInput="area" required={true} placeholder='Humanidades' inputType='text' titulo='Area Enseñanza' value={formData.area} onChange={(value) => handleChange('area', value)} />
                    </div>
                    <div className="selectorMat">
                    
                        <Selector titulo={'Asignacion de Materias'} placeholder={"Selecciona las materias"} onChange={handleChangeMaterias} opciones={opcionesMaterias} valores={materiasSeleccionadas}></Selector>
                        {/* <div className="selecciones">
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
                            
                        </div> */}
                    </div>
                    <button type='submit' disabled={isFormUnchanged}>Guardar Cambios</button>
                </form>
                
                <button onClick={openModal} className='rojo'>Eliminar</button>
                    <Modal
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        tipo='eliminar'
                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
                        modalTitulo = {`ELIMINAR PROFESOR ${(formData.nombre).toUpperCase()}`}
                        >
                            <button onClick={() => handleEliminar()} className='rojo'>ELIMINAR</button>
                    </Modal>
            </div>
            <Line></Line>
            <div className="lista">
            <TituloDes 
                    titulo='LISTADO DE CURSOS ASIGNADOS:' 
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
                                    txtsuperior={profe.nombre}
                                    txtinferior={item.grado}
                                    color={item.color}
                                    onClick={() => manejarClick(item.materia, profe.nombre, item.color, item.grado)}
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

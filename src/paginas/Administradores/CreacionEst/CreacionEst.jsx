import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import Alerta from '../../../componentes/Alerta/Alerta.jsx';
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import Line from '../../../componentes/Line/Line.jsx';
import PildoraEst from '../../../componentes/PildoraEst/PildoraEst.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'

import { useUser } from '../../../Contexts/UserContext.jsx';

import './CreacionEst.scss'

const CreacionEst = () => {

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser();
    const [reload, setReload] = useState(false);

    function capitalizeWords(str) {
        return str
            .split(' ') // Divide en palabras
            .map(word => word.length > 0 
                ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
                : ''
            )
            .join(' ');
    }


    const [opcionesGrados, setOpcionesGrados] = useState([])

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
                    console.log("Respuesta del servidor grados:", data);
                    const opciones = data.map(materia => ({
                        value: materia.id_curso,
                        label: materia.nombre
                    }));
                    setOpcionesGrados(opciones)
                    
    
                } catch (error) {
                    console.error(error);
                }
            }
    
            listaGrados()
        },[reload,API_URL, token, user.institucion.id_institucion])
    

     //Datos inciales a mostrar
    const [formData, setFormData] = useState({
        apellidos: '' ,
        nombre:'',
        correo: '',
        doc: '',
        contrasena: '',
        grado: ''
    });
    
        //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };
    
    
    // Envío del formulario con validación para una sola materia

    // Reiniciar formulario
    const handleSubmit = async(e) => {
        e.preventDefault();
    
        if (!gradoAsignado) {
            Alerta.info('Debes seleccionar un grado');
            return;
        }
    
        console.log('Datos enviados:', formData);

        try {
            const response = await fetch(`${API_URL}usuario/estudiante`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({documento_identidad: formData.doc,
                    nombre: formData.nombre,
                    apellido: formData.apellidos,
                    correo: formData.correo,
                    contraseña: formData.contrasena,
                    id_institucion: user.institucion.id_institucion,
                    id_curso: formData.grado })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al crear estudiante: ${errorData.error || response.status}`);
            }

            console.log('EST CREADO EXITOSAMENTE');
            Alerta.success('Estudiante creado exitosamente');
            // Reiniciar formulario
            setFormData({
                apellidos: '',
                nombre: '',
                correo: '',
                doc: '',
                contrasena: '',
                grado: '',
            });
            setGradoAsignado(null);

            setReload(!reload);
        } catch (error) {
            console.error(error);
            Alerta.error(error.message);
        }
    
        
    };
    


    // Estado de selección de una sola materia
    const [gradoAsignado, setGradoAsignado] = useState('');


    // Actualización de materia seleccionada
    const handleChangeGrado = (selectedOption) => {
        setGradoAsignado(selectedOption ? selectedOption.value : '');
        setFormData({
            ...formData,
            grado: selectedOption ? selectedOption.value : '',
        });
    };

        const [infoPildoras, setInfoPildoras] = useState([])
        
        useEffect(() => {
                    const listaEst = async () => {
                        try {
                            const response = await fetch(`${API_URL}usuario/institucion/${user.institucion.id_institucion}`,{
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                            });
            
                            if (!response.ok) {
                                const errorData = await response.json(); // Obtiene respuesta del servidor
                                throw new Error(`${errorData.error || response.status}`);
                            }
            
                            const data = await response.json(); // Espera la conversión a JSON
                            if (data.length >= 1) {
                                const dataPildora = data.map(est => ({
                                    ...est,
                                    nombreCompleto: `${est.apellido} ${est.nombre}`
                                })).sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
                                console.log("Respuesta completa:", dataPildora);
                                setInfoPildoras(dataPildora);
                                
                            }else{
                                console.log("Respuesta del listado est:", data);
                            }
                            
                            
                        } catch (error) {
                            console.error(error);
                        }
                    }
            
                    listaEst()
        },[reload,API_URL, token, user.institucion.id_institucion])
    
        //Elimina opciones duplicadas para el selector
        const nombreEstudiante = [...new Set(infoPildoras.map(item => item.nombreCompleto))];
        const gradosUnicos = [...new Set(infoPildoras.map(item => item.curso))];
    
        const [nombreEstudianteSeleccionada, setnombreEstudianteSeleccionada] = useState('');
        const [gradoSeleccionado, setGradoSeleccionado] = useState('');
    
        // Función para limpiar los filtros
        const limpiarFiltros = () => {
            setnombreEstudianteSeleccionada('');
            setGradoSeleccionado('');
        };
    
        const pildorasFiltradas = infoPildoras.filter(item =>
            (nombreEstudianteSeleccionada === '' || item.nombreCompleto === nombreEstudianteSeleccionada) &&
            (gradoSeleccionado === '' || item.curso === gradoSeleccionado)
        );
    
        const navigate = useNavigate();
        
        //pasa los datos de la materia a la pagina de notas de la materias
        const manejarClick = ( est) => {
            const datos = {est}; // Datos a enviar
            navigate(`/estudiantes/${est.nombreCompleto}`, { state: datos }); // Navegar con los datos
        };
    
    

    return (
        <div className='contenedorCreacionEst'>
            <div className="crear">
                <TituloDes 
                    titulo='CREAR UN ESTUDIANTE' 
                    desc='Registra un nuevo profesor en la plataforma proporcionando la información necesaria y 
                    asigna los cursos que gestionará. Asegúrate de que todos los datos estén correctos para una 
                    correcta asignación de los cursos.'>

                </TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Ingresa apellidos' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', capitalizeWords(value))}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Ingresa nombre(s)' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre', capitalizeWords(value))}  />
                        <InputContainer nomInput="coreo" required={true}  titulo='Correo' placeholder='Ej: correo@example.com' value={formData.correo} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={true}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={true}  titulo='Documento' inputType='text' placeholder='Ingresa documento' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                    </div>
                    <div className="selectorGrado">
                        <Selector titulo={'Asignación de Grado'} multi={false} opciones={opcionesGrados} valores={gradoAsignado ? opcionesGrados.find((opcion) => opcion.value === gradoAsignado) : null} onChange={handleChangeGrado} placeholder={"Grado"}></Selector>
                    </div>
                    <button type='submit'>Guardar Cambios</button>
                </form>
            </div>
            <Line></Line>
            <div className='contenedorListadoEst'>
                <TituloDes 
                    titulo='LISTADO DE ESTUDIANTES' 
                    desc='Consulta el listado completo de estudiantes registrados en la institución, organizados
                     por los diferentes grados. Esta información te permitirá gestionar y revisar el progreso académico 
                    de los estudiantes en cada nivel educativo.'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={nombreEstudiante}
                            valorSeleccionado={nombreEstudianteSeleccionada}
                            setValorSeleccionado={setnombreEstudianteSeleccionada}
                            titulo='Estudiantes'
                            placeholder='Selecciona los estudiantes'
                        />
                        <CustomSelect
                            opciones={gradosUnicos}
                            valorSeleccionado={gradoSeleccionado}
                            setValorSeleccionado={setGradoSeleccionado}
                            titulo='Grado'
                            placeholder='Selecciona el grado'
                        />
                        <button onClick={limpiarFiltros}>Vaciar</button>
                    </div>

                    <div className="estudiantes">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                <PildoraEst
                                    key={index}
                                    est={item.nombreCompleto}
                                    curso={item.curso}
                                    color={item.color}
                                    clase='peque'
                                    onClick={() => manejarClick(item)}
                                />
                            ))
                        ) : (
                            <p className="mensaje-no-est">No hay estudiantes que cumplan con estos parametros.</p>
                        )}
                    </div>
                </div>
        </div>
        </div>
    )
}


export default CreacionEst

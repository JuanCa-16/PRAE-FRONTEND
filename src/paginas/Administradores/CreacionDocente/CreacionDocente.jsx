import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import './CreacionDocente.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Line from '../../../componentes/Line/Line.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';
import { useUser } from '../../../Contexts/UserContext.jsx';
const CreacionDocente = () => {

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

     //Datos inciales a mostrar
    const [formData, setFormData] = useState({
        apellidos: '' ,
        nombre:'',
        correo: '',
        doc: '',
        contrasena: '',
        area: '',
        materias: []
    });
    
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

        console.log('Datos enviados:', formData);

        try {
            const response = await fetch(`${API_URL}usuario/docente`,{
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
                    area_ensenanza:formData.area, institucion: user.institucion })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al crear docente: ${errorData.error || response.status}`);
            }

    

            for (const materia of formData.materias) {
                try {
                    const responseMateria = await fetch(`${API_URL}dictar`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            documento_profe: formData.doc,
                            id_materia: materia
                        })
                    });
            
                    if (!responseMateria.ok) {
                        const errorData = await responseMateria.json();
                        throw new Error(`Error al asignar materia ${materia}: ${errorData.message || responseMateria.status}`);
                    }
                } catch (error) {
                    console.error(error);
                }
            }


    

            console.log('DOCENTE CREADO EXITOSAMENTE');
            
            setFormData({
                apellidos: '' ,
                nombre:'',
                correo: '',
                doc: '',
                contrasena: '',
                area: '',
                materias: []
            })
            setMateriasSeleccionadas([])

            setReload(!reload);
        } catch (error) {
            //toast
            console.error(error);
        }



    
    };

    const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);

    
    const handleChangeMaterias = (selectedOptions) => {
        setMateriasSeleccionadas(selectedOptions);
        setFormData({
            ...formData,
            materias: selectedOptions.map((materia) => materia.value),
        });
    };   

    const navigate = useNavigate();

    const [infoPildoras, setInfoPildoras] = useState([])

    useEffect(() => {
            const listaProfes = async () => {
                try {
                    const response = await fetch(`${API_URL}usuario/docentes/institucion/${user.institucion}`,{
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
                    if (data.length > 1) {
                        data.sort((a, b) => a.apellido.localeCompare(b.apellido))
                    }
                    
                    console.log("Respuesta del servidor:", data);
                    setInfoPildoras(data);
                } catch (error) {
                    console.error(error);
                }
            }
    
            listaProfes()
        },[reload,API_URL, token, user.institucion])
            
        
            //Elimina opciones duplicadas para el selector
    const profesUnicos = [...new Set(infoPildoras.map(item => item.nombre))];
    const [profeSeleccionado, setProfeSeleccionado] = useState('');
        
            // Función para limpiar los filtros
    const limpiarFiltros = () => {
            setProfeSeleccionado('');
        };
        
        const pildorasFiltradas = infoPildoras.filter(item =>
            (profeSeleccionado === '' || item.nombre === profeSeleccionado)
        );

    //pasa los datos de la materia a la pagina de notas de la materias
    const manejarClick = (profe,materia, profesor,color,grado) => {
        const datos = {profe};
        // navigate("/materias/notas", { state: datos }); // Navegar con los datos
        navigate(`/profesores/${profe}`, { state: datos });
    };
    return (
        <div className='contenedorCreacionDocente'>
            <div className="crear">
                <TituloDes titulo='CREAR PROFESOR' desc='Registra un nuevo profesor en la plataforma y asígnale los cursos que gestionará.'></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Castro Henao' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', capitalizeWords(value))}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Esteban' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre',  capitalizeWords(value))}  />
                        <InputContainer nomInput="coreo" required={true}  titulo='Correo' value={formData.correo} placeholder='esteban@gmail.com' onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={true}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={true}  titulo='Documento' inputType='text' placeholder='1116458796' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                        <InputContainer nomInput="areaEnsenanza" required={true}  titulo='Area Enseñanza' inputType='text' placeholder='Humanidades' value={formData.area} onChange={(value) => handleChange('area',  capitalizeWords(value))} />
                    </div>
                    <div className="selectorMat">
                        <Selector titulo={'Asignacion de Materias'} mensajeVacio='Crea una materia' opciones={opcionesMaterias} valores={materiasSeleccionadas} onChange={handleChangeMaterias} placeholder={"Selecciona las materias"}></Selector>
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
                    <button type='submit'>Guardar Cambios</button>
                </form>
            </div>
            <Line></Line>
            <div className="lista">
            <TituloDes 
                    titulo='LISTADO DE PROFESORES:' 
                    desc='Seleccione un profesor para mas informacion'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={profesUnicos}
                            valorSeleccionado={profeSeleccionado}
                            setValorSeleccionado={setProfeSeleccionado}
                            titulo='Profesores'
                        />
                        <button onClick={limpiarFiltros}>Limpiar</button>
                    </div>

                    <div className="materias">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                
                                <PildoraMateriaGrado 
                                    texto={item.nombre} 
                                    color={item.color} 
                                    key={index} 
                                    onClick={() => manejarClick(item.nombre)}
                                />
                                    
                                    
                            ))
                        ) : (
                            <p className="mensaje-no-cursos">No hay profesores que cumplan con estos parametros</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreacionDocente

import React, {useState, useEffect} from 'react'
import './AsignarGradosMaterias.scss'
import { useUser } from '../../../Contexts/UserContext.jsx';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';
import Alerta from '../../../componentes/Alerta/Alerta.jsx';


const AsignarGradosMaterias = () => {

    const API_URL = process.env.REACT_APP_API_URL; 
    const token = localStorage.getItem("token");
    const {user} = useUser();
    const [reload, setReload] = useState(false);

     //Datos inciales a mostrar
    const [formData, setFormData] = useState({
        grados: [],
        materias: [],
    });
    

    //GRADOS
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
                            Alerta.error(error.message);
                            console.error(error);
                        }
                    }
            
                    listaGrados()
                },[reload,API_URL, token, user.institucion.id_institucion])
    

            const [gradosSeleccionados, setGradosSeleccionados] = useState([]);
        
        
            // Actualización de materia seleccionada
            const handleChangeGrado = (selectedOptions) => {
                setGradosSeleccionados(selectedOptions);
                setFormData({
                    ...formData,
                    grados: selectedOptions.map((curso) => curso.value),
                });
            };
    
    //materias

    const [opcionesMaterias, setOpcionesMaterias] = useState([]);
        
        useEffect(() => {
            const listaMaterias = async () => {
                try {
                    const response = await fetch(`${API_URL}materias/institucion/${user.institucion.id_institucion}/docentes`,{
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
                        data.sort((a, b) => (a.nombre?.localeCompare(b.nombre || '') || 0));
                    }
                    
                    console.log("Respuesta del servidor materias:", data);
                    const opciones = data.map(materia => ({
                        value: [materia.id_materia, materia.docente_documento],
                        label: materia.nombre + ' - '  +materia.docente_nombre + ' '  +materia.docente_apellido
                    }));
                    
                    setOpcionesMaterias(opciones);
                } catch (error) {
                    console.error(error);
                }
            }
    
            listaMaterias()
        },[API_URL, token, user.institucion.id_institucion])


    const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
    
        
        const handleChangeMaterias = (selectedOptions) => {
            setMateriasSeleccionadas(selectedOptions);
            setFormData({
                ...formData,
                materias: selectedOptions.map((materia) => materia.value),
            });
        };    
            
            // const infoPildoras = [
            //     { materia: "Matemáticas", grado: "6-2", profe: 'Juan Esteban',color: 'morado' },
            //     { materia: "Ingles", grado: "6-2", profe: 'Juan Manuel',color: 'morado' },
            // ];


            const [infoPildoras, setInfoPildoras] = useState([]);
            
                useEffect(() => {
                    const listaCursos = async () => {
                        try {
                            const response = await fetch(`${API_URL}asignar/institucion/${user.institucion.id_institucion}`,{
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

                            const dataCompleta = data.map(item => ({
                                ...item,
                                nombre_completo: `${item.profesor_nombre} ${item.profesor_apellido}`
                            }));
                            
                            console.log("Respuesta del servidor listaCursos:", dataCompleta);
                            setInfoPildoras(dataCompleta);
                        } catch (error) {
                            console.error(error);
                        }
                    }
            
                    listaCursos()
                },[reload,API_URL, token, user.institucion.id_institucion])
                    

            const [infoPildorasMaterias, setInfoPildorasMaterias] = useState([]);
            
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
                            
                            console.log("Respuesta del servidor materias2:", data);
                            setInfoPildorasMaterias(data);
                        } catch (error) {
                            console.error(error);
                        }
                    }
            
                    listaMaterias()
                },[reload,API_URL, token, user.institucion.id_institucion])
            
            
            const [infoPildorasGrados, setInfoPildorasGrados] = useState([]);
            
                
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
                            setInfoPildorasGrados(data); // Guarda los datos en el estado
            
                        } catch (error) {
                            console.error(error);
                        }
                    }
            
                    listaGrados()
                },[reload,API_URL, token, user.institucion.id_institucion])

            
                const [infoPildorasProfe, setInfoPildorasProfe] = useState([])
                
                    useEffect(() => {
                            const listaProfes = async () => {
                                try {
                                    const response = await fetch(`${API_URL}usuario/docentes/institucion/${user.institucion.id_institucion}`,{
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
                                            nombreCompleto: `${est.nombre} ${est.apellido}`
                                        })).sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
                                        console.log("Respuesta completa:", dataPildora);
                                        setInfoPildorasProfe(dataPildora);
                                    }else{
                                        console.log("Respuesta del servidor:", data);
                                    }
                                    
                                    
                                    
                                } catch (error) {
                                    console.error(error);
                                }
                            }
                    
                            listaProfes()
                    },[reload,API_URL, token, user.institucion.id_institucion])
            
           //Elimina opciones duplicadas para el selector
            const materiasUnicas = [...new Set(infoPildorasMaterias.map(item => item.nombre))];
            const gradosUnicos = [...new Set(infoPildorasGrados.map(item => item.nombre))];
            const profesUnicos = [...new Set(infoPildorasProfe.map(item => item.nombreCompleto))];

            const [materiaFiltro, setMateriaFiltro] = useState('');
            const [gradoFiltro, setGradoFiltro] = useState('');
            const [profeFiltro, setProfeFiltro] = useState('');
            
            const limpiarFiltros = () => {
                setMateriaFiltro('');
                setGradoFiltro('');
                setProfeFiltro('');
            };
    
            const pildorasFiltradas = infoPildoras.filter(item =>
                (materiaFiltro === '' || item.materia === materiaFiltro) &&
                (gradoFiltro === '' || item.curso === gradoFiltro)&&
                (profeFiltro === '' || item.nombre_completo === profeFiltro)
            );


        const [isModalOpen, setIsModalOpen] = useState(null);
            
            const openModal = (index) => setIsModalOpen(index);
            const closeModal = () => setIsModalOpen(null);
        
            const handleEliminar = async(index,asigancion,grado,materia,profe) => {
                console.log(asigancion,grado,materia,profe)


                try {
                    const response = await fetch(`${API_URL}asignar/eliminarAsignacion/${asigancion}`, {
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
                    
                    Alerta.success('Asignacion eliminada exitosamente');
                    console.log('ASIGNACION ELIMINADO EXITOSAMENTE');

                    closeModal()
                    setReload(!reload);
                    

            
                } catch (error) {
                    console.error(error);
                    Alerta.error(error.message);
                }

            }

//Envio del formulario
const handleSubmit = async (e) => {
    e.preventDefault();

    if (materiasSeleccionadas.length === 0 || gradosSeleccionados.length === 0) {
        Alerta.info('Debes seleccionar al menos una materia y grado');
        return;
    }
    console.log('Datos enviados:', formData);

    const combinaciones = formData.grados.flatMap(id_curso =>
        formData.materias.map(([id_materia, id_docente]) => ({ id_curso, id_materia, id_docente }))
    );

    console.log('aaaaa', combinaciones);

    try {
        const respuestas = await Promise.allSettled(
            combinaciones.map(async ({ id_curso, id_materia, id_docente }) => {
                const response = await fetch(`${API_URL}asignar/asignarMateria`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ id_curso, id_materia, id_docente })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                return response.json();
            })
        );

        console.log('Respuestas del backend:', respuestas);

        const errores = respuestas
        .filter(result => result.status === "rejected")
        .map((result, index) => ({ 
            errorMsg: result.reason.message, 
            id_curso: combinaciones[index].id_curso, 
            id_materia: combinaciones[index].id_materia 
        }));
        

        const exitosos = respuestas
    .map((result, index) => ({ result, combinacion: combinaciones[index] }))
    .filter(({ result }) => result.status === "fulfilled");

const exitos = exitosos.length;

if (exitos > 0) {
    const exitosPorMateria = exitosos.reduce((acc, { combinacion }) => {
        const { id_curso, id_materia } = combinacion;
        const nombreMateria = materiasSeleccionadas.find(m => Number(m.value[0]) === Number(id_materia))?.label || `Materia ${id_materia}`;
        const nombreCurso = gradosSeleccionados.find(g => Number(g.value) === Number(id_curso))?.label || `Curso ${id_curso}`;

        if (!acc[nombreMateria]) {
            acc[nombreMateria] = [];
        }
        acc[nombreMateria].push(nombreCurso);
        return acc;
    }, {});

    const mensajeExito = Object.entries(exitosPorMateria)
        .map(([materia, cursos]) => `${materia}: ${cursos.join(", ")}`)
        .join("\n");

    Alerta.success(`Asignaciones exitosas:\n${mensajeExito}`, true);
}

        if (errores.length > 0) {
            const erroresPorMateria = errores.reduce((acc, { id_curso, id_materia }) => {
                const nombreMateria = materiasSeleccionadas.find(m => Number(m.value[0]) === Number(id_materia))?.label || `Materia ${id_materia}`;
                const nombreCurso = gradosSeleccionados.find(g => Number(g.value) === Number(id_curso))?.label || `Curso ${id_curso}`;

                if (!acc[nombreMateria]) {
                    acc[nombreMateria] = [];
                }
                acc[nombreMateria].push(nombreCurso);
                return acc;
            }, {});

            const mensajeError = Object.entries(erroresPorMateria)
                .map(([materia, cursos]) => `${materia}: ${cursos.join(", ")}`)
                .join("\n");

            Alerta.error(`Error en algunas asignaciones:\n${mensajeError}`);
        }

        // Limpiar el formulario solo si hubo éxitos
        if (exitos > 0) {
            setReload(!reload);
            setFormData({
                grados: [],
                materias: []
            });
            setMateriasSeleccionadas([]);
            setGradosSeleccionados([]);
        }

    } catch (error) {
        console.error('Error en las peticiones:', error);
        Alerta.error('Ocurrió un error inesperado al realizar las asignaciones.');
    }
};


    return (
        <div className='contenedorAsignarGradosMaterias'>
            <div className="crear">
                <TituloDes titulo='ASIGNACION DE MATERIAS A GRADOS' desc='Asigna las materias correspondientes a cada grado.'></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="selectorGrado">
                        <Selector titulo={'Grado'} placeholder={"Selecciona el grado"} opciones={opcionesGrados} valores={gradosSeleccionados} onChange={handleChangeGrado}></Selector>
                        <Selector titulo={'Materias'} placeholder={"Selecciona la materia"} opciones={opcionesMaterias} valores={materiasSeleccionadas} onChange={handleChangeMaterias}></Selector>
                    </div>
                    {/* <div className="selecciones">
                            <div className="seleccion">
                            <h4>Grados seleccionadas:</h4>
                            {gradosSeleccionados.length === 0? (
                                <p>No has seleccionado ningun grado todavía.</p>
                            ): (
                                <ul>
                                {gradosSeleccionados.map((grado) => (
                                    <li key={grado.value}>{grado.label}</li>
                                ))}
                                </ul>
                            ) }
                            </div>

                            <div className="seleccion">
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
                            
                    </div> */}
                    <button type='submit'>Guardar Cambios</button>
                </form>
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
                            valorSeleccionado={materiaFiltro}
                            setValorSeleccionado={setMateriaFiltro}
                            titulo='Materia'
                        />
                        <CustomSelect
                            opciones={gradosUnicos}
                            valorSeleccionado={gradoFiltro}
                            setValorSeleccionado={setGradoFiltro}
                            titulo='Grado'
                        />
                        <CustomSelect
                            opciones={profesUnicos}
                            valorSeleccionado={profeFiltro}
                            setValorSeleccionado={setProfeFiltro}
                            titulo='Profe'
                        />
                        <button onClick={limpiarFiltros}>Limpiar</button>
                    </div>

                    <div className="contenedorAsignacion">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                
                                <React.Fragment key={index}>
                                    <Pildora
                                    key={index} 
                                    titulo={item.materia}
                                    txtsuperior={item.nombre_completo}
                                    txtinferior={item.curso}
                                    color={item.color}
                                    onClick={() => openModal(index)}
                                />
                                
                                    {isModalOpen === index && (
                                        <Modal
                                        isOpen={true}
                                        closeModal={closeModal}
                                        tipo='eliminar'
                                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
                                        modalTitulo = {`ELIMINAR CURSO ${item.materia} ${item.curso} de ${item.nombre_completo}`}
                                        >
                                        <button onClick={() => handleEliminar(index,item.id_asignacion, item.curso, item.materia, item.nombre_completo)} className='rojo'>ELIMINAR</button>
                                        </Modal>
                                        )}
                                </React.Fragment>
                                    
                            ))
                        ) : (
                            <p>No hay cursos que cumplan con estos parametros</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AsignarGradosMaterias

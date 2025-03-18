import React, {useState, useEffect} from 'react'
import './AsignarGradosMaterias.scss'
import { useUser } from '../../../Contexts/UserContext.jsx';
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';


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
            
            const infoPildoras = [
                { materia: "Matemáticas", grado: "6-2", profe: 'Juan Esteban',color: 'morado' },
                { materia: "Ingles", grado: "6-2", profe: 'Juan Manuel',color: 'morado' },
            ];
                    
                
           //Elimina opciones duplicadas para el selector
            const materiasUnicas = [...new Set(infoPildoras.map(item => item.materia))];
            const gradosUnicos = [...new Set(infoPildoras.map(item => item.grado))];
            const profesUnicos = [...new Set(infoPildoras.map(item => item.profe))];

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
                (gradoFiltro === '' || item.grado === gradoFiltro)&&
                (profeFiltro === '' || item.profe === profeFiltro)
            );


        const [isModalOpen, setIsModalOpen] = useState(null);
            
            const openModal = (index) => setIsModalOpen(index);
            const closeModal = () => setIsModalOpen(null);
        
            const handleEliminar = (index,grado,materia,profe) => {
                console.log(grado,materia,profe)
                closeModal()
            }

                //Envio del formulario
    const handleSubmit = async(e) => {
        e.preventDefault()

        if(materiasSeleccionadas.length === 0 || gradosSeleccionados.length === 0){
            alert('Debes seleccionar alemnos una materia y grado')
            return;
        }
        console.log('Datos enviados:', formData);

        const combinaciones = formData.grados.flatMap(id_curso=> 
            formData.materias.map(([id_materia, id_docente]) => ({ id_curso, id_materia, id_docente }))
        );

        console.log('aaaaa',combinaciones)

        try {
            
            const respuestas = await Promise.all(
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
                        throw new Error(`Error en id_curso ${id_curso}, materia ${id_materia}: ${response.statusText}`);
                    }
    
                    return response.json();
                })
            );
    
            console.log('Respuestas del backend:', respuestas);
        
    
            // Limpiar el formulario
            setFormData({
                grados: [],
                materias: []
            });
            setMateriasSeleccionadas([]);
            setGradosSeleccionados([]);
    
        } catch (error) {
            console.error('Error en las peticiones:', error);

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
                                    txtsuperior={item.profe}
                                    txtinferior={item.grado}
                                    color={item.color}
                                    onClick={() => openModal(index)}
                                />
                                
                                    {isModalOpen === index && (
                                        <Modal
                                        isOpen={true}
                                        closeModal={closeModal}
                                        tipo='eliminar'
                                        modalTexto='¿Estás seguro de continuar con la acción? Eliminar este curso será permanente y no se podrá cancelar.'
                                        modalTitulo = {`ELIMINAR CURSO ${item.materia} ${item.grado} de ${item.profe}`}
                                        >
                                        <button onClick={() => handleEliminar(index, item.grado, item.materia, item.profe)} className='rojo'>ELIMINAR</button>
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

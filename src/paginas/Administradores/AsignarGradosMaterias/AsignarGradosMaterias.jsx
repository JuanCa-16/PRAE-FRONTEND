import React, {useState} from 'react'
import './AsignarGradosMaterias.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import Modal from '../../../componentes/Modal/Modal.jsx';
import Pildora from '../../../componentes/Pildora/Pildora.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';

const AsignarGradosMaterias = () => {
     //Datos inciales a mostrar
    const [formData, setFormData] = useState({
        grados: [],
        materias: [],
    });
    

    
        //Envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault()

        if(materiasSeleccionadas.length === 0 || gradosSeleccionados.length === 0){
            alert('Debes seleccionar alemnos una materia y grado')
            return;
        }
        console.log('Datos enviados:', formData);
        setFormData({
            grados: [],
            materias: [],
        })
        setMateriasSeleccionadas([])
        setGradosSeleccionados([])
    };

    //GRADOS
        const [gradosSeleccionados, setGradosSeleccionados] = useState([]);
    
    
        // Actualización de materia seleccionada
        const handleChangeGrado = (selectedOptions) => {
            setGradosSeleccionados(selectedOptions);
            setFormData({
                ...formData,
                grados: selectedOptions.map((grado) => grado.value),
            });
        };
    
        const opcionesGrados = [
            { value: "6-2", label: "6-2" },
            { value: "7-2", label: "7-2" },
        ];


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

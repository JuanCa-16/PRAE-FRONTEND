import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './CreacionEst.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraEst from '../../../componentes/PildoraEst/PildoraEst.jsx';
import Line from '../../../componentes/Line/Line.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';
const CreacionEst = () => {

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
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!gradoAsignado) {
            alert('Debes seleccionar un grado');
            return;
        }
    
        console.log('Datos enviados:', formData);
    
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

    const opcionesGrados = [
        { value: "6-2", label: "6-2" },
        { value: "7-2", label: "7-2" },
    ];

    const infoPildoras = [
            { nombreEstudiante: "Juan Pérez Henao Gallego", grado: "6-2", color: 'morado' },
            { nombreEstudiante: "María Gómez", grado: "6-2", color: 'azul' },
            { nombreEstudiante: "Carlos Rodríguez", grado: "11-2", color: 'amarillo' },
            { nombreEstudiante: "Ana Martínez", grado: "10-1", color: 'morado' },
            { nombreEstudiante: "Luis Fernández", grado: "11-2", color: 'morado' },
            { nombreEstudiante: "Sofía Ramírez", grado: "9-2", color: 'morado' },
        ];
        
    
        //Elimina opciones duplicadas para el selector
        const nombreEstudiante = [...new Set(infoPildoras.map(item => item.nombreEstudiante))];
        const gradosUnicos = [...new Set(infoPildoras.map(item => item.grado))];
    
        const [nombreEstudianteSeleccionada, setnombreEstudianteSeleccionada] = useState('');
        const [gradoSeleccionado, setGradoSeleccionado] = useState('');
    
        // Función para limpiar los filtros
        const limpiarFiltros = () => {
            setnombreEstudianteSeleccionada('');
            setGradoSeleccionado('');
        };
    
        const pildorasFiltradas = infoPildoras.filter(item =>
            (nombreEstudianteSeleccionada === '' || item.nombreEstudiante === nombreEstudianteSeleccionada) &&
            (gradoSeleccionado === '' || item.grado === gradoSeleccionado)
        );
    
        const navigate = useNavigate();
        
        //pasa los datos de la materia a la pagina de notas de la materias
        const manejarClick = ( est) => {
            const datos = {est}; // Datos a enviar
            navigate(`/estudiantes/${est}`, { state: datos }); // Navegar con los datos
        };
    
    

    return (
        <div className='contenedorCreacionEst'>
            <div className="crear">
                <TituloDes titulo='CREAR ESTUDIANTE' desc='Registra un nuevo profesor en la plataforma y asígnale los cursos que gestionará.'></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Apellidos' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', value)}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Nombres' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre', value)}  />
                        <InputContainer nomInput="coreo" required={true}  titulo='Correo' value={formData.correo} onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={true}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={true}  titulo='Documento' inputType='text' placeholder='Documento' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                    </div>
                    <div className="selectorGrado">
                        <Selector titulo={'Asignacion de Grado'} multi={false} opciones={opcionesGrados} valores={gradoAsignado ? opcionesGrados.find((opcion) => opcion.value === gradoAsignado) : null} onChange={handleChangeGrado} placeholder={"Selecciona el grado"}></Selector>
                    </div>
                    <button type='submit'>Guardar Cambios</button>
                </form>
            </div>
            <Line></Line>
            <div className='contenedorObservaciones'>
                <TituloDes 
                    titulo='LISTADO DE ESTUDIANTES :' 
                    desc='Listado de estudiantes registrados en la institucion en sus diferentes grados'
                />
                <div className="informacion">
                    <div className="filtros">
                        <CustomSelect
                            opciones={nombreEstudiante}
                            valorSeleccionado={nombreEstudianteSeleccionada}
                            setValorSeleccionado={setnombreEstudianteSeleccionada}
                            titulo='Estudiantes'
                        />
                        <CustomSelect
                            opciones={gradosUnicos}
                            valorSeleccionado={gradoSeleccionado}
                            setValorSeleccionado={setGradoSeleccionado}
                            titulo='Grado'
                        />
                        <button onClick={limpiarFiltros}>Limpiar</button>
                    </div>

                    <div className="estudiantes">
                        {pildorasFiltradas.length > 0 ? (
                            pildorasFiltradas.map((item, index) => (
                                <PildoraEst
                                    key={index}
                                    est={item.nombreEstudiante}
                                    curso={item.grado}
                                    color={item.color}
                                    clase='peque'
                                    onClick={() => manejarClick(item.nombreEstudiante)}
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

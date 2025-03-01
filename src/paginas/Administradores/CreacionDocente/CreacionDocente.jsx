import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './CreacionDocente.scss'
import TituloDes from '../../../componentes/TituloDes/TituloDes.jsx'
import InputContainer from '../../../componentes/Input/InputContainer.jsx'
import CustomSelect from '../../../componentes/CustomSelect/CustomSelect.jsx';
import PildoraMateriaGrado from '../../../componentes/PildoraMateriaGrado/PildoraMateriaGrado';
import Line from '../../../componentes/Line/Line.jsx';
import Selector from '../../../componentes/Selector/Selector.jsx';

const CreacionDocente = () => {

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
            area: '',
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
            {profe: "Juan Camilo Henao", color: 'morado' },
            {profe: "Samuel Henao", color: 'azul' },

    ];
            
        
            //Elimina opciones duplicadas para el selector
    const profesUnicos = [...new Set(infoPildoras.map(item => item.profe))];
    const [profeSeleccionado, setProfeSeleccionado] = useState('');
        
            // Función para limpiar los filtros
    const limpiarFiltros = () => {
            setProfeSeleccionado('');
        };
        
        const pildorasFiltradas = infoPildoras.filter(item =>
            (profeSeleccionado === '' || item.profe === profeSeleccionado)
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
                        <InputContainer nomInput="apellidos" required={true} titulo='Apellidos' placeholder='Castro Henao' value={formData.apellidos} inputType='text' onChange={(value) => handleChange('apellidos', value)}  />
                        <InputContainer nomInput="nombres" required={true}  titulo='Nombres' placeholder='Esteban' value={formData.nombre} inputType='text' onChange={(value) => handleChange('nombre', value)}  />
                        <InputContainer nomInput="coreo" required={true}  titulo='Correo' value={formData.correo} placeholder='esteban@gmail.com' onChange={(value) => handleChange('correo', value)} />
                        <InputContainer nomInput="contra" required={true}  titulo='Contraseña'placeholder='*****' value={formData.contrasena} inputType="password" onChange={(value) => handleChange('contrasena', value)} />
                        <InputContainer nomInput="doc" required={true}  titulo='Documento' inputType='text' placeholder='1116458796' value={formData.doc} onChange={(value) => handleChange('doc', value)} />
                        <InputContainer nomInput="areaEnsenanza" required={true}  titulo='Area Enseñanza' inputType='text' placeholder='Humanidades' value={formData.area} onChange={(value) => handleChange('area', value)} />
                    </div>
                    <div className="selectorMat">
                        <Selector titulo={'Asignacion de Materias'} opciones={opcionesMaterias} valores={materiasSeleccionadas} onChange={handleChangeMaterias} placeholder={"Selecciona las materias"}></Selector>
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
                                    texto={item.profe} 
                                    color={item.color} 
                                    key={index} 
                                    onClick={() => manejarClick(item.profe)}
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

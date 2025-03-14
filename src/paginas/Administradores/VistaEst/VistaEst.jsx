import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./VistaEst.scss";
import { useUser } from "../../../Contexts/UserContext.jsx";
import TituloDes from "../../../componentes/TituloDes/TituloDes.jsx";
import InputContainer from "../../../componentes/Input/InputContainer.jsx";
import Selector from "../../../componentes/Selector/Selector.jsx";
import Modal from "../../../componentes/Modal/Modal.jsx";
import Line from "../../../componentes/Line/Line.jsx";
import ContenedorMaterias from "../../../componentes/ContenedorMaterias/ContenedorMaterias.jsx";
import { useNavigate } from "react-router-dom";
const VistaEst = () => {
    const location = useLocation();
    const { est } = location.state || {};
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    const { user } = useUser();
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

    // Estado inicial que se usará para comparar
    const initialFormData = useRef({
        apellidos: "",
        nombre: "",
        correo: "",
        doc: "",
        contrasena: "",
        grado: "",
    });

    useEffect(() => {
        const listaEst = async () => {
            try {
                const response = await fetch(
                    `${API_URL}usuario/estudiante/${est.documento_identidad}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`${errorData.error || response.status}`);
                }

                const estData = await response.json();

                console.log("Respuesta del servidor est:", estData);

                initialFormData.current = {
                    apellidos: estData.apellido,
                    nombre: estData.nombre,
                    correo: estData.correo,
                    doc: estData.documento_identidad,
                    contrasena: "",
                    grado: estData.id_curso,
                };

                setFormData({
                    apellidos: estData.apellido,
                    nombre: estData.nombre,
                    correo: estData.correo,
                    doc: estData.documento_identidad,
                    contrasena: "",
                    grado: estData.id_curso,
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (est?.documento_identidad) {
            listaEst();
        }

    }, [reload, est.documento_identidad, API_URL, token]);

    const [formData, setFormData] = useState(initialFormData.current);



    //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

    //Envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!gradoAsignado) {
            alert("Debes seleccionar un grado");
            return;
        }
        const dataToSend = {
            ...formData,
            contrasena: formData.contrasena || null
        };

        console.log('envio', dataToSend)
        console.log('original', initialFormData.current)

        try {
            const response = await fetch(`${API_URL}usuario/updateEstudiante/${dataToSend.doc}`, {
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
                    id_curso: dataToSend.grado, id_institucion: user.institucion.id_institucion
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                //toast
                throw new Error(`${errorData.error || response.status}`);
            }

            const data = await response.json();


            console.log('ESTUDIANTE EDITADO EXITOSAMENTE', data);

            //REVISAR ES SIMPLEMENTE LA URL

            // navigate(`/estudiantes/${`${dataToSend.apellidos.split(" ")[0]} ${dataToSend.nombre.split(" ")[0]}`}`, {
            //     replace: true,
            //     state: {
            //         est: {
            //             ...est,
            //             nombre: dataToSend.nombre,
            //             apellido: dataToSend.apellidos,
            //             correo: dataToSend.correo,
            //             documento_identidad: dataToSend.doc,
            //             id_curso: dataToSend.grado,
            //             nombreCompleto: `${dataToSend.apellidos.split(" ")[0]} ${dataToSend.nombre.split(" ")[0]}`
            //         }
            //     }
            // });

            setReload(!reload);
        } catch (error) {
            //toast
            console.error(error);
        }

    };

    useEffect(() => {
        setGradoAsignado(formData.grado ? formData.grado : '');
    }, [formData.grado]);

    // Estado de selección de una sola materia
    const [gradoAsignado, setGradoAsignado] = useState(
        formData.grado ? formData.grado : ''
    );

    // Actualización de materia seleccionada
    const handleChangeGrado = (selectedOption) => {
        setGradoAsignado(selectedOption ? selectedOption.value : '');
        setFormData({
            ...formData,
            grado: selectedOption ? selectedOption.value : '',
        });
    };

    const [opcionesGrados, setOpcionesGrados] = useState([]);

    useEffect(() => {
        const listaGrados = async () => {
            try {
                const response = await fetch(
                    `${API_URL}cursos/institucion/${user.institucion.id_institucion}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json(); // Obtiene respuesta del servidor
                    throw new Error(`${errorData.message || response.status}`);
                }

                const data = await response.json(); // Espera la conversión a JSON
                data.sort((a, b) => {
                    const [numA, subA] = a.nombre.split("-");
                    const [numB, subB] = b.nombre.split("-");

                    return (
                        parseInt(numA) - parseInt(numB) ||
                        subA.localeCompare(subB, "es", { numeric: true })
                    );
                });
                console.log("Respuesta del servidor grados:", data);
                const opciones = data.map((materia) => ({
                    value: materia.id_curso,
                    label: materia.nombre,
                }));
                setOpcionesGrados(opciones);
            } catch (error) {
                console.error(error);
            }
        };

        listaGrados();
    }, [reload, API_URL, token, user.institucion.id_institucion]);


    //Informacion de las pildoras
    const infoPildoras = [
        { materia: "Matemáticas", profesor: "Carlos Pérez", color: "morado" },
        { materia: "Física", profesor: "Ana Gómez", color: "azul" },
        { materia: "Química", profesor: "Luis Rodríguez", color: "amarillo" },
        { materia: "Historia", profesor: "Marta Sánchez", color: "morado" },
    ];

    // Comparar el estado actual con el inicial para deshabilitar el botón si no hay cambios
    const isFormUnchanged = (
        JSON.stringify({ ...formData, contrasena: '', doc: '' }) ===
        JSON.stringify({ ...initialFormData.current, contrasena: '', doc: '' })
        && !formData.contrasena // Permite activar si escriben algo en "contrasena"
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleEliminar = async() => {
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
    
            console.log('ESTUDIANTE ELIMINADO EXITOSAMENTE');
            closeModal()
            
            navigate(`/estudiantes`);
            
            
    
        } catch (error) {
            //toast
            console.error(error);
        }

    };
    return (
        <div className="contenedorVistaEst">
            <div className="editar">
                <TituloDes
                    titulo="EDITAR ESTUDIANTE"
                    desc="Registra un nuevo profesor en la plataforma y asígnale los cursos que gestionará."
                ></TituloDes>
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer
                            nomInput="apellidos"
                            required={true}
                            titulo="Apellidos"
                            placeholder="Apellidos"
                            value={formData.apellidos}
                            inputType="text"
                            onChange={(value) => handleChange("apellidos", capitalizeWords(value))}
                        />
                        <InputContainer
                            nomInput="nombres"
                            required={true}
                            titulo="Nombres"
                            placeholder="Nombres"
                            value={formData.nombre}
                            inputType="text"
                            onChange={(value) => handleChange("nombre", capitalizeWords(value))}
                        />
                        <InputContainer
                            nomInput="coreo"
                            required={false}
                            titulo="Correo"
                            value={formData.correo}
                            onChange={(value) => handleChange("correo", value)}
                        />
                        <InputContainer
                            nomInput="contra"
                            required={false}
                            titulo="Contraseña"
                            placeholder="*****"
                            value={formData.contrasena}
                            inputType="password"
                            onChange={(value) => handleChange("contrasena", value)}
                        />
                        <InputContainer
                            nomInput="doc"
                            required={false}
                            isDisabled={true}
                            titulo="Documento"
                            inputType="text"
                            placeholder="Documento"
                            value={formData.doc}
                            onChange={(value) => handleChange("doc", value)}
                        />
                    </div>
                    <div className="selectorGrado">
                        <Selector
                            multi={false}
                            opciones={opcionesGrados}
                            valores={gradoAsignado ? opcionesGrados.find((opcion) => opcion.value === gradoAsignado) : null}
                            onChange={handleChangeGrado}
                            placeholder={"Selecciona el grado"}
                        ></Selector>
                    </div>
                    <button type="submit" disabled={isFormUnchanged}>
                        Guardar Cambios
                    </button>
                </form>
                <button onClick={openModal} className="rojo">
                    Eliminar
                </button>
                <Modal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    tipo="eliminar"
                    modalTexto="¿Estás seguro de continuar con la acción? Eliminar este estudiante será permanente y no se podrá cancelar."
                    modalTitulo={`ELIMINAR ESTUDIANTE ${est.nombre.toUpperCase()} ${est.apellido.toUpperCase()}`}
                >
                    <button onClick={() => handleEliminar()} className="rojo">
                        ELIMINAR
                    </button>
                </Modal>
            </div>
            <Line></Line>
            <div className="contenedorCursos">
                <TituloDes
                    titulo="MIS MATERIAS:"
                    desc="Accede a todas tus materias de forma organizada, consulta tus calificaciones y sigue tu progreso académico de manera sencilla y rápida."
                ></TituloDes>

                <ContenedorMaterias
                    url="/estudiantes"
                    info={infoPildoras}
                    nombre={est.nombreCompleto}
                ></ContenedorMaterias>
            </div>
        </div>
    );
};

export default VistaEst;

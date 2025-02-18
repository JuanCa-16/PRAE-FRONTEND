import React, { useState } from "react";
import InputContainer from "../Input/InputContainer";
import PropTypes from 'prop-types';
import './Modal.scss';

/** 
 * Componente: Modal
 * Descripción: Este componente renderiza un modal dinámico que puede ser de tipo "eliminar", "actividad" o "nota".
 *              Dependiendo del tipo de modal, se muestran diferentes contenidos y funcionalidades.
 * 
 * Props:
 *      - isOpen (bool): Indica si el modal está abierto. Si es false, el modal no se renderiza.
 *      - closeModal (func): Función para cerrar el modal.
 *      - tipo (string): Define el tipo de modal. Acepta solo los valores: "eliminar", "actividad" o "nota".
 *      - modalTitulo (string): Título del modal. Por defecto, es "Eliminar".
 *      - modalTexto (string): Texto que se muestra dentro del modal. Por defecto, es "¿Estás seguro de eliminar...?".
 *      - children (node): Elementos adicionales que se pueden renderizar dentro del modal. Usado principalmente en el tipo "eliminar" para pasar un botón de confirmación o cancelación.
 *      - valorAct (string): Valor por defecto para el campo "Nombre Actividad" en el modal de tipo "actividad". (Por defecto es una cadena vacía).
 *      - ValorPeso (string): Valor por defecto para el campo "Peso" en el modal de tipo "actividad". (Por defecto es una cadena vacía).
 *      - valorNota (string): Valor por defecto para el campo "Nota" en el modal de tipo "nota". (Por defecto es una cadena vacía).
 * 
 * Estado:
 *      - nombreAct (string): Almacena el nombre de la actividad para el tipo de modal "actividad".
 *      - pesoAct (string): Almacena el peso de la actividad para el tipo de modal "actividad".
 *      - nota (string): Almacena la nota que se ingresa para el tipo de modal "nota".
 * 
 * Funcionalidad:
 *      - Renderiza el contenido del modal según el valor de la prop `tipo`:
 *          - "eliminar": Muestra un mensaje de confirmación para eliminar.
 *          - "actividad": Muestra un formulario para crear una nueva actividad con su nombre y peso.
 *          - "nota": Muestra un formulario para ingresar una nota.
 *      - Cierra el modal al hacer clic fuera del área del modal o al realizar una acción (como crear o ingresar datos).
 *      - Los valores de los campos de formulario (`nombreAct`, `pesoAct`, `nota`) se gestionan a través del estado y se envían como datos JSON al hacer submit.
 * 
 * Métodos:
 *      - handleNombreChange: Actualiza el estado `nombreAct` cuando cambia el valor del input "Nombre Actividad".
 *      - handlePesoChange: Actualiza el estado `pesoAct` cuando cambia el valor del input "Peso".
 *      - handleSubmit1: Maneja el envío de datos para crear una nueva actividad (tipo "actividad").
 *      - handleNotaChange: Actualiza el estado `nota` cuando cambia el valor del input "Nota".
 *      - handleSubmit2: Maneja el envío de datos para ingresar una nueva nota (tipo "nota").
 * 
 * Lógica del modal:
 *      - Si `isOpen` es false, el modal no se renderiza.
 *      - Si el usuario hace clic fuera del área del modal, el modal se cierra.
 *      - Dependiendo del tipo de modal, se renderiza el contenido adecuado (eliminar, actividad o nota).
 */

const Modal = ({ isOpen, closeModal, tipo, modalTitulo="Eliminar", modalTexto="Estas seguro de eliminar...", valorAct='',ValorPeso='', valorNota = '', children }) => {
    
    //La logica del modal eliminar se le hace es al boton que llega por children.
    
    //Envio datos modal actividad.
    const [nombreAct, setNonombreAct] = useState(valorAct); // Estado para manejar el valor de la actividad
    const [pesoAct, setPesoAct] = useState(ValorPeso); // Estado para manejar el valor del peso


    const handleNombreChange = (newNombre) => {
        setNonombreAct(newNombre); // Actualiza el estado 'email'
    };

    const handlePesoChange = (newPeso) => {
        setPesoAct(newPeso); // Actualiza el estado 'email'
    };

    const handleSubmit1 = () => {
        // Crear el objeto JSON con los valores de los inputs
        const formData = {
            nombreAct: nombreAct,
            pesoAct: pesoAct,
        };
    
        // Mostrar el objeto JSON en la consola (o enviarlo al servidor)
        console.log("Datos del formulario:", JSON.stringify(formData));
        closeModal()
    
        // Aquí puedes agregar lógica para enviar el JSON a un servidor o hacer algo más con él
    };

    //Envio datos modal notas
    const [nota, setNota] = useState(valorNota); // Estado para manejar el valor del email
    
      // Función para manejar el cambio en el campo del email
        const handleNotaChange = (newNota) => {
        setNota(newNota); // Actualiza el estado 'email' con el nuevo valor
        };

        const handleSubmit2 = () => {
            // Crear el objeto JSON con los valores de los inputs
            const formData = {
                nota: nota,
            };
        
            // Mostrar el objeto JSON en la consola (o enviarlo al servidor)
            console.log("Datos del formulario:", JSON.stringify(formData));
            closeModal()
            // Aquí puedes agregar lógica para enviar el JSON a un servidor o hacer algo más con él
        };


    //MANEJO LOGICA MODAL 
    if (!isOpen) return null; // No renderiza el modal si isOpen es false

    const handleClickOutside = (e) => {
        // Cerrar modal si se hace clic fuera del área del modal
        if (e.target.classList.contains('modal-overlay')) {
        closeModal();
        }
    };

    return (
        <div className={`modal-overlay ${tipo}`} onClick={handleClickOutside}>
        <div className="modal-content">
            {tipo === "eliminar"? (
                <div className="modalContenedor">
                <div className="titulo">
                    <p className='bold'>{modalTitulo} </p>
                </div>
                <p className='lato'>{modalTexto} </p>
                {children}
            </div>
            ): tipo === "actividad"? (
                <div className="modalAct">
                    <div className="titulo">
                        <p className='bold'>{modalTitulo}</p>
                    </div>
                    <div className="crearAct">
                        <div className="campos">
                            <InputContainer titulo="Nombre Actividad"
                                            inputType="text"
                                            value={nombreAct} // El valor del input viene del estado del componente padre
                                            onChange={handleNombreChange} // Pasamos la función que actualizará el estado
                                            required={true} // Hacemos que el campo sea obligatorio
                            />
                            <InputContainer titulo="Peso"
                                            placeholder="Nuevo Peso"
                                            inputType="text"
                                            value={pesoAct} // El valor del input viene del estado del componente padre
                                            onChange={handlePesoChange} // Pasamos la función que actualizará el estado
                                            required={true} // Hacemos que el campo sea obligatorio
                            />
                            <button onClick={handleSubmit1}>Crear</button>
                        </div>
                    </div>
                </div>
            ):(
                <div className="modalAct">
                    <div className="titulo">
                        <p className='bold'>{modalTitulo}</p>
                    </div>
                    <div className="crearAct">
                        <div className="campos">
                            <InputContainer titulo="Nota"
                                            placeholder="Nota"
                                            inputType="text"
                                            value={nota} // El valor del input viene del estado del componente padre
                                            onChange={handleNotaChange} // Pasamos la función que actualizará el estado
                                            required={true} // Hacemos que el campo sea obligatorio
                            />
                            <button onClick={handleSubmit2}>Ingresar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    tipo: PropTypes.oneOf(["eliminar", "actividad", "nota"]), // Solo permite estos valores
    modalTitulo: PropTypes.string,
    modalTexto: PropTypes.string,
    children: PropTypes.node,
};

export default Modal;

import React, { useState } from "react";
import InputContainer from "../Input/InputContainer";
import PropTypes from 'prop-types';
import './Modal.scss';

/** 
 * Componente: Modal
 * Descripción: Renderiza un modal dinámico que puede ser de tipo "eliminar", "actividad" o "nota".
 * Props:
 *      - isOpen (bool): Indica si el modal está abierto.
 *      - closeModal (func): Función para cerrar el modal.
 *      - tipo (string): Define el tipo de modal. Solo acepta "eliminar", "actividad" o "nota".
 *      - modalTitulo (string): Título del modal (por defecto: "Eliminar").
 *      - modalTexto (string): Texto del modal (por defecto: "Estas seguro de eliminar...").
 *      - children (node): Elementos adicionales que se pueden renderizar dentro del modal.
 */

const Modal = ({ isOpen, closeModal, tipo, modalTitulo="Eliminar", modalTexto="Estas seguro de eliminar...", children }) => {
    
    //La logica del modal eliminar se le hace es al boton que llega por children.
    
    //Envio datos modal actividad.
    const [nombreAct, setNonombreAct] = useState(""); // Estado para manejar el valor de la actividad
    const [pesoAct, setPesoAct] = useState(""); // Estado para manejar el valor del peso


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
    const [nota, setNota] = useState(""); // Estado para manejar el valor del email
    
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
                            <InputContainer titulo="Nombre"
                                            placeholder="Nombre de la actividad"
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

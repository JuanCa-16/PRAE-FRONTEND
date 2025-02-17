import React, { useState, useEffect, useRef } from "react";
import "./CustomSelect.scss";


/** 
 * Componente: CustomSelect
 * Descripción: Componente de selección personalizada que permite elegir una opción de una lista desplegable.
 * Props:
 *      - opciones (array): Lista de opciones disponibles para seleccionar.
 *      - valorSeleccionado (string): Opción actualmente seleccionada.
 *      - setValorSeleccionado (function): Función para actualizar la opción seleccionada.
 *      - titulo (string, opcional): Texto que se muestra como título del selector (por defecto: "Titulo").
 * Funcionalidad:
 *      - Muestra la opción seleccionada o el título si no hay ninguna.
 *      - Permite abrir y cerrar el menú desplegable al hacer clic.
 *      - Cierra el menú al seleccionar una opción o al hacer clic fuera del componente.
 *      - Usa una referencia (`useRef`) para detectar clics fuera del componente y cerrar el menú automáticamente.
 */

const CustomSelect = ({ opciones, valorSeleccionado, setValorSeleccionado, titulo = 'Titulo'}) => {
    const [abierto, setAbierto] = useState(false);
    const selectRef = useRef(null); // Referencia para detectar clics fuera

    // Maneja la selección de una opción
    const seleccionarOpcion = (opcion) => {
        setValorSeleccionado(opcion);
        setAbierto(false); // Cierra el menú al seleccionar
    };

    // Cierra el menú si se hace clic fuera
    useEffect(() => {
        const manejarClickFuera = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setAbierto(false);
            }
        };

        document.addEventListener("click", manejarClickFuera);
        return () => {
            document.removeEventListener("click", manejarClickFuera);
        };
    }, []);
    

    return (
        <div className="custom-select" ref={selectRef}>
            <p>{titulo} </p>
            <div className="selected" onClick={() => setAbierto(!abierto)}>
                {valorSeleccionado || titulo } {/* Muestra "Titulo" si no se ha seleccionado nada */}
            </div>
            {abierto && (
                <div className="options">
                    <div className="option" onClick={() => seleccionarOpcion("")}>
                        {titulo}
                    </div>
                    {opciones.map((opcion, index) => (
                        <div
                            key={index}
                            className="option"
                            onClick={() => seleccionarOpcion(opcion)}
                        >
                            {opcion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;

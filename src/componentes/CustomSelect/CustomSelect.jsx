import React, { useState, useEffect, useRef } from "react";
import "./CustomSelect.scss";

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
                {valorSeleccionado || titulo } {/* Muestra "Todos" si no se ha seleccionado nada */}
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

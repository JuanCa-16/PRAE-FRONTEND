import React, { useState, useEffect, useRef } from "react";
import "./CustomSelect.scss";

const CustomSelect = ({ opciones, valorSeleccionado, setValorSeleccionado, titulo = "Titulo" }) => {
    const [abierto, setAbierto] = useState(false);
    const [filtro, setFiltro] = useState(valorSeleccionado || ""); // Estado del input
    const selectRef = useRef(null);

    // Sincroniza el input con el valor seleccionado
    useEffect(() => {
        setFiltro(valorSeleccionado);
    }, [valorSeleccionado]);

    const opcionesFiltradas = opciones.filter(opcion =>
        opcion?.toLowerCase().includes(filtro?.toLowerCase() || "")
    );

    const manejarSeleccion = (opcion) => {
        setValorSeleccionado(opcion);
        setFiltro(opcion);
        setAbierto(false);
    };

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
            <p>{titulo}</p>
            <input
                type="text"
                value={filtro}
                onChange={(e) => {
                    setFiltro(e.target.value);
                    setAbierto(true);
                }}
                onClick={() => setAbierto(true)}
                placeholder={titulo}
                className="selected"
            />
            {abierto && (
                <div className="options">
                    <div  className="option" onClick={() => manejarSeleccion("")}>
                        {titulo}
                    </div>
                    {opcionesFiltradas.length > 0 ? (
                        opcionesFiltradas.map((opcion, index) => (
                            <div key={index} className="option" onClick={() => manejarSeleccion(opcion)}>
                                {opcion}
                            </div>
                        ))
                    ) : (
                        <div className="option disabled">No hay resultados</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;

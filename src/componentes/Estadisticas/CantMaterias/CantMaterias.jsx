import React, { useState } from "react";

import WebSocketListener from "../WebSocketListener/WebSocketListener";

const CantMaterias = () => {
  const [cantidadMaterias, setCantidadMaterias] = useState(null);
  const idInstitucion = `institucion_2`; // ID de la institución

  const handleData = (data) => {
    if (data.id_institucion === idInstitucion) {
      setCantidadMaterias(data.cantidadMaterias);
    }
  };

  return (
    <WebSocketListener

      // nombreSala={`institucion_${idInstitucion}`}
      nombreSala={idInstitucion}
      eventoEscuchar="cantidadMateriasInstitucion"
      onData={handleData}
    >
      <div>
        <h1>Cantidad de Materias en la Institución</h1>
        <p>ID de la Institución: {idInstitucion}</p>
        {cantidadMaterias !== null ? (
          <p>Cantidad de Materias: {cantidadMaterias}</p>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </WebSocketListener>
  );
};
export default CantMaterias;
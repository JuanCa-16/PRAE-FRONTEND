import React, { useState,useEffect } from "react";

import WebSocketListener from "../WebSocketListener/WebSocketListener";

const CantMaterias = ({funcionRecarga}) => {
  const [cantidadMaterias, setCantidadMaterias] = useState(null);
  const idInstitucion = `institucion_2`; // ID de la institución


  const handleData = (data) => {
    if (data.identificador === '2') {
      setCantidadMaterias(data.estadisticas.materias_activas);
  }

  };

  useEffect(() => {
    funcionRecarga()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantidadMaterias]);


  return (
    <WebSocketListener

      // nombreSala={`institucion_${idInstitucion}`}
      nombreSala={idInstitucion}
      eventoEscuchar="emitStats"
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
import React, { useState,useEffect } from "react";
import WebSocketListener from "../WebSocketListener/WebSocketListener";
import { useUser } from "../../../Contexts/UserContext";

const CantMaterias = ({funcionRecarga}) => {
  const [cantidadMaterias, setCantidadMaterias] = useState(null);
  const {user} = useUser();
  const idInstitucion = user.institucion.id_institucion;


  const handleData = (data) => {
    if (data.identificador === `${idInstitucion}`) {
      setCantidadMaterias(data.estadisticas.materias_activas);
  }

  };

  useEffect(() => {
    funcionRecarga()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantidadMaterias]);


  return (
    <WebSocketListener

      nombreSala={`institucion_${idInstitucion}`}
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
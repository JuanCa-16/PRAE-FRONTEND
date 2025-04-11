import React, { useState,useEffect } from "react";
import WebSocketListener from "../WebSocketListener/WebSocketListener";
import AnimatedCounter from "../Animacion/AnimatedNumber";
import PildoraEst from "../../PildoraEst/PildoraEst";
import { useUser } from "../../../Contexts/UserContext";

const CantMaterias = ({funcionRecargaCantMaterias}) => {
  const {user} = useUser();
  const idInstitucion = user.institucion.id_institucion;
  const [cantidadMaterias, setCantidadMaterias] = useState(null);
  const [cantidadGrados, setCantidadGrados] = useState(null);
  const duracion = 1.5; // Duración de la animación en segundos


  const handleData = (data) => {
    if (data.identificador === `${idInstitucion}`) {

      //METERIAS
      const nuevasMaterias = data.estadisticas.materias_activas;
      setCantidadMaterias(prev => {
        if (prev === nuevasMaterias) {
          return prev; // No hacer nada si no cambió
        }
        return nuevasMaterias; // Solo actualizar si realmente cambió
      });

      //DOCENTES
      const nuevosGrados= data.estadisticas.cursos_activos;
      setCantidadGrados(prev => {
        if (prev === nuevosGrados) {
          return prev; // No hacer nada si no cambió
        }
        return nuevosGrados; // Solo actualizar si realmente cambió
      });
    }
  };
  

  useEffect(() => {
    if (cantidadMaterias !== null) {
      funcionRecargaCantMaterias();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [cantidadMaterias]);


  return (
    <WebSocketListener

      nombreSala={`institucion_${idInstitucion}`}
      eventoEscuchar="emitStats"
      onData={handleData}
    >
      <div>
        <h3>ESTADISTICAS</h3>
        {cantidadMaterias !== null ? (
          <>
            <PildoraEst clase="peque" est="MATERIAS:" estadistica><AnimatedCounter from={0} to={cantidadMaterias} duration={duracion} /></PildoraEst>
          </>
          
        ) : (
          <p>Cargando...</p>
        )}
        {cantidadGrados !== null ? (
          <>
            <PildoraEst clase="peque" est="GRADOS:" estadistica><AnimatedCounter from={0} to={cantidadGrados} duration={duracion} /></PildoraEst>
          </>
          
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </WebSocketListener>
  );
};
export default CantMaterias;
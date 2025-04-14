import React, { useState,useEffect } from "react";
import WebSocketListener from "../../WebSocketListener/WebSocketListener";
import AnimatedCounter from "../../Animacion/AnimatedNumber";
import PildoraEst from "../../../PildoraEst/PildoraEst";
import GraficoBarras from "../GraficoBarras/GraficoBarras";
import "./AdminEstadisticas.scss";
import { useUser } from "../../../../Contexts/UserContext";
import { useTheme } from "../../../../Contexts/UserContext";
import Masonry from "react-masonry-css";


const AdminEstadisticas = ({funcionRecargaCantMaterias = () =>{}}) => {
  const {theme} = useTheme()
  const {user} = useUser();
  const idInstitucion = user.institucion.id_institucion;

  const [cantidadMaterias, setCantidadMaterias] = useState(null);
  const [cantidadGrados, setCantidadGrados] = useState(null);
  const [promedioNotasCurso, setPromedioNotasCurso] = useState(null);

  const duracion = 1.5; // Duración de la animación en segundos


  const handleData = (data) => {
    if (data.identificador === `${idInstitucion}`) {

      //METERIAS
      const nuevasMaterias = data.estadisticas.materias.materias_activas;
      setCantidadMaterias(prev => {
        if (prev === nuevasMaterias) {
          return prev; // No hacer nada si no cambió
        }
        return nuevasMaterias; // Solo actualizar si realmente cambió
      });

      //DOCENTES
      const nuevosGrados= data.estadisticas.cursos.cursos_activos;
      setCantidadGrados(prev => {
        if (prev === nuevosGrados) {
          return prev; // No hacer nada si no cambió
        }
        return nuevosGrados; // Solo actualizar si realmente cambió
      });

      const nuevosPromedioGrados = Object.entries(data.estadisticas.promedio_notas_por_grado).map(([grado, promedio]) => ({
        grado,
        promedio: parseFloat(promedio),
      }));

      setPromedioNotasCurso(prev => {
        const nuevo = JSON.stringify(nuevosPromedioGrados);
        const anterior = JSON.stringify(prev);
        if (nuevo === anterior) {
          return prev;
        }
        return nuevosPromedioGrados;
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

      <Masonry
        breakpointCols={{default: 4,550: 1, 700: 2, 900: 1, 1100: 2, 1400:3, 1600:3 }} // Configuración de las columnas según el ancho
        className={`contenedorData ${theme}`} // Clase para el contenedor
        columnClassName="contenedorDataColumn" // Clase para las columnas
      >

        
        {cantidadMaterias !== null ? (
          <div>
            <PildoraEst clase="peque pildoraEstadistica" est="MATERIAS:" estadistica><AnimatedCounter from={0} to={cantidadMaterias} duration={duracion} /></PildoraEst>
          </div>
          
        ) : (
          <p>Cargando...</p>
        )}

        {cantidadGrados !== null ? (
          <div>
            <PildoraEst clase="peque pildoraEstadistica" est="GRADOS:" estadistica><AnimatedCounter from={0} to={cantidadGrados} duration={duracion} /></PildoraEst>
          </div>
          
        ) : (
          <p>Cargando...</p>
        )}

        {promedioNotasCurso !== null ? (
          promedioNotasCurso.length > 0 ? (
            <div>
              <GraficoBarras data={promedioNotasCurso} />
            </div>
        
          ) : (
            <p>No hay datos para mostrar</p>
          )
        ) : (
          <p>Cargando...</p>
        )}


    </Masonry>
    </WebSocketListener>
  );
};
export default AdminEstadisticas;
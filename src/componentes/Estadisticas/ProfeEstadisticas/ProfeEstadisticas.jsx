import React, {useState} from "react";
import WebSocketListener from "../WebSocketListener/WebSocketListener";
import PildoraEst from "../../PildoraEst/PildoraEst";
import AnimatedCounter from "../Animacion/AnimatedNumber";
import { useUser } from "../../../Contexts/UserContext";
import { useTheme } from "../../../Contexts/UserContext";
import Masonry from "react-masonry-css";
import GraficoBarras from "../GraficoBarras/GraficoBarras";
import "./ProfeEstadisticas.scss";

const ProfeEstadisticas = () => {
    const {theme} = useTheme()
    const {user} = useUser();
    const idProfe = user.id;
    const duracion = 1.5; // Duración de la animación en segundos

    const [cantidadMaterias, setCantidadMaterias] = useState(null);
    const [cantidadGrados, setCantidadGrados] = useState(null);
    const [cantidadEst, setCantidadEst] = useState(null);
    const [promedioNotasCurso, setPromedioNotasCurso] = useState(null);
    const handleData = (data) => {
      if (data.identificador === `${idProfe}`){
        //MATERIAS
        const nuevasMaterias = data.estadisticas.materias_dictadas;
        setCantidadMaterias(prev => {
          if (prev === nuevasMaterias) {
            return prev; // No hacer nada si no cambió
          }
          return nuevasMaterias; // Solo actualizar si realmente cambió
        });


        //GRADOS
        const nuevosGrados= data.estadisticas.cursos_asignados;
        setCantidadGrados(prev => {
          if (prev === nuevosGrados) {
            return prev; // No hacer nada si no cambió
          }
          return nuevosGrados; // Solo actualizar si realmente cambió
        });

        //EST
        const nuevosEst = data.estadisticas.estudiantes_totales;
        setCantidadEst(prev => {
          if (prev === nuevosEst) {
            return prev; // No hacer nada si no cambió
          }
          return nuevosEst; // Solo actualizar si realmente cambió
        });

        //PROMEDIO X GRADO
      const nuevosPromedioGrados = Object.entries(data.estadisticas.promedio_por_curso).map(([curso, info]) => ({
        curso,
        informacion: Object.entries(info).map(([grado, prom]) => ({
          grado,
          promedio: parseFloat(prom.promedioCurso)
        }))
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


    return (
      <WebSocketListener
  
        nombreSala={`profesor_${idProfe}`}
        eventoEscuchar="emitStats"
        onData={handleData}
      >
  
        <Masonry
          breakpointCols={{default: 4,550: 1, 700: 2, 900: 1, 1100: 2, 1400:3, 1600:3 }} // Configuración de las columnas según el ancho
          className={`contenedorDataProfe ${theme}`} // Clase para el contenedor
          columnClassName="contenedorDataColumn" // Clase para las columnas
        >

        {cantidadMaterias !== null ? (
          <div>
            <PildoraEst  clase="peque pildoraEstadistica" est="MATERIAS DICTADAS:" estadistica><AnimatedCounter from={0} to={cantidadMaterias} duration={duracion}  /></PildoraEst>
          </div>
          
        ) : (
          <span className="loader"></span>
        )}

        {cantidadGrados !== null ? (
          <div>
            <PildoraEst color="morado" clase="peque pildoraEstadistica" est="GRADOS ASIGNADOS:" estadistica><AnimatedCounter from={0} to={cantidadGrados} duration={duracion} /></PildoraEst>
          </div>
          
        ) : (
          <span className="loader"></span>
        )}


        {cantidadEst !== null ? (
          <div>
            <PildoraEst color="amarillo" clase="peque pildoraEstadistica" est="ESTUDIANTES:" estadistica><AnimatedCounter from={0} to={cantidadEst} duration={duracion} /></PildoraEst>
          </div>
          
        ) : (
          <span className="loader"></span>
        )} 

        
        {promedioNotasCurso !== null ? (
          promedioNotasCurso.length > 0 ? (

            promedioNotasCurso.map(({ curso, informacion }) => {
              console.log(informacion)
              return (
                <div key={curso} className="graficoBarras">
                  <p>Promedio {curso}</p>
                  <GraficoBarras data={informacion} />
                </div>
              );
            })
            
        
          ) : (
            <p>No hay datos para mostrar</p>
          )
        ) : (
          <span className="loader"></span>
        )}
  

      </Masonry>
      </WebSocketListener>
    );
}

export default ProfeEstadisticas

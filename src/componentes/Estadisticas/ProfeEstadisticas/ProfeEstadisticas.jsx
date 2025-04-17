import React from "react";
import WebSocketListener from "../WebSocketListener/WebSocketListener";

import { useUser } from "../../../Contexts/UserContext";
import { useTheme } from "../../../Contexts/UserContext";
import Masonry from "react-masonry-css";


const ProfeEstadisticas = () => {
    const {theme} = useTheme()
    const {user} = useUser();
    const idProfe = user.id;

  
    const handleData = (data) => {

    };


    return (
      <WebSocketListener
  
        nombreSala={`profesor_${idProfe}`}
        eventoEscuchar="emitStats"
        onData={handleData}
      >
  
        <Masonry
          breakpointCols={{default: 4,550: 1, 700: 2, 900: 1, 1100: 2, 1400:3, 1600:3 }} // Configuración de las columnas según el ancho
          className={`contenedorData ${theme}`} // Clase para el contenedor
          columnClassName="contenedorDataColumn" // Clase para las columnas
        >
  

      </Masonry>
      </WebSocketListener>
    );
}

export default ProfeEstadisticas

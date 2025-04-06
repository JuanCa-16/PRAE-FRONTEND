import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const CantMaterias = () => {
  const [cantidadMaterias, setCantidadMaterias] = useState(null);
  const [idInstitucion, setIdInstitucion] = useState('2'); // Cambia esto por el ID de la institución que deseas monitorear

  useEffect(() => {
    // Conectar al WebSocket
    const socket = io("wss://prae-backend.up.railway.app", {
        transports: ["websocket", "polling"],
    });


    socket.on("connect", () => {
        console.log("Conectado al servidor WebSocket en Railway");
    });
  
    
    // NOTA: Cuando yo ingreso a esta pagina emito este evento "join"
    // cuando yo lo haga el backend debe escuchar este evento y emitir el evento "cantidadMateriasInstitucion" con la cantidad de materias de la institucion que se unio
    // Unirse a una sala específica para la institución
    socket.emit("join", `institucion_${idInstitucion}`);

  
    // Escuchar el evento 'cantidadMateriasInstitucion'
    socket.on("cantidadMateriasInstitucion", (data) => {
      console.log(data)
      console.log(data.id_institucion === idInstitucion)
      if (data.id_institucion === idInstitucion) {
        setCantidadMaterias(data.cantidadMaterias);
      }
    });

    // Manejar errores de conexión
    socket.on("connect_error", (error) => {
      console.error("Error de conexión al WebSocket:", error);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, [idInstitucion]);

  return (
    <div>
      <h1>Cantidad de Materias en la Institución</h1>
      <p>ID de la Institución: {idInstitucion}</p>
      {cantidadMaterias !== null ? (
        <p>Cantidad de Materias: {cantidadMaterias}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CantMaterias;
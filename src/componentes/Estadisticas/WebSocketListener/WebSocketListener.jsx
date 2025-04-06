import React, { useEffect} from "react";
import { io } from "socket.io-client";

/**
 * Componente WebSocketListener
 *
 * Props:
 * - socketUrl: URL del servidor WebSocket (ej: 'wss://prae-backend.up.railway.app')
 * - eventoJoin: Nombre del evento para unirse a la sala (ej: 'join')
 * - nombreSala: Nombre de la sala a unirse (ej: 'institucion_2')
 * - eventoEscuchar: Nombre del evento a escuchar (ej: 'cantidadMateriasInstitucion')
 * - onData: Función que procesa los datos recibidos
 */
const WebSocketListener = ({
  nombreSala,
  eventoEscuchar,
  onData,
  children,
}) => {
    useEffect(() => {
    const socket = io("wss://prae-backend.up.railway.app", {
            transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
        console.log("Conectado al servidor WebSocket:");
        socket.emit('join', nombreSala);
    });

    socket.on(eventoEscuchar, (data) => {
      console.log(`Evento recibido (${eventoEscuchar}):`, data);
      onData(data);
    });

    socket.on("connect_error", (error) => {
      console.error("Error de conexión al WebSocket:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, [nombreSala, eventoEscuchar, onData]);

  return <>{children}</>;
};

export default WebSocketListener;

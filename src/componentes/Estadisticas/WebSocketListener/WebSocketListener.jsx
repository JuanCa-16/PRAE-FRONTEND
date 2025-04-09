import React, { useEffect } from "react";
import socket from "./Socket.jsx"; // o la ruta correcta

const WebSocketListener = ({ nombreSala, eventoEscuchar, onData, children }) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", nombreSala);

    const handleEvent = (data) => {
      console.log(`Evento recibido (${eventoEscuchar}):`, data);
      onData(data);
    };

    socket.on(eventoEscuchar, handleEvent);

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });
    
    socket.on("connect_error", (error) => {
      console.error("Error de conexión al WebSocket:", error);
    });

    return () => {
      socket.off(eventoEscuchar, handleEvent);
      socket.emit("leave", nombreSala);
    };
  }, [nombreSala, eventoEscuchar, onData]);

  return <>{children}</>;
};

export default WebSocketListener;
import { io } from 'socket.io-client';

//conexion url back con wss y sin /
const socket = io('wss://mi-backend-prae-55793889802.us-central1.run.app', {
	transports: ['websocket', 'polling'],
	reconnection: true,
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
});

export default socket;

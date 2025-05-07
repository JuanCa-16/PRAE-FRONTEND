import { io } from 'socket.io-client';

const socket = io('wss://prae-backend.up.railway.app', {
	transports: ['websocket', 'polling'],
	reconnection: true,
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
});

export default socket;

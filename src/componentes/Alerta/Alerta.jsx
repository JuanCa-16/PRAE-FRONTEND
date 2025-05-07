import { toast } from 'react-hot-toast';
import './Alerta.scss';

/* 
    Objeto que maneja las notificaciones personalizadas para la aplicación.
    Proporciona métodos para mostrar alertas de tipo éxito, error, información y alertas personalizadas.
*/

const Alerta = {
	success: (message, grande = false) =>
		toast.custom((t) => (
			<div className={`my-toast my-toast-success ${grande ? 'my-toast-large' : ''}`}>{message}</div>
		)),

	error: (message, grande = false) =>
		toast.custom((t) => (
			<div className={`my-toast my-toast-error ${grande ? 'my-toast-large' : ''}`}>{message}</div>
		)),

	info: (message) => toast.custom((t) => <div className='my-toast my-toast-info'>{message}</div>),

	custom: (message, options) =>
		toast.custom((t) => (
			<div
				className='my-toast'
				{...options}
			>
				{message}
			</div>
		)),
};

export default Alerta;

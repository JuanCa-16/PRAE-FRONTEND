import { toast } from 'react-hot-toast';
import './Alerta.scss';

/* 
    Objeto que maneja las notificaciones personalizadas para la aplicación.
    Proporciona métodos para mostrar alertas de tipo éxito, error, información y alertas personalizadas.
*/

const Alerta = {
	success: (message, grande = false) =>
		toast.custom(
			(t) => (
				<div className={`my-toast my-toast-success ${grande ? 'my-toast-large' : ''}`}>
					{message}
				</div>
			),
			{
				duration: 3000,
			}
		),

	error: (message, grande = false) =>
		toast.custom(
			(t) => (
				<div className={`my-toast my-toast-error ${grande ? 'my-toast-large' : ''}`}>
					{message}
				</div>
			),
			{
				duration: 5000,
			}
		),

	info: (message) =>
		toast.custom((t) => <div className='my-toast my-toast-info'>{message}</div>, {
			duration: 5000,
		}),

	custom: (message, options) =>
		toast.custom(
			(t) => (
				<div
					className='my-toast'
					{...options}
				>
					{message}
				</div>
			),
			{
				duration: 3000,
			}
		),
};

export default Alerta;

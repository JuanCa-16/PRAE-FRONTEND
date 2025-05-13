import { toast } from 'react-hot-toast';
import './Alerta.scss';

/**
 * Objeto que maneja las notificaciones personalizadas para la aplicación.
 * Proporciona métodos para mostrar alertas de tipo éxito, error, información y alertas personalizadas.
 * 
 * @constant Alerta
 * 
 * @method success - Muestra una alerta de éxito.
 * @param {string} message - El mensaje de la alerta.
 * @param {boolean} [grande=false] - Si es `true`, muestra la alerta más grande.
 * 
 * @method error - Muestra una alerta de error.
 * @param {string} message - El mensaje de la alerta.
 * @param {boolean} [grande=false] - Si es `true`, muestra la alerta más grande.
 * 
 * @method info - Muestra una alerta de información.
 * @param {string} message - El mensaje de la alerta.
 * 
 * @method custom - Muestra una alerta personalizada con opciones adicionales.
 * @param {string} message - El mensaje de la alerta.
 * @param {Object} options - Opciones adicionales para personalizar la alerta.
 * 
 * @returns {void}
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

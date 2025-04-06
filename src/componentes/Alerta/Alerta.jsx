import { toast } from 'react-hot-toast';
import './Alerta.scss';

const Alerta = {
    success: (message, grande = false) =>
        toast.success(`${message}`, {
            className: `my-toast my-toast-success ${grande ? 'my-toast-large' : ''}`
        }),

    error: (message, grande = false) =>
        toast.error(`${message}`, {
            className: `my-toast my-toast-error ${grande ? 'my-toast-large' : ''}`
        }),

    info: (message) =>
        toast(`${message}`, { className: "my-toast my-toast-info" }),

    custom: (message, options) =>
        toast(`${message}`, { className: "my-toast", ...options }),
};

export default Alerta;
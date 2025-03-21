import { toast } from 'react-hot-toast';
import './Alerta.scss';

const Alerta = {
    success: (message) =>
    toast.success(`${message}`, { className: "my-toast my-toast-success" }),
    error: (message) =>
    toast.error(`${message}`, { className: "my-toast my-toast-error" }),
    info: (message) =>
    toast(`${message}`, { className: "my-toast my-toast-info" }),
    custom: (message, options) =>
    toast(`${message}`, { className: "my-toast", ...options }),
};

export default Alerta;

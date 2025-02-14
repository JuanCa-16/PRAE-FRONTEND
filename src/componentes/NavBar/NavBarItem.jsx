import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import '../../global.scss';
import "./NavBarItem.scss";
import { HomeIcon } from '../Icons/Icons.jsx';

const NavBarItem = ({ icono: Icon = HomeIcon, texto = "Principal", ruta = "/", tipo, color }) => {
    const navigate = useNavigate(); // Hook para redirigir

    const handleClick = () => {
        if (ruta) {
            navigate(ruta); // Redirige a la ruta especificada
        }
    };

    const [hovered, setHovered] = useState(false);

    return (

        <div className={` ${tipo ? "tipo-existe color" : "contenedorNavBarItem "} ${color}`} onClick={handleClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className='etiqueta'>
                {tipo === undefined || tipo === null ? (<div className="logoNav"> <Icon estado= {hovered}/> </div>):(<div></div>)}
                <p className='texto lato'>{texto}</p>
            </div>
        </div>
    );
};

NavBarItem.propTypes = {
    icono: PropTypes.elementType,   // Asegura que `icono` sea un componente React (como un ícono de react-icons)
    texto: PropTypes.string,        // Asegura que `texto` sea una cadena de texto
    ruta: PropTypes.string,         // Asegura que `ruta` sea una cadena de texto
    tipo: PropTypes.number,         // `tipo` es un número opcional, si es que se usa
    color: PropTypes.string,        // `color` es una cadena de texto, generalmente para clases CSS
};

export default NavBarItem;

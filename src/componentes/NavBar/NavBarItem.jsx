import React from 'react';
import "./NavBarItem.scss";
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes para validación
import { HomeIcon } from '../Icons/Icons.jsx';
import { useTheme } from '../../Contexts/UserContext.jsx';
import { useUser } from '../../Contexts/UserContext.jsx';
/** 
 * Componente: NavBarItem
 * Descripción: Representa un ítem de la barra de navegación que puede incluir un ícono, texto y una función opcional.
 * Props:
 *      - icono (elementType): Componente del ícono a mostrar (por defecto: HomeIcon).
 *      - texto (string): Texto a mostrar en el ítem (por defecto: "Principal").
 *      - ruta (string): Ruta a la que redirige al hacer clic (por defecto: "/").
 *      - tipo (boolean | null | undefined): Define un tipo especial de ítem (true para tipo especial, null o undefined para estándar).
 *      - color (string): Clase CSS adicional para el color (solo puede ser "azul", "morado" o "amarillo").
 *      - activo (boolean): Indica si el ítem está activo.
 *      - func (func): Función a ejecutar al hacer clic.
 */
const NavBarItem = ({ icono: Icon = HomeIcon, texto = "Principal", ruta = "/", tipo, color, activo, func }) => {
    const navigate = useNavigate(); // Hook para redirigir

    const {theme} = useTheme()

    const handleClick = () => {
        if (tipo === true) return;  // Evita la ejecución si `tipo` es true
    
        if (func) {
            return func();
        }
    
        if (ruta) {
            navigate(ruta);
        }
    };

    const { user} = useUser();

    const [colorIcono, setColorIcono] = useState("");

    useEffect(() => {
        const colorPrincipal = getComputedStyle(document.documentElement)
        .getPropertyValue("--colorPrincipal")
        .trim();
        setColorIcono(colorPrincipal);
    }, [user]);
    

    const [hovered, setHovered] = useState(false);

    return (
        <div className={` ${theme} ${tipo ? "tipo-existe color" : "contenedorNavBarItem "} ${color}  ${activo ? "activar" : " "}` } onClick={handleClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className='etiqueta'>
                {tipo === undefined || tipo === null ? (<div className="logoNav"> <Icon color={colorIcono} estado= {hovered} activo={activo} dark={theme === 'dark'}/> </div>):(<></>)}
                <p className='texto lato'>{tipo? texto.toUpperCase() : texto}</p>
            </div>
        </div>
    );
};

NavBarItem.propTypes = {
    icono: PropTypes.elementType,   // Asegura que `icono` sea un componente React
    texto: PropTypes.string,        // Asegura que `texto` sea una cadena de texto
    ruta: PropTypes.string,         // Asegura que `ruta` sea una cadena de texto
    tipo: PropTypes.oneOf([true, null, undefined]), // `tipo` solo permite estos valores
    color: PropTypes.oneOf(["azul", "morado", "amarillo"]), // `color` solo permite estos valores
    activo: PropTypes.bool,         // `activo` indica si el ítem está activo
    func: PropTypes.func,           // `func` es una función opcional
};

export default NavBarItem;

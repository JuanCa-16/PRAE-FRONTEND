import React, {useState, useEffect} from 'react'
import './FooterCom.scss'
import { useUser } from '../../Contexts/UserContext'
import icono from "../../assets/icono.svg"
import { FacebookIcon, InstagramIcon } from '../Icons/Icons'
const FooterCom = ({imagen}) => {


  const {user} = useUser()

  
  const [colorHex, setColorHex] = useState("");
  const [colorHex2, setColorHex2] = useState("");

  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  useEffect(() => {
    setColorHex(getComputedStyle(document.documentElement).getPropertyValue("--colorMezclado").trim());
    setColorHex2(getComputedStyle(document.documentElement).getPropertyValue("--colorMezclado2").trim());
  }, [user]);

  return (
    <footer className={`contenedorFooter `}>
      <div className="contenedor">
        <h3 className='bold'>{user.institucion.nombre} </h3>
        <div className="info">
            <div className="redes">
            {user.institucion.facebook && (
              <a
                href={user.institucion.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="logo"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <FacebookIcon
                  colorApagado={colorHex}
                  color={colorHex2}
                  estado={hovered}
                />
              </a>
            )}
              {user.institucion.instagram && (
              <a
                href={user.institucion.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="logo"
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
              >
                <InstagramIcon
                  colorApagado={colorHex}
                  color={colorHex2}
                  estado={hovered2}
                />
              </a>
            )}
            </div>
            {user.institucion.telefono && (
              <p className='lato'>
                <span className='lato bold'>Teléfono: </span> 
                {user.institucion.telefono}
              </p>
            )}
            {user.institucion.direccion && (
              <p className='lato'>
                <span className='lato bold'>Dirección: </span> 
                {user.institucion.direccion}
              </p>
            )}
        </div>
      </div>
      <div className="contenedorImg">
        {imagen? <img className="logo" alt="" src={imagen}/>:(<img className="logo" alt="" src={user.institucion.logo? user.institucion.logo : icono}/>)}
      </div>
    </footer>
  )
}

export default FooterCom

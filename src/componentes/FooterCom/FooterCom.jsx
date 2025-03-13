import React from 'react'
import './FooterCom.scss'
import { useUser } from '../../Contexts/UserContext'
const FooterCom = () => {

  const {user} = useUser()
  return (
    <footer className={`contenedorFooter `}>
      <div className="contenedor">
        <h3 className='bold'>{user.institucion.nombre} </h3>
        <div className="info">
            <p className='lato'>Texto</p>
            <p className='lato'>Texto</p>
            <p className='lato'>Texto</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterCom

import React from 'react'
import '../../global.scss'
import './NavBar.scss'
import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem';
import LogoPrae from '../LogoPrae/LogoPrae';
import PildoraEst from '../PildoraEst/PildoraEst';

import { MdOutlineBook } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineClipboard } from "react-icons/hi";
import { HiOutlineAcademicCap } from "react-icons/hi2";


const menus = {
  normal: [
    { texto: "Materias", icono: MdOutlineBook, ruta: "/materias" },
    { texto: "Ajustes", icono: AiOutlineSetting, ruta: "/ajustes" },
  ],
  profe: [
    { texto: "Listado", icono: IoListOutline, ruta: "/listado" },
    { texto: "Inscribir Estudiante", icono: AiOutlineUser, ruta: "/inscribir" },
    { texto: "Ajustes", icono: AiOutlineSetting, ruta: "/ajustes" },
  ],
  admin: [
    { texto: "Grados", icono: MdOutlineBook, ruta: "/grados" },
    { texto: "Profesores", icono: HiOutlineClipboard, ruta: "/profesores" },
    { texto: "Materias", icono: IoListOutline, ruta: "/materias" },
    { texto: "Cursos", icono: HiOutlineAcademicCap, ruta: "/cursos" },
    { texto: "Estudiantes", icono: AiOutlineUser, ruta: "/estudiantes" },
    { texto: "Ajustes", icono: AiOutlineSetting, ruta: "/ajustes" },
  ],
};

const NavBar = ({rol = "admin"}) => {

  const menuSeleccionado = menus[rol] || menus.normal; // Usa el menú según el rol


  return (
    <div className='contenedorNavBar'>
      <div className='menuSuperior'>
        <LogoPrae color = {rol === 'profe' ? "morado" : "amarillo"}></LogoPrae>
        <div className="linea"></div>
        <nav className="itemBar">
          {menuSeleccionado.map((item, index) => (
            <NavBarItem key={index} icono={item.icono} texto={item.texto}  ruta={item.ruta}/>))}
        </nav>
      </div>
      {
        rol === 'normal' ? (

          <PildoraEst est='JULIAN CASTRO HENAO'></PildoraEst>
          
        ) : rol === 'profe' ? (
          
          <NavBarItem tipo={1} texto='JUAN MANUEL VALENCIA'></NavBarItem>
          
        ) :  (
          
          <NavBarItem tipo={1} texto='JUAN CAMILO HENAO' color="amarillo"></NavBarItem>
          
  
        )
      }
    </div>
    
  )
}

NavBar.propTypes = {
  rol: PropTypes.oneOf(['normal', 'profe', 'admin']), // Asegura que el rol sea uno de los valores permitidos
};

export default NavBar

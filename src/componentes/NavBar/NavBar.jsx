import React from 'react'
import '../../global.scss'
import './NavBar.scss'
import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem';
import LogoPrae from '../LogoPrae/LogoPrae';
import PildoraEst from '../PildoraEst/PildoraEst';
import { StudyIcon, AjustesIcon, ListadoIcon, EstudianteIcon, TeacherIcon, GradosIcon } from '../Icons/Icons.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const menus = {
  normal: [
    { texto: "Materias", icono: StudyIcon, ruta: "/materias" },
    { texto: "Ajustes", icono: AjustesIcon, ruta: "/ajustesEstudiante" },
  ],
  profe: [
    { texto: "Listado", icono: ListadoIcon, ruta: "/listado" },
    { texto: "Inscribir Estudiante", icono: EstudianteIcon, ruta: "/inscribir" },
    { texto: "Ajustes", icono: AjustesIcon, ruta: "/ajustes" },
  ],
  admin: [
    { texto: "Grados", icono: StudyIcon, ruta: "/grados" },
    { texto: "Profesores", icono: TeacherIcon, ruta: "/profesores" },
    { texto: "Materias", icono: ListadoIcon, ruta: "/materias" },
    { texto: "Cursos", icono: GradosIcon, ruta: "/cursos" },
    { texto: "Estudiantes", icono: EstudianteIcon, ruta: "/estudiantes" },
    { texto: "Ajustes", icono: AjustesIcon, ruta: "/ajustes" },
  ],
};

const NavBar = ({rol = "normal", func}) => {

  const menuSeleccionado = menus[rol] || menus.normal; // Usa el menú según el rol

  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Obtiene la ruta actual

    const handleClick = () => {
          navigate("/"); // Redirige a la ruta especificada
        
    };

  return (
    <div className='contenedorNavBar'>
      <div className='menuSuperior'>
        <div onClick={handleClick} ><LogoPrae color = {rol === 'profe' ? "morado" : rol === 'normal' ? "azul" : "amarillo"} texto={rol === 'profe' ? "PROFESORES" : rol === 'normal' ? "ESTUDIANTES" : "RECTORES"}></LogoPrae></div>
        <div className="linea"></div>
        <nav className="itemBar">
          {menuSeleccionado.map((item, index) => (
            <NavBarItem key={index} icono={item.icono} texto={item.texto}  ruta={item.ruta} activo={location.pathname === item.ruta}/>))}
            <NavBarItem func={func} texto={"Salir"} ruta='/login'/>
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

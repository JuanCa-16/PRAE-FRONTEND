import React , {useEffect} from 'react'
import './NavBar.scss'
import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem';
import LogoPrae from '../LogoPrae/LogoPrae';
import PildoraEst from '../PildoraEst/PildoraEst';
import { StudyIcon, AjustesIcon, ListadoIcon, EstudianteIcon, TeacherIcon, GradosIcon, ExitIcon} from '../Icons/Icons.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../Contexts/UserContext.jsx';
//menus contendra las opciones de la navBar para cada usuario. Contiene su titulo, icono y ruta
const menus = {
  estudiante: [
    { texto: "Materias", icono: StudyIcon, ruta: "/materias" },
    { texto: "Ajustes", icono: AjustesIcon, ruta: "/ajustesEstudiante" },
  ],
  docente: [
    { texto: "Listado", icono: ListadoIcon, ruta: "/listadoCursos" },
    { texto: "Observaciones", icono: EstudianteIcon, ruta: "/observaciones" },
    { texto: "Ajustes", icono: AjustesIcon, ruta: "/editarPerfilDocente" },
  ],
  admin: [
    { texto: "Grados", icono: StudyIcon, ruta: "/crearGrados" },
    { texto: "Profesores", icono: TeacherIcon, ruta: "/profesores" },
    { texto: "Materias", icono: ListadoIcon, ruta: "/crearMaterias" },
    { texto: "Cursos", icono: GradosIcon, ruta: "/asignarGradosMaterias" },
    { texto: "Estudiantes", icono: EstudianteIcon, ruta: "/estudiantes" },
    { texto: "Ajustes", icono: AjustesIcon, ruta: "/editarPerfilRector" },
  ],
};

/** 
 * Componente: NavBar
 * Descripción: Renderiza una barra de navegación dinámica según el rol del usuario.
 * Props:
 *      - rol (string): Define el rol del usuario. Puede ser "normal", "profe" o "admin" (por defecto: "normal").
 *      - nombreUsuario (string): Nombre del usuario que se mostrará en la barra de navegación en mayúsculas.
 *      - func (func): Función a ejecutar al hacer clic en el botón de salida.
 */

const NavBar = ({rol = "normal", nombreUsuario="JUAN CAMILO HENAO GALLEGO", func}) => {

  const menuSeleccionado = menus[rol] || menus.normal; // Usa el menú según el rol

  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Obtiene la ruta actual

  const handleClick = () => {
        navigate("/login"); // Click del LOGOTIPO
        
  };

  useEffect(() => {
    // Forzar actualización del estado cuando cambie la ubicación
  }, [location.pathname]);

   //TRAER NOMBRE DEL TOKEN
  // const token= localStorage.getItem("token");
  
  // const grado= jwtDecode(token).email;

  const { user, setUser } = useUser();
  const grado = user.curso
  

  return (
    <div className='contenedorNavBar'>
      <div className='menuSuperior'>
        <div onClick={handleClick} ><LogoPrae color = {rol === 'docente' ? "morado" : rol === 'estudiante' ? "azul" : "amarillo"} texto={rol === 'docente' ? "PROFESORES" : rol === 'estudiante' ? "ESTUDIANTES" : "RECTORES"}></LogoPrae></div>
        <div className="linea"></div>
        <nav className="itemBar">
          {menuSeleccionado.map((item, index) => (
            <NavBarItem key={index} icono={item.icono} texto={item.texto}  ruta={item.ruta} activo={location.pathname.startsWith(item.ruta)}/>))}
            <NavBarItem func={func} icono={ExitIcon} texto={"Salir"} ruta='/login'/>
        </nav>
      </div>
      {
        rol === 'estudiante' ? (

          <PildoraEst est={nombreUsuario} curso={grado} ></PildoraEst>
          
        ) : rol === 'docente' ? (
          
          <NavBarItem tipo={true} texto={nombreUsuario}></NavBarItem>
          
        ) :  (
          
          <NavBarItem tipo={true} texto={nombreUsuario} color="amarillo"></NavBarItem>
          
        )
      }
    </div>
    
  )
}

NavBar.propTypes = {
  rol: PropTypes.oneOf(['estudiante', 'docente', 'admin']),
  nombreUsuario: PropTypes.string, 
  func: PropTypes.func, 
};

export default NavBar

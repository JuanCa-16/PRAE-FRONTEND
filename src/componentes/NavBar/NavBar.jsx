import React , {useEffect, useState,useRef} from 'react'
import './NavBar.scss'
import PropTypes from 'prop-types';
import NavBarItem from './NavBarItem';
import LogoPrae from '../LogoPrae/LogoPrae';
import PildoraEst from '../PildoraEst/PildoraEst';
import { StudyIcon, AjustesIcon, InstitucionIcon, ListadoIcon, EstudianteIcon, TeacherIcon, GradosIcon, ExitIcon, ThemeIcon,MenuIcon, DataIcon } from '../Icons/Icons.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext.jsx';
import { useTheme } from '../../Contexts/UserContext.jsx';
//menus contendra las opciones de la navBar para cada usuario. Contiene su titulo, icono y ruta


/** 
 * Componente: NavBar
 * Descripción: Renderiza una barra de navegación dinámica según el rol del usuario.
 * Props:
 *      - rol (string): Define el rol del usuario. Puede ser "normal", "profe" o "admin" (por defecto: "normal").
 *      - nombreUsuario (string): Nombre del usuario que se mostrará en la barra de navegación en mayúsculas.
 *      - func (func): Función a ejecutar al hacer clic en el botón de salida.
 */

const NavBar = ({rol = "normal", nombreUsuario="JUAN CAMILO HENAO GALLEGO", func, imagen, inst}) => {
  const menus = {
    normal: [
      { texto: "Materias", icono: StudyIcon, ruta: `#` },
      { texto: "Ajustes", icono: AjustesIcon, ruta: "#" },
    ],
    estudiante: [
      { texto: "Materias", icono: StudyIcon, ruta: `/materias/${nombreUsuario}` },
      { texto: "Ajustes", icono: AjustesIcon, ruta: "/ajustesEstudiante" },
      { texto: "Observaciones", icono: EstudianteIcon, ruta: "/observacionesEst" }
    ],
    docente: [
      { texto: "Listado", icono: ListadoIcon, ruta: "/listadoCursos" },
      { texto: "Observaciones", icono: EstudianteIcon, ruta: "/observaciones" },
      { texto: "Ajustes", icono: AjustesIcon, ruta: "/editarPerfilDocente" },
    ],
    admin: [
      { texto: "Grados", icono: StudyIcon, ruta: "/crearGrados" },
      { texto: "Materias", icono: ListadoIcon, ruta: "/crearMaterias" },
      { texto: "Profesores", icono: TeacherIcon, ruta: "/profesores" },
      { texto: "Estudiantes", icono: EstudianteIcon, ruta: "/estudiantes" },
      { texto: "Cursos", icono: GradosIcon, ruta: "/asignarGradosMaterias" },
      { texto: "Institucion", icono: InstitucionIcon, ruta: "/institucion" },
      { texto: "Ajustes", icono: AjustesIcon, ruta: "/editarPerfilRector" },
      { texto: "Estadisticas", icono: DataIcon, ruta: "/estadisticasRector" },
    ],
  };

  

  const menuSeleccionado = menus[rol] || menus.normal; // Usa el menú según el rol

  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Obtiene la ruta actual

  const handleClick = () => {

        (rol==='normal')? navigate("#") : navigate("/login"); // Click del LOGOTIPO
        
  };

  useEffect(() => {
    // Forzar actualización del estado cuando cambie la ubicación
  }, [location.pathname]);

   //TRAER NOMBRE DEL TOKEN
  // const token= localStorage.getItem("token");
  
  // const grado= jwtDecode(token).email;

  const { user,abrir,setAbrir} = useUser();
  const grado = user.curso


  const { theme, setTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const [colorIcono, setColorIcono] = useState("");
  
      useEffect(() => {
          const colorPrincipal = user.institucion.color_principal;

          setColorIcono(colorPrincipal);
      }, [user]);

  const navRef = useRef(null);
  
  
   // Detectar clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setAbrir(false); // Cierra la NavBar si el clic fue afuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Agrega evento global

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpia el evento al desmontar
    };
  }, [setAbrir]);

  const itemActivo = menuSeleccionado.find(item => decodeURIComponent(location.pathname).startsWith(item.ruta))?.texto || "";


  return (
    <>
    {abrir && <div className="overlay" onClick={() => setAbrir(false)}></div>}
    <div ref={navRef} className={`contenedorNavBar ${abrir? 'mostrar': 'ocultar'} ${theme} ${inst}`}>
      <div className='menuSuperior'>
        <div className="tituloSuperior">
          <div onClick={handleClick} className='contLogo'><LogoPrae imagen={imagen} color = {rol === 'docente' ? "morado" : rol === 'estudiante' ? "azul" : "amarillo"} texto={rol === 'docente' ? "DOCENTES" : rol === 'estudiante' ? "ESTUDIANTES" : "RECTORES"}></LogoPrae></div>
          <div className="iconosNav">
          {(rol !== 'normal') && 
          (<div className="iconoTheme" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><ThemeIcon color={colorIcono} colorApagado={colorIcono} estado= {hovered} dark={theme === 'dark'}></ThemeIcon></div>)}
          {(rol !== 'normal') && 
          (<div className="menuHamburgesa" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setAbrir(!abrir)}> <NavBarItem tipo={true} texto={itemActivo} icono={MenuIcon}></NavBarItem> <MenuIcon color={colorIcono} colorApagado={colorIcono} estado= {hovered} dark={theme === 'dark'}></MenuIcon></div>)}
          </div>
        </div>
        <div className="linea"></div>
        <nav className="itemBar">
          {menuSeleccionado.map((item, index) => (
            
            <NavBarItem key={index} icono={item.icono} texto={item.texto}  ruta={item.ruta} activo={decodeURIComponent(location.pathname).startsWith(item.ruta)} onClick={abrir ? () => setAbrir(false) : () => {}}/>)
            )}
            {(rol !== 'normal') &&(<NavBarItem func={func} icono={ExitIcon} texto={"Salir"} ruta='/login'/>)}
        </nav>
      </div>
      
      <div className="txtInferior">
        {
        rol === 'estudiante' ? (

          <PildoraEst   est={nombreUsuario} curso={grado} ></PildoraEst>
          
        ) : rol === 'docente' ? (
          
          <NavBarItem  tipo={true} texto={nombreUsuario}></NavBarItem>
          
        ) :  (
          
          <NavBarItem  tipo={true} texto={nombreUsuario} color="amarillo"></NavBarItem>
          
        )
      }
      </div>
    </div>
    </>
    
  )
}

NavBar.propTypes = {
  rol: PropTypes.oneOf(['estudiante', 'docente', 'admin']),
  nombreUsuario: PropTypes.string, 
  func: PropTypes.func, 
};

export default NavBar

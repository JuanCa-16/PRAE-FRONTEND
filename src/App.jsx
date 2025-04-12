import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import Prueba from './componentes/Prueba.jsx';
import NavBar from './componentes/NavBar/NavBar.jsx';
import { jwtDecode } from 'jwt-decode';
import { useUser } from './Contexts/UserContext.jsx';
import { useTheme } from './Contexts/UserContext.jsx';
import Alerta from "./componentes/Alerta/Alerta.jsx";
//ESTUDIANTES
import VistaMateria from './paginas/Estudiantes/VistaMateria/VistaMateria.jsx';
import PerfilEst from './paginas/Estudiantes/PerfilEst/PerfilEst.jsx';
import CursosEst from './paginas/Estudiantes/CursosEst/CursosEst.jsx';
import ObservacionesEst from './paginas/Estudiantes/ObservacionesEst/ObservacionesEst.jsx';

//DOCENTES
import CursosDocentes from './paginas/Docentes/CursosDocentes/CursosDocentes.jsx';
import ActividadesCurso from './paginas/Docentes/ActividadesCurso/ActividadesCurso.jsx';
import Observaciones from './paginas/Docentes/Observaciones/Observaciones.jsx';
import CrearObservacion from './paginas/Docentes/CrearObservacion/CrearObservacion.jsx';

//ADMIN
import CrearGrados from './paginas/Administradores/CrearGrados/CrearGrados.jsx';
import CreacionDocente from './paginas/Administradores/CreacionDocente/CreacionDocente.jsx';
import VistaDocente from './paginas/Administradores/VistaDocente/VistaDocente.jsx';

import Login from './paginas/Login/Login.jsx';
import VistaDocenteAct from './paginas/Administradores/VistaDocenteAct/VistaDocenteAct.jsx';
import CreacionEst from './paginas/Administradores/CreacionEst/CreacionEst.jsx';
import VistaEst from './paginas/Administradores/VistaEst/VistaEst.jsx';
import VistaNotasEst from './paginas/Administradores/VistaNotasEst/VistaNotasEst.jsx';
import CrearMateria from './paginas/Administradores/CrearMateria/CrearMateria.jsx';
import AsignarGradosMaterias from './paginas/Administradores/AsignarGradosMaterias/AsignarGradosMaterias.jsx';
import EditarPerfilDoc from './paginas/Docentes/EditarPerfilDoc/EditarPerfilDoc.jsx';
import EditarPerfilAdmin from './paginas/Administradores/EditarPerfilAdmin/EditarPerfilAdmin.jsx';
import FooterCom from './componentes/FooterCom/FooterCom.jsx';
import ScrollToTop from './componentes/ScrollToTop/ScrollToTop.jsx';
import AjustesInstitucion from './paginas/Administradores/AjustesInstitucion/AjustesInstitucion.jsx';
import EstadisticasAdmin from './paginas/Administradores/Estadisticas/EstadisticasAdmin.jsx';


/** 
 * Componente: App
 * Descripción: Componente principal que maneja la navegación de la aplicación y el control de sesiones de usuario.
 * Funcionalidad:
 *      - Gestiona el estado del usuario a través del hook `useState`, cargando los datos desde `localStorage`.
 *      - Permite iniciar sesión mediante la función `iniciarSesion`, que simula la autenticación y guarda los datos del usuario en `localStorage`.
 *      - Permite cerrar sesión a través de la función `cerrarSesion`, eliminando los datos del usuario de `localStorage`.
 *      - Configura las rutas protegidas mediante el componente `ProtectedRoute`, que redirige a las páginas correspondientes según el rol del usuario (estudiante o docente).
 *      - Si el usuario está autenticado, muestra la barra de navegación (`NavBar`) y el contenido principal; de lo contrario, solo muestra el formulario de inicio de sesión.
 * Props:
 *      - Ninguna.
 */

function App() {

  const API_URL = process.env.REACT_APP_API_URL; 

  //ALMACENAR LOS DATOS DEL USUARIO EXTRAIDOS DEL TOKEN
  const { user, setUser, abrir } = useUser();
  const { theme} = useTheme();

  //VERIFICAR EXISTENCIA Y VALIDACION DEL TOKEN
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setUser(null);
        return;
      }
  
      try {
        const response = await fetch(`${API_URL}auth/validate/${token}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if(response.ok){
          setUser(jwtDecode(token));
        }else {
          console.warn("Token inválido o expirado");
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };
  
    checkToken(); // Ejecutar al montar el componente
  
    window.addEventListener("storage", checkToken); // Escuchar cambios en localStorage
    return () => window.removeEventListener("storage", checkToken); // Limpiar evento al desmontar
  
  }, [setUser, API_URL]);
  
  //Si inicia seseion se crear el LOCAL 
  const iniciarSesion = async(email, password) => {

    

    try {

      const response = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciales incorrectas");
        }
        throw new Error(`Error en la autenticación: ${response.status}`);
      }

      const data = await response.json();
      
      localStorage.setItem("token", data.token);
      //const newUser = { rol: valorRol, name: valorName, grado: '6-2' };
      //setUser(newUser);

      if (data.token) {
        const decoded = jwtDecode(data.token);
        console.log("Token decodificado:", decoded);
        setUser(decoded)
      }
      Alerta.success("Inicio de sesión exitoso");
      return console.log("EXITOSO")
    } 
    catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alerta.error(error.message);
      window.scrollTo(0, 0);
      return null;
    }

  };

  //Eliminar TOKEN del local
  const cerrarSesion = () => {
    localStorage.removeItem("token"); // Eliminar del localStorage
    Alerta.success("Sesión cerrada exitosamente");
    setUser(null);
  };

  useEffect(() => {
    if (user) {  // Verifica si hay usuario antes de extraer los colores
        const colores = {
            colorPrincipal: user.institucion.color_principal,
            colorSecundario: user.institucion.color_secundario,
            fondo:  user.institucion.fondo,
            colorPildora1: user.institucion.color_pildora1,
            colorPildora2:  user.institucion.color_pildora2,
            colorPildora3: user.institucion.color_pildora3,
        };

        // Aplicar colores a :root
        Object.entries(colores).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });

        // Forzar actualización de las variables que usan color-mix
      // const principal = getComputedStyle(document.documentElement).getPropertyValue("--colorPrincipal");
      // document.documentElement.style.setProperty("--colorMezclado", `color-mix(in srgb, ${principal} 20%, rgb(255, 255, 255))`);
      // document.documentElement.style.setProperty("--colorMezclado2", `color-mix(in srgb, ${principal} 5%, rgb(255, 255, 255))`);
    }else{
      const valoresPorDefecto = {
        "--colorPrincipal": "#157AFE",  // Reemplázalo con el valor real de tu root
        "--colorSecundario": "#F5F7F9",
        "--fondo": "#FFFFFF",
        "--colorPildora1": "#157AFE",
        "--colorPildora2": "#4946E2",
        "--colorPildora3": "#EF9131",
    };

      Object.entries(valoresPorDefecto).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
      });
    }
},[user]); 



  return (
    <Router>
      
      <div className={`App ${theme}`}>

        

        {
          user ?
          (<nav className="navbar">
            <NavBar rol={user.rol} func = {cerrarSesion} imagen={user.institucion.logo} nombreUsuario={user.nombre + ' ' +user.apellido} ></NavBar>
          </nav>): null
        }

        <main className={user? `main-content ${abrir? 'mostrar': 'ocultar'}`: "completo"}>

          <ScrollToTop></ScrollToTop>
          <Routes>
            
          <Route path='/login' element={
            <ProtectedRoute isAllowed={!user} redireccionar={user ? {
              estudiante: `/materias/${user.nombre + ' ' +user.apellido}`,
              docente: "/listadoCursos",
              admin: "/crearGrados"
            }[user.rol] || "/" : "/"}> 
              <Login func={iniciarSesion} />
            </ProtectedRoute>
          }/>
            <Route element={<ProtectedRoute isAllowed={user && user.rol === 'estudiante'}/>} >
                
                
                <Route path="/materias/:nombreEst" element={<CursosEst/>} />
                <Route path="/materias/:nombreEst/:materia" element={<VistaMateria/>} />
                <Route path="/observacionesEst" element={<ObservacionesEst></ObservacionesEst>} />
                <Route path="/ajustesEstudiante" element={<PerfilEst></PerfilEst>} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol === 'docente'}/>} >
                <Route path='/listadoCursos' element={<CursosDocentes/> } />
                <Route path='/listadoCursos/:nombreProfe/:actCurso' element={<ActividadesCurso/>} />
                <Route path='/observaciones' element={<Observaciones/>} />
                <Route path='/observaciones/:nombreEst' element={<CrearObservacion/>} />
                <Route path='/editarPerfilDocente' element={<EditarPerfilDoc/>} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol === 'admin'}/>} >
                <Route path="/prueba" element={<Prueba></Prueba>} />
                <Route path='/crearGrados' element={<CrearGrados/>} />
                <Route path='/crearMaterias' element={<CrearMateria/>} />
                <Route path='/profesores' element={<CreacionDocente/>} />
                <Route path='/profesores/:nombreProfe' element={<VistaDocente/>} />
                <Route path='/profesores/:nombreProfe/:actCurso' element={<VistaDocenteAct/>} />
                <Route path='/estudiantes' element={<CreacionEst/>} />
                <Route path='/estudiantes/:nombreEst' element={<VistaEst/>} />
                <Route path='/estudiantes/:nombreEst/:materia' element={<VistaNotasEst/>} />
                <Route path='/asignarGradosMaterias' element={<AsignarGradosMaterias/>} />
                <Route path='/editarPerfilRector' element={<EditarPerfilAdmin/>} />
                <Route path='/institucion' element={<AjustesInstitucion/>} />
                <Route path='/estadisticasRector' element={<EstadisticasAdmin/>} />
            </Route>

            <Route path="/*" element={<Navigate to="/login"/>} />

            
            
          </Routes>

          {
          user ?
          (<FooterCom ></FooterCom>): null
          }

          
        </main>

        

        

      </div>
    </Router>
    
  );
}

export default App;

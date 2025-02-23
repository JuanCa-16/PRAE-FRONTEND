import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import Prueba from './componentes/Prueba.jsx';
import NavBar from './componentes/NavBar/NavBar.jsx';

//ESTUDIANTES
import VistaMateria from './paginas/Estudiantes/VistaMateria/VistaMateria.jsx';
import PerfilEst from './paginas/Estudiantes/PerfilEst/PerfilEst.jsx';
import CursosEst from './paginas/Estudiantes/CursosEst/CursosEst.jsx';

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
import ProfePrueba from './paginas/Docentes/ProfePrueba.jsx';
import VistaDocenteAct from './paginas/Administradores/VistaDocenteAct/VistaDocenteAct.jsx';
import CreacionEst from './paginas/Administradores/CreacionEst/CreacionEst.jsx';
import VistaEst from './paginas/Administradores/VistaEst/VistaEst.jsx';
import VistaNotasEst from './paginas/Administradores/VistaNotasEst/VistaNotasEst.jsx';
import CrearMateria from './paginas/Administradores/CrearMateria/CrearMateria.jsx';
import AsignarGradosMaterias from './paginas/Administradores/AsignarGradosMaterias/AsignarGradosMaterias.jsx';

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

  //Cargar datos del usario desde el local 
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("usuario");
    return userData ? JSON.parse(userData) : null;
  });
  

  //Si inicia seseion se crear el LOCAL 
  const iniciarSesion = (valorRol, valorName) => {

    const rolesPermitidos = ["normal", "profe", "admin"];
  
    if (!rolesPermitidos.includes(valorRol)) {
      console.error("Rol no válido");
      return; // Sale de la función si el rol no es válido
    }
    // PETICIONES AL BACK (simulado)
    const newUser = { rol: valorRol, name: valorName, grado: '6-2' };
    setUser(newUser);
    localStorage.setItem("usuario", JSON.stringify(newUser)); // Guardar en localStorage
  };

  //Eliminar TOKEN del local
  const cerrarSesion = () => {
    setUser(null);
    localStorage.removeItem("usuario"); // Eliminar del localStorage
  };
  
  return (
    <Router>
      <div className="App">

        {
          user ?
          (<nav className="navbar">
            <NavBar rol={user.rol} func = {cerrarSesion} nombreUsuario={user.name} ></NavBar>
          </nav>): null
        }

        <main className={user? "main-content": "completo"}>
          <Routes>
            
            <Route path='/login' element={<ProtectedRoute isAllowed={!user} redireccionar= {user ? (user.rol === "normal" ? "/materias" : user.rol === "profe" ? "/listadoCursos" : user.rol === "admin" ? "/crearGrados" : "/") : "/"} > <Login func={iniciarSesion} /></ProtectedRoute>}></Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol === 'normal'}/>} >
                
                <Route path="/prueba" element={<Prueba></Prueba>} />
                <Route path="/materias" element={<CursosEst/>} />
                <Route path="/materias/notas" element={<VistaMateria/>} />
                <Route path="/ajustesEstudiante" element={<PerfilEst></PerfilEst>} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol === 'profe'}/>} >
                <Route path='/listadoCursos' element={<CursosDocentes/> } />
                <Route path='/listadoCursos/notas' element={<ActividadesCurso/>} />
                <Route path='/observaciones' element={<Observaciones/>} />
                <Route path='/observaciones/:nombreEst' element={<CrearObservacion/>} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol === 'admin'}/>} >
                <Route path='/crearGrados' element={<CrearGrados/>} />
                <Route path='/crearMaterias' element={<CrearMateria/>} />
                <Route path='/profesores' element={<CreacionDocente/>} />
                <Route path='/profesores/:nombreProfe' element={<VistaDocente/>} />
                <Route path='/profesores/:nombreProfe/:actCurso' element={<VistaDocenteAct/>} />
                <Route path='/estudiantes' element={<CreacionEst/>} />
                <Route path='/estudiantes/:nombreEst' element={<VistaEst/>} />
                <Route path='/estudiantes/:nombreEst/:materia' element={<VistaNotasEst/>} />
                <Route path='/asignarGradosMaterias' element={<AsignarGradosMaterias/>} />
            </Route>

            <Route path="/*" element={<Navigate to="/login"/>} />

            
          </Routes>
        </main>

      </div>
    </Router>
    
  );
}

export default App;

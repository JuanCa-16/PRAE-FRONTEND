import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './global.scss'
import Prueba from './componentes/Prueba.jsx';
import NavBar from './componentes/NavBar/NavBar.jsx';
import VistaMateria from './paginas/Estudiantes/VistaMateria/VistaMateria.jsx';
import PerfilEst from './paginas/Estudiantes/PerfilEst/PerfilEst.jsx';
import Login from './paginas/Login/Login.jsx';
import { useState } from 'react';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import ProfePrueba from './paginas/Docentes/ProfePrueba.jsx';
function App() {

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("usuario");
    return userData ? JSON.parse(userData) : null;
  });
  

  const iniciarSesion = (valorRol, valorName) => {
    // PETICIONES AL BACK (simulado)
    const newUser = { rol: valorRol, name: valorName };
    setUser(newUser);
    localStorage.setItem("usuario", JSON.stringify(newUser)); // Guardar en localStorage
  };

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
            <NavBar rol={user.rol} func = {cerrarSesion}></NavBar>
          </nav>): null
        }

        <main className={user? "main-content": "completo"}>
          <Routes>
            
            <Route path='/login' element={<ProtectedRoute isAllowed={!user} redireccionar= {user ? (user.rol === "normal" ? "/" : user.rol === "profe" ? "/hola" : "/") : "/"} > <Login func={iniciarSesion} /></ProtectedRoute>}></Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol == 'normal'}/>} >
                <Route path="/" element={<Prueba></Prueba>} />
                <Route path="/ajustesEstudiante" element={<PerfilEst></PerfilEst>} />
                <Route path="/materias" element={<VistaMateria/>} />
            </Route>

            <Route path='/hola' element={<ProtectedRoute isAllowed={user && user.rol === 'profe'}> <ProfePrueba></ProfePrueba> </ProtectedRoute>}></Route>
          </Routes>
        </main>

      </div>
    </Router>
    
  );
}

export default App;

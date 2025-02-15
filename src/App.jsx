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

  const [user,setUser] = useState(null)

  const iniciarSesion = () =>{

    //PETICIONES AL BACK

    setUser({
      rol: "normal",
      name: "Juan" 
    })

  }

  const cerrarSesion = () => setUser(null)

  return (
    <Router>
      <div className="App">
        {!user? (<button onClick={iniciarSesion}>INICIAR</button>):null}
        

        {
          user ?
          (<nav className="navbar">
            <NavBar rol='normal' func = {cerrarSesion}></NavBar>
          </nav>): null
        }

        <main className={user? "main-content": "completo"}>
          <Routes>
            <Route path="/" element={<Prueba></Prueba>} />

        
            <Route path='/login' element={<ProtectedRoute isAllowed={!user} redireccionar= {user ? (user.rol === "normal" ? "/ajustesEstudiante" : user.rol === "profe" ? "/hola" : "/") : "/"} > <Login/></ProtectedRoute>}></Route>

            <Route element={<ProtectedRoute isAllowed={user && user.rol == 'normal'}/>} >
                <Route path="/ajustesEstudiante" element={<PerfilEst></PerfilEst>} />
                <Route path="/materias" element={<VistaMateria/>} />
            </Route>

            <Route path='/hola' element={<ProtectedRoute isAllowed={user && user.rol === 'normal'}> <ProfePrueba></ProfePrueba> </ProtectedRoute>}></Route>
          </Routes>
        </main>

      </div>
    </Router>
    
  );
}

export default App;

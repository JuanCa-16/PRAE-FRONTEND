import './global.scss'
import Prueba from './componentes/Prueba.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/NavBar/NavBar.jsx';
import Login from './paginas/Login/Login.jsx';
function App() {

  return (
    <Router>
      <div className="App">

        <Login></Login>
        
        
        {/* Navbar fija a la izquierda */}
        {/* <nav className="navbar">
          <NavBar></NavBar>
        </nav> */}

        {/* Contenido que cambia según la ruta */}
        {/* <main className="main-content">
          <Routes>
            <Route path="/" element={<Prueba></Prueba>} />

          </Routes>
        </main> */}

      </div>
    </Router>
    
  );
}

export default App;

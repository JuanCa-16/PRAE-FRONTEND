import './global.scss'
import Prueba from './componentes/Prueba.jsx';
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Prueba></Prueba>
      </div>
    </BrowserRouter>
    
  );
}

export default App;

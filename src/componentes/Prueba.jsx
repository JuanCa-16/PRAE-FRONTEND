import '../global.scss'
import React, { useState } from "react";
import InputContainer from './Input/InputContainer';
import PildoraMateriaGrado from './PildoraMateriaGrado/PildoraMateriaGrado';
import PildoraEst from './PildoraEst/PildoraEst';
import Pildora from './Pildora/Pildora';

const Prueba = () => {
  const [email, setEmail] = useState(""); // Estado para manejar el valor del email

  // Función para manejar el cambio en el campo del email
    const handleEmailChange = (newEmail) => {
    setEmail(newEmail); // Actualiza el estado 'email' con el nuevo valor
    };

    return (
        <div>
            <div className="prueba">
                <button>Hola</button>
                <div>
                    <InputContainer
                    titulo="Correo electrónico:"
                    placeholder="correo@example.com"
                    inputType="email"
                    value={email} // El valor del input viene del estado del componente padre
                    onChange={handleEmailChange} // Pasamos la función que actualizará el estado
                    required={true} // Hacemos que el campo sea obligatorio
                />
                <button onClick={() => console.log(email)}>Mostrar Email</button>
                </div>
                <PildoraMateriaGrado texto='6-2' color='amarillo'></PildoraMateriaGrado>
                <PildoraMateriaGrado texto='MATEMATICAS' color='morado'></PildoraMateriaGrado>
                <PildoraEst clase="peque"></PildoraEst>
                <PildoraEst color='morado'></PildoraEst>
                <Pildora titulo = "INGLES" txtsuperior = "Esteban Castro Henao" txtinferior="6-2" color="morado"></Pildora>
                <Pildora titulo = "INGLES" txtsuperior = "Julian Castro Henao" txtinferior="11-2" color="amarillo"></Pildora>
            </div>
        </div>);
};

export default Prueba;

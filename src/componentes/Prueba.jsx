import '../global.scss'
import React, { useState } from "react";
import InputContainer from './Input/InputContainer';

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
            </div>
        </div>);
};

export default Prueba;

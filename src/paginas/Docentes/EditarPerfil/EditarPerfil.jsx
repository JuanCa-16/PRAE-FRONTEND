import { useState } from "react";
import InputContainer from "../../../componentes/Input/InputContainer";

import "./EditarPerfil.scss";

export default function EditarPerfil() {
  const [getData, setGetData] = useState({
    apellidos: "",
    nombre: "",
    correo: "",
    contraseña: "",
    documento: "",
    materia: "",
  });

  const handleChange = (titulo, value) => {
    setGetData({
      ...getData,
      [titulo]: value,
    });
  };

  

  return (
    <div className="container_ajusteDocente">
      <div className="contenido">
        <div className="title">
          <h3>EDITAR PERFIL DOCENTE:</h3>
          <p className="lato">
            Accede a tu perfil y realiza cambios en tus datos personales para
            tenerlo siempre actualizado.
          </p>
        </div>

        <div className="Formulario_perfil">
          <div className="editar_perfil">
            <InputContainer
              placeholder="Henao Gallego"
              titulo="Apellidos:"
              inputType="text"
              value={getData.apellidos}
              required={true}
              nomInput="apellidos"
              onChange={(value) => handleChange("apellidos", value)}
            />

            <InputContainer
              placeholder="Juan Camilo"
              titulo="Nombre:"
              inputType="text"
              value={getData.nombre}
              required={true}
              nomInput="nombre"
              onChange={(value) => handleChange("nombre", value)}
            />

            <InputContainer
              placeholder="correo@gmail.com"
              titulo="Correo electrónico:"
              inputType="email"
              value={getData.correo}
              required={true}
              nomInput="correo"
              onChange={(value) => handleChange("correo", value)}
            />

            <InputContainer
              placeholder="******"
              titulo="Contraseña:"
              inputType="password"
              value={getData.contraseña}
              required={true}
              nomInput="contraseña"
              onChange={(value) => handleChange("contraseña", value)}
            />

            <InputContainer
              placeholder="12345678"
              titulo="Documento:"
              inputType="text"
              value={getData.documento}
              required={true}
              nomInput="documento"
              onChange={(value) => handleChange("documento", value)}
            />

            <InputContainer
              placeholder="Matemáticas"
              titulo="Materia:"
              inputType="text"
              value={getData.materia}
              required={true}
              nomInput="materia"
              onChange={(value) => handleChange("materia", value)}
              disabled={true} 
            />

            <div className="btn">
              <button className="btn_guardar" type="submit">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import InputContainer from "../../../componentes/Input/InputContainer";

import "./EditarPerfilA.scss";

export default function EditarPerfilA() {
  const [getData, setGetData] = useState({
    apellidos: "",
    nombre: "",
    correo: "",
    contraseña: "",
    documento: "",
    institucion: "",
  });

  const handleChange = (titulo, value) => {
    setGetData({
      ...getData,
      [titulo]: value,
    });
  };


  const HandleSave=()=>{
    console.log(getData)
  }
  

  return (
    <div className="container_ajusteDocente">
      <div className="contenido">
        <div className="title">
          <h3>EDITAR PERFIL ADMINISTRADOR:</h3>
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
              placeholder="Colegio San Francisco"
              titulo="Institucion:"
              inputType="text"
              value={getData.institucion}
              required={true}
              nomInput="institucion"
              onChange={(value) => handleChange("institucion", value)}
            />

            <div className="btn">
              <button type="submit"  onClick={()=>HandleSave()}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

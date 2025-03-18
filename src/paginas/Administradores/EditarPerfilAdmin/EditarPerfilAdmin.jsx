import React, { useState, useRef } from "react";
import InputContainer from "../../../componentes/Input/InputContainer";
import TituloDes from "../../../componentes/TituloDes/TituloDes";
import "./EditarPerfilAdmin.scss";
import { useUser } from "../../../Contexts/UserContext";

const EditarPerfilAdmin = () => {

    //const API_URL = process.env.REACT_APP_API_URL; 
    //const token = localStorage.getItem("token");
    const {user} = useUser();
    //const [reload, setReload] = useState(false);


    // Estado inicial que se usará para comparar
    const initialFormData = useRef({
        apellidos: user.apellido,
        nombre: user.nombre,
        correo: user.email,
        doc: user.id,
        contrasena: '',
    });

    //Datos inciales a mostrar
    const [formData, setFormData] = useState(initialFormData.current);

    //Actualizar inputs
    const handleChange = (titulo, value) => {
        setFormData({
            ...formData,
            [titulo.toLowerCase()]: value, // Convierte el título en key (puedes ajustarlo según tus necesidades)
        });
    };

    //Envio del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    return (
        <div className="contenedorPerfilAdmin">
            <div className="editar">
                <TituloDes
                    titulo="EDITAR PERFIL RECTOR"
                    desc="Accede a tu perfil y realiza cambios en tus datos personales para tenerlo siempre actualizado."
                />
                <form onSubmit={handleSubmit} className="formulario">
                    <div className="inputs">
                        <InputContainer
                            nomInput="apellidos"
                            titulo="Apellidos"
                            value={formData.apellidos}
                            inputType="text"
                            required={true}
                            onChange={(value) => handleChange("apellidos", value)}
                            
                        />
                        <InputContainer
                            nomInput="nombres"
                            titulo="Nombres"
                            value={formData.nombre}
                            inputType="text"
                            required={true}
                            onChange={(value) => handleChange("nombre", value)}
                            
                        />
                        <InputContainer
                            nomInput="coreo"
                            titulo="Correo"
                            value={formData.correo}
                            required={true}
                            onChange={(value) => handleChange("correo", value)}
                        />
                        <InputContainer
                            nomInput="contra"
                            titulo="Contraseña"
                            value={formData.contrasena}
                            required={true}
                            inputType="password"
                            onChange={(value) => handleChange("contrasena", value)}
                        />
                        <InputContainer
                            nomInput="doc"
                            titulo="Documento"
                            inputType="text"
                            value={formData.doc}
                            required={true}
                            onChange={(value) => handleChange("doc", value)}
                            
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default EditarPerfilAdmin;

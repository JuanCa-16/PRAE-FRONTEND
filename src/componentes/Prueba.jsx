import '../global.scss'
import React, { useState } from "react";
import InputContainer from './Input/InputContainer';
import PildoraMateriaGrado from './PildoraMateriaGrado/PildoraMateriaGrado';
import PildoraEst from './PildoraEst/PildoraEst';
import Pildora from './Pildora/Pildora';
import NavBarItem from './NavBar/NavBarItem';
import NavBar from './NavBar/NavBar';
import LogoPrae from './LogoPrae/LogoPrae';
import TituloDes from './TituloDes/TituloDes';
import PildoraTitulo from './PildoraTitulo/PildoraTitulo';
import Modal from './Modal/Modal';
import Celda from './Celda/Celda';

const Prueba = () => {


// PRUEBAS INPUT
    const [email, setEmail] = useState(""); // Estado para manejar el valor del email

  // Función para manejar el cambio en el campo del email
    const handleEmailChange = (newEmail) => {
    setEmail(newEmail); // Actualiza el estado 'email' con el nuevo valor
    };


//PRUEBAS MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const openModal3 = () => setIsModalOpen3(true);
    const closeModal3 = () => setIsModalOpen3(false);


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

                <PildoraEst color='morado' clase="peque" est='jose maria esteban'></PildoraEst>

                <PildoraEst color='morado'></PildoraEst>

                <Pildora titulo = "INGLES" txtsuperior = "Esteban Castro Henao" txtinferior="6-2" color="morado"></Pildora>

                <Pildora titulo = "Ingles" txtsuperior = "julian castro Henao" txtinferior="11-2" color="amarillo"></Pildora>

                <LogoPrae></LogoPrae>

                <NavBarItem></NavBarItem>

                <NavBarItem tipo={true}></NavBarItem>

                <NavBar></NavBar>

                <TituloDes titulo='LISTADO DE CURSOS ASIGNADOS' desc='Listado detallado de los cursos de este curso Listado detallado de los cursos de este curso Listado detallado de los cursos de este curso Listado detallado de los cursos de este curso'></TituloDes>
                
                <PildoraTitulo></PildoraTitulo>

                <button onClick={openModal}>Abrir Modal ELIMINAR</button>
                <Modal isOpen={isModalOpen} closeModal={closeModal} tipo='eliminar' modalTexto='Estas seguro de continuar con la accion? eliminar este curso sera de forma permanenete y no se podra cancelar la accion realizada. ' modalTitulo='ELIMINAR GRADO O CURSO'>
                    <button onClick={closeModal} className='rojo'>Cerrar Modal</button>
                </Modal>

                <button onClick={openModal2}>Abrir Modal ACTIVIDAD</button>
                <Modal isOpen={isModalOpen2} closeModal={closeModal2} tipo='actividad' modalTitulo='ELIMINAR GRADO O CURSO'></Modal>
                
                <button onClick={openModal3}>Abrir Modal NOTAS</button>
                <Modal isOpen={isModalOpen3} closeModal={closeModal3} tipo="nota" modalTitulo='ELIMINAR GRADO O CURSO'></Modal>

                <Celda txt='Hola' tipo='titulo'></Celda>
                <Celda txt='Hola' tipo='titulo2'></Celda>
                <Celda txt='Hola' tipo='normal'></Celda>
            </div>
        </div>);
};

export default Prueba;

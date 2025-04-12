import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import PildoraMateriaGrado from "../PildoraMateriaGrado/PildoraMateriaGrado";
import Modal from "../Modal/Modal";
import './ContenedorPildoraMateriaGrado.scss'

const ContenedorPildoraMateriaGrado = ({ info, docente = false, eliminar, txt, clase }) => {
  const pildorasFiltradas = info;
  const navigate = useNavigate();
  const manejarClick = (profe) => {
    const datos = { profe };
    console.log(profe);

    // navigate("/materias/notas", { state: datos }); // Navegar con los datos
    navigate(`/profesores/${profe.nombreCompleto}`, { state: datos });
  };


  const [isModalOpen, setIsModalOpen] = useState(null);
      
      const openModal = (index) => setIsModalOpen(index);
      const closeModal = () => setIsModalOpen(null);


  
  return (
    <div className="materiasGrados">
      {docente ? (
        pildorasFiltradas.length > 0 ? (
          pildorasFiltradas.map((item, index) => (
            <PildoraMateriaGrado
              clase={clase}
              texto={item.nombreCompleto}
              color={item.color}
              key={index}
              onClick={() => manejarClick(item)}
            />
          ))
        ) : (
          <p className="mensaje-no-cursos">
            No hay profesores que cumplan con estos parametros
          </p>
        )
      ) : (
        pildorasFiltradas.length > 0 ? (
            pildorasFiltradas.map((item, index) => (
              <React.Fragment key={index}>
                <PildoraMateriaGrado
                  clase={clase}
                  texto={item.nombre}
                  color={item.color}
                  key={index}
                  onClick={() => openModal(index)}
                />
                {isModalOpen === index && (
                  <Modal
                    isOpen={true}
                    closeModal={closeModal}
                    tipo="eliminar"
                    modalTexto={`Seguro de que quieres eliminar ${item.nombre} como ${txt} de la institucion.`}
                    modalTitulo={`ELIMINAR ${txt.toUpperCase()} ${item.nombre.toUpperCase()}`}
                  >
                    <button
                      onClick={() =>
                      (txt==='grado')?
                      eliminar(index, item.nombre, item.id_curso, closeModal)
                      :eliminar(index, item.nombre, item.id_materia, closeModal)
                      }
                      className="rojo"
                    >
                      ELIMINAR
                    </button>
                  </Modal>
                )}
              </React.Fragment>
            ))
          ) : (
            <p className="mensaje-no-cursos">
              No hay {txt} que cumplan con estos parametros.
            </p>
          )
        
      )}
    </div>
  );
};

export default ContenedorPildoraMateriaGrado;

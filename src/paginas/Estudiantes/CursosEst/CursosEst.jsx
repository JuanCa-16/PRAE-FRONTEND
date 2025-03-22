import React from 'react'
import CursosAsignadosEstudiante from '../../../componentes/CursosAsignadosEstudiante/CursosAsignadosEstudiante';
import { useUser } from '../../../Contexts/UserContext';
/** 
 * Componente: CursosEst
 * Descripción: Muestra un listado de materias del estudiante con la posibilidad de navegar a una página de notas.
 * Props:
 *      - Ninguna.
 * Funcionalidad:
 *      - Muestra una lista de materias con el nombre de la materia, el nombre del profesor, grado y un color asociado.
 *      - Al hacer clic en una "píldora" de materia, navega a la página de notas pasando los datos correspondientes.
 */
export default function CursosEst() {

    const {user} = useUser()
    

    return (
        <CursosAsignadosEstudiante idEst={user.id} url={'/materias'} idCurso={user.id_curso} idInstitucion={user.institucion.id_institucion}></CursosAsignadosEstudiante>
    )
}

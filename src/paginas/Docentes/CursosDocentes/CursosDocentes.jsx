import React from 'react';
import './CursosDocentes.scss';
import CursosAsignadosDocente from '../../../componentes/CursosAsignadosDocente/CursosAsignadosDocente';
import { useUser } from '../../../Contexts/UserContext';
const CursosDocentes = () => {

    const {user} = useUser()
    console.log('holaaai', user)

   
    return (
        <div className='contenedorCursosDocentes'>
            <CursosAsignadosDocente url={'/listadoCursos'} idProfe={user.id} idInstitucion={user.institucion.id_institucion}></CursosAsignadosDocente>
        </div>
    );
};

export default CursosDocentes;

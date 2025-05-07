import React from 'react';
import { useUser } from '../../../Contexts/UserContext';
import CursosAsignadosDocente from '../../../componentes/CursosAsignadosDocente/CursosAsignadosDocente';
import './CursosDocentes.scss';

const CursosDocentes = () => {
	const { user } = useUser();

	return (
		<div className='contenedorCursosDocentes'>
			<CursosAsignadosDocente
				url={'/listadoCursos'}
				idProfe={user.id}
				idInstitucion={user.institucion.id_institucion}
			></CursosAsignadosDocente>
		</div>
	);
};

export default CursosDocentes;

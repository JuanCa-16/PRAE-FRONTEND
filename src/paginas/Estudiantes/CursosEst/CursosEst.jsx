import React from 'react';
import CursosAsignadosEstudiante from '../../../componentes/CursosAsignadosEstudiante/CursosAsignadosEstudiante';
import { useUser } from '../../../Contexts/UserContext';

export default function CursosEst() {
	const { user } = useUser();

	return (
		<CursosAsignadosEstudiante
			idEst={user.id}
			url={'/materias'}
			idCurso={user.id_curso}
			idInstitucion={user.institucion.id_institucion}
		></CursosAsignadosEstudiante>
	);
}

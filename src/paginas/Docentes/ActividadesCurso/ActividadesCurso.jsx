import React from 'react';
import { useLocation } from 'react-router-dom';
import TableDocentes from '../../../componentes/TableDocentes/TableDocentes';

const ActividadesCurso = () => {
	const location = useLocation();
	const { item, idProfe } = location.state || {};

	return (
		<TableDocentes
			infoCurso={item}
			infoDocente={idProfe}
		></TableDocentes>
	);
};

export default ActividadesCurso;

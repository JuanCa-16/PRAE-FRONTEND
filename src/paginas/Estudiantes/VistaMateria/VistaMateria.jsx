import React from 'react';
import { useLocation } from 'react-router-dom';
import TableEst from '../../../componentes/TableEst/TableEst';

const VistaMateria = () => {
	const location = useLocation();
	const { item, idEst } = location.state || {};

	return (
		<TableEst
			infoMateria={item}
			idEst={idEst}
		></TableEst>
	);
};

export default VistaMateria;

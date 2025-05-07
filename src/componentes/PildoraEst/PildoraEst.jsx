import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './PildoraEst.scss';

const PildoraEst = ({
	color = 'azul',
	est = 'JUAN CAMILO HENAO GALLEGO',
	curso = '11-2',
	clase = 'grande',
	onClick,
	estadistica = false,
	children,
}) => {
	const { theme } = useTheme();

	return (
		<div
			className={`pildoraEst ${clase} ${color} ${theme}`}
			onClick={onClick}
		>
			<div className='contenedor'>
				<p className='nombre bold'>{est.toUpperCase()}</p>
				{!estadistica ? (
					<h4 className='inter curso'>{curso}</h4>
				) : (
					<h4 className='inter curso'>{children}</h4>
				)}
			</div>
			<div className='elipse2' />
			<div className='elipse1' />
		</div>
	);
};

export default PildoraEst;

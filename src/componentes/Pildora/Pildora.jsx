import React from 'react';
import { useTheme } from '../../Contexts/UserContext';
import './Pildora.scss';

const Pildora = ({ titulo = 'CALCULO 1', txtsuperior = 'Juan Manuel', txtinferior, color, onClick }) => {
	const { theme } = useTheme();
	return (
		<div
			className={`pildora ${color} ${theme}`}
			onClick={onClick}
		>
			<div className='info'>
				<div className='textos'>
					<p className='texto superior lato'>{txtsuperior}</p>
				</div>
				<div className='textos'>
					<h4 className='titulo inter bold'>{titulo.toUpperCase()}</h4>
				</div>
				<div className='textos'>
					<p className='texto inferior lato'> {txtinferior}</p>
				</div>
			</div>
			<div className='elipse1' />
			<div className='elipse2' />
		</div>
	);
};

export default Pildora;

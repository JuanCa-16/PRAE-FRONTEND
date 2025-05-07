import React from 'react';
import { useTheme } from '../../../Contexts/UserContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './GraficoRadar.scss';

// const data = [
//     { materia: 'Artistica analitica', promedio: 4.5 },

// ];

const GraficoRadar = ({ data }) => {
	const { theme } = useTheme();

	// Generamos un identificador único por grado (puedes usar el índice o cualquier otro método único)
	const radarData = data.map((item, index) => ({
		id: `${index}. ${item.titulo}`, // Asignamos un id único basado en el nombre y el índice
		subject: item.titulo, // Nombre completo del grado
		A: item.promedio, // El promedio es el valor que se graficará
	}));

	return (
		<div
			style={{
				width: '100%',
				height: '400px', // Ajusta la altura según lo que necesites
				paddingTop: '0.5rem',
			}}
			className={`graficoRadar ${theme}`}
		>
			<ResponsiveContainer
				width='100%'
				height='100%'
			>
				<RadarChart
					cx='50%'
					cy='50%'
					outerRadius='80%'
					data={radarData}
				>
					<PolarGrid className='gridRadar' />
					<PolarAngleAxis
						dataKey='id'
						className='colorTxt'
					/>{' '}
					{/* Usamos "id" como key única */}
					<PolarRadiusAxis
						domain={[0, 5]}
						ticks={[0, 1, 2, 3, 4, 5]}
						angle={90}
					/>
					<Tooltip
						wrapperStyle={{
							backgroundColor: '#fff',
							borderRadius: '5px',
							padding: '5px',
						}}
						contentStyle={{
							backgroundColor: 'var(--fondo)',
							borderRadius: '5px',
							border: 'none',
						}}
						itemStyle={{ color: 'var(--colorPildora2)' }}
						labelStyle={{ fontSize: '0.8rem', color: 'var(--colorPildora3)' }}
					/>
					<Radar
						className='figuraRadar'
						name='Promedio'
						dataKey='A'
						stroke='#8884d8'
						fill='#8884d8'
						fillOpacity={0.6}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GraficoRadar;

import React from 'react';
import { useTheme } from '../../../Contexts/UserContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Legend } from 'recharts';
import './GraficoBarrasApiladas.scss';

// Ejemplo de datos con cada titulo y su respectivo promedio por periodo
const GraficoBarrasApiladas = ({ data }) => {
	const alturaGrafico = Math.min(data.length * 60, 800);
	const { theme } = useTheme();

	return (
		<div
			style={{
				width: '100%',
				height: `${alturaGrafico}px`,
				paddingTop: '0.5rem',
			}}
			className={`graficoBarrasApiladasData ${theme}`}
		>
			<ResponsiveContainer height={alturaGrafico}>
				<BarChart
					layout='vertical'
					data={data}
					margin={{ top: 5, right: 50, left: 5, bottom: 5 }}
				>
					<CartesianGrid
						className='cartesianoGrid'
						strokeDasharray='3 3'
						strokeOpacity={0.5}
					/>
					<XAxis
						type='number'
						domain={[0, 5]}
						ticks={[0, 1, 2, 3, 4, 5]}
						className='xAxisText'
					/>
					<YAxis
						dataKey='titulo'
						type='category'
						className='yAxisText'
					/>
					<Tooltip
						itemStyle={{ color: 'var(--colorPildora2)' }}
						labelStyle={{ color: 'var(--colorPildora1)' }}
						contentStyle={{
							backgroundColor: 'var(--fondo)', // Fondo oscuro
							borderRadius: '5px',
						}}
					/>
					<Legend />

					{/* Barra Apilada para el promedio de cada periodo */}
					<Bar
						dataKey='periodo1'
						stackId='a'
						className='periodo1Bar'
						name='Periodo 1'
					></Bar>
					<Bar
						dataKey='periodo2'
						stackId='a'
						className='periodo2Bar'
						name='Periodo 2'
					></Bar>
					<Bar
						dataKey='periodo3'
						stackId='a'
						className='periodo3Bar'
						name='Periodo 3'
					></Bar>

					<Bar
						className='periodo4Bar'
						dataKey='periodo4'
						stackId='a'
						name='Periodo 4'
					>
						<LabelList
							className='labelList'
							dataKey='total'
							position='right'
							fill='var(--colorPildora2)'
						/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GraficoBarrasApiladas;

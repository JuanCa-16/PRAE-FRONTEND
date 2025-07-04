import React, { useState } from 'react';
import { useTheme } from '../../../Contexts/UserContext';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import './GraficoTorta.scss';

// Datos de ejemplo
// const data = [
//   { name: '6-2', value: 5 },
//   { name: '7-8', value: 3 },
//   { name: '7-1', value:2 },
//   { name: 'Group D', value: 3 },
// ];

// Función personalizada para el "ActiveShape" cuando se pasa el mouse sobre una sección
const renderActiveShape = (props, theme) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value } = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g className={`graficoRender ${theme}`}>
			<text
				className='graficoTorta-label'
				x={cx}
				y={cy}
				dy={8}
				textAnchor='middle'
				fill='var(--colorPildora2)'
			>
				{payload.name}
			</text>
			<Sector
				className='graficoTorta-sector'
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill='var(--colorPildora2)'
			/>
			<Sector
				className='graficoTorta-sector'
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill='var(--colorPildora2)'
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				className='graficoTorta-linea'
				stroke='var(--colorPildora2)'
				fill='none'
			/>
			<circle
				cx={ex}
				cy={ey}
				r={2}
				className='graficoTorta-circle'
				fill='var(--colorPildora2)'
				stroke='none'
			/>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 5}
				y={ey}
				className='graficoTorta-value'
				textAnchor={textAnchor}
				fill='var(--colorPildora3)'
			>{`${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 5}
				y={ey}
				dy={18}
				className='graficoTorta-percent'
				textAnchor={textAnchor}
				fill='var(--colorPildora3)'
			>
				{`${(percent * 100).toFixed(1)}%`}
			</text>
		</g>
	);
};

const GraficoTorta = ({ data }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const { theme } = useTheme(); // Obtiene el tema actual del contexto
	// Función para manejar el evento cuando el mouse entra en un sector del gráfico
	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	return (
		<div
			className={`graficoTortaData ${theme}`} // Clase para el contenedor del gráfico
			style={{
				width: '100%',
				height: `100%`,
			}}
		>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						className='graficoPie'
						activeIndex={activeIndex}
						activeShape={(props) => renderActiveShape(props, theme)}
						data={data}
						cx='50%' // Centra el gráfico
						cy='50%' // Centra el gráfico
						innerRadius={50}
						outerRadius={70}
						fill='var(--colorPildora1)' // Color de las porciones
						dataKey='value'
						startAngle={90}
						endAngle={450}
						onMouseEnter={onPieEnter} // Evento para cuando el mouse pasa por encima
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default GraficoTorta;

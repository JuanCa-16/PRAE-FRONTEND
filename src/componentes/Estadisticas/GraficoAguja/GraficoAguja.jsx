import { PieChart, Pie, Cell, ResponsiveContainer, Customized, Tooltip } from 'recharts';
import './GraficoAguja.scss';

const RADIAN = Math.PI / 180;

/* Tramos de la escala 0-5 (con color) */
const SEGMENTOS_BASE = [
	{ name: 'Bajo', value: 2.9, color: '#ff4d4f' }, // 0-2.9
	{ name: 'Medio', value: 1.5, color: '#faad14' }, // 3-4.5
	{ name: 'Alto', value: 0.6, color: '#52c41a' }, // 4.5-5
];
const TOTAL = 5;

/* ───── Tooltip personalizado ───── */
function CustomTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;

	const { index, name, value } = payload[0].payload;
	const acumulado = SEGMENTOS_BASE.slice(0, index + 1).reduce((s, seg) => s + seg.value, 0);

	return (
		<div
			style={{
				padding: '6px 10px',
				background: '#222',
				color: '#fff',
				borderRadius: 6,
				fontSize: 12,
				lineHeight: 1.3,
			}}
		>
			<strong>{name}</strong>
			<br />
			Tramo: {value.toFixed(1)}
			<br />
			Acumulado: {acumulado.toFixed(1)}
		</div>
	);
}

/* ───── Aguja ───── */
function Needle({ cx, cy, innerRadius, outerRadius, value }) {
	const ang = 180 * (1 - value / TOTAL);
	const len = (innerRadius + 2 * outerRadius) / 3;
	const sin = Math.sin(-RADIAN * ang);
	const cos = Math.cos(-RADIAN * ang);
	const r = 6;

	const xba = cx + r * sin;
	const yba = cy - r * cos;
	const xbb = cx - r * sin;
	const ybb = cy + r * cos;
	const xp = cx + len * cos;
	const yp = cy + len * sin;

	return (
		<g>
			<circle
				cx={cx}
				cy={cy}
				r={r}
				fill='#333'
				stroke='#333'
			/>
			<path
				d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} Z`}
				fill='#333'
			/>
		</g>
	);
}

/* ───── Componente principal ───── */
export default function GraficoAguja({
	titulo, // (opcional) por si luego lo muestras
	promedio, // valor 0-5 que posiciona la aguja
	width = 240, // ancho del contenedor (px)
	height = 200, // alto fijo del SVG
}) {
	// Añadimos el índice a cada segmento p/ tooltip
	const SEGMENTOS = SEGMENTOS_BASE.map((s, i) => ({ ...s, index: i }));

	return (
		<div
			className='contenedorAguja'
			style={{ width }}
		>
			<ResponsiveContainer
				width='100%'
				height={height}
			>
				<PieChart>
					<Pie
						data={SEGMENTOS}
						dataKey='value'
						startAngle={180}
						endAngle={0}
						cx='50%'
						cy='75%'
						innerRadius={70}
						outerRadius={110}
						stroke='none'
					>
						{SEGMENTOS.map((seg) => (
							<Cell
								key={seg.name}
								fill={seg.color}
							/>
						))}
					</Pie>

					{/* Tooltip que sigue al cursor y muestra el acumulado */}
					<Tooltip
						content={<CustomTooltip />}
						allowEscapeViewBox={{ x: false, y: true }}
						offset={-110}
					/>

					{/* Aguja */}
					<Customized
						component={({ width: w, height: h }) => (
							<Needle
								cx={w * 0.5}
								cy={h * 0.75}
								innerRadius={70}
								outerRadius={110}
								value={promedio}
							/>
						)}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

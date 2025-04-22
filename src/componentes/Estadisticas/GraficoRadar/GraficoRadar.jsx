import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../../Contexts/UserContext';
import "./GraficoRadar.scss";

const data = [
    { grado: 'Artistica analitica', promedio: 4.5 },
    { grado: 'Sociales', promedio: 3.8 },
    { grado: 'Competencias ciudadanas', promedio: 4.2 },
    { grado: 'sistemas', promedio: 4.0 },
    { grado: 'matematica aaaaaaadddd', promedio: 3.9 },
    { grado: 'tecnologia1', promedio: 2.3 },
    { grado: 'tecnologia2', promedio: 1.3 },
    { grado: 'tecnologia4', promedio: 3.3 },
    { grado: 'tecnologia5', promedio: 2.3 },
    { grado: 'tecnologia6', promedio: 4.3 },
    { grado: 'tecnologia7', promedio: 5 },
];

const GraficoRadar = () => {
  const { theme } = useTheme();

  // Generamos un identificador único por grado (puedes usar el índice o cualquier otro método único)
  const radarData = data.map((item, index) => ({
    id: `${index}. ${item.grado}`, // Asignamos un id único basado en el nombre y el índice
    subject: item.grado,           // Nombre completo del grado
    A: item.promedio,              // El promedio es el valor que se graficará
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "400px", // Ajusta la altura según lo que necesites
        paddingTop: "0.5rem",
      }}
      className={`graficoRadar ${theme}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid className='gridRadar'/>
          <PolarAngleAxis dataKey="id" className='colorTxt' /> {/* Usamos "id" como key única */}
          <PolarRadiusAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} angle={90} />

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
          <Radar className='figuraRadar' name="Promedio" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoRadar;

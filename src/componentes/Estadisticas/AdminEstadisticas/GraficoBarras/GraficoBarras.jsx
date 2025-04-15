import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Rectangle,
} from "recharts";
import React from "react";
import { useTheme } from "../../../../Contexts/UserContext";
import "./GraficoBarras.scss";

// const data = [
//      { grado: '8-2', promedio: 4.3 },
//      { grado: '8-2', promedio: 4.3 },
//      { grado: '8-2', promedio: 4.3 },
//    ];
const GraficoBarras = ({data}) => {
  const alturaGrafico = Math.min(data.length * 55, 800); 
  
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: "100%",
        height: `${alturaGrafico}px`,
        paddingTop: "0.5rem",
      }}
      className={theme}
    >
      <ResponsiveContainer height={alturaGrafico}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 50, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
          <XAxis
            type="number"
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            className="xAxisText"
          />
          <YAxis dataKey="grado" type="category" className="yAxisText" />
          <Tooltip
            itemStyle={{ color: "var(--colorPildora2)" }}
            labelStyle={{ color: "var(--colorPildora1)" }}
            contentStyle={{
              backgroundColor: "var(--fondo)", // Fondo oscuro
              borderRadius: "5px",
            }}
          />
          <Bar
            className="colorBarra"
            dataKey="promedio"
            activeBar={<Rectangle className="colorHover" />}
          >
            <LabelList
              dataKey="promedio"
              position="right"
              fill="var(--colorPildora2)"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoBarras;

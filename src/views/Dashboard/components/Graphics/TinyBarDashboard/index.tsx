import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
  Tooltip,
  LabelProps,
} from "recharts";
import { useTheme } from "styled-components";

interface ProjectData {
  name: string;
  pv: number;
}

// Componente de Label customizado para as barras
const BarLabel: React.FC<LabelProps & { data: ProjectData }> = (props) => {
  const { x, y, width, height, value, data } = props;
  const theme = useTheme();

  // Calcula a posição do texto para centralizar na barra
  const labelX = Number(x) + Number(width) / 2;
  const labelY = Number(y) + Number(height) / 2;

  return (
    <>
      {/* Nome do projeto */}
      <text
        x={labelX}
        y={labelY - 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {data.name}
      </text>
      {/* Valor */}
      <text
        x={labelX}
        y={labelY + 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {value}
      </text>
    </>
  );
};

const TinyBarChartHorizontal: React.FC = () => {
  const theme = useTheme();

  const data: ProjectData[] = [
    { name: "Artigos", pv: 42 },
    { name: "Bases", pv: 15 },
    { name: "Áreas de Pesquisa", pv: 5 },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={150} debounce={50}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
      >
        <XAxis hide axisLine={false} type="number" />
        <YAxis hide yAxisId={0} dataKey="name" type="category" />
        <Bar
          dataKey="pv"
          minPointSize={2}
          barSize={40}
          label={(props) => <BarLabel {...props} data={data[props.index]} />}
        >
          {data.map((d) => (
            <Cell
              key={d.name}
              fill={theme.colors.secondary_colors.purple100}
              fillOpacity={0.6}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TinyBarChartHorizontal;

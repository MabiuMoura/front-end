import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useTheme } from 'styled-components';

const RadarChartDashboard = () => {
  const theme = useTheme();

  const data = [
    { areas: 'Front', Members: 10 },
    { areas: 'Back', Members: 15 },
    { areas: 'UX/UI', Members: 5 },
    { areas: 'IA', Members: 20 },
    { areas: 'Mobile', Members: 7 },
    { areas: 'Data Science', Members: 6 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="80%" 
        data={data}
      >
        <svg>
          <circle cx="50%" cy="50%" r="30%" fill={theme.colors.primary_colors.blue200} opacity={0.2} />
        </svg>
        <PolarAngleAxis 
          dataKey="areas" 
          tick={{ 
            fill: theme.colors.primary_colors.blueGray,
            fontSize: 12
          }}
          axisLine={false}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 20]}
          tickCount={0}
          axisLine={false}
          tick={false}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: theme.colors.primary_colors.blue, 
            border: `1px solid ${theme.colors.primary_colors.gray200}`,
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
          labelStyle={{ color: theme.colors.primary_colors.blueGray }}
        />
        <Radar 
          name="Membros por Área" 
          dataKey="Members" 
          stroke={theme.colors.secondary_colors.purple100}
          strokeWidth={3}
          fill="transparent"
          fillOpacity={0.6}
          
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartDashboard;
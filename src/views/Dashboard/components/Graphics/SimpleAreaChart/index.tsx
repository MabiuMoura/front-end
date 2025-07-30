import {
    Area,
    AreaChart,
    CartesianGrid,
    Label,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { useTheme } from 'styled-components';

const AreaChartDashboard = () => {
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
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 50, left: 20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="5%" 
              stopColor={theme.colors.secondary_colors.neonBlue100} 
              stopOpacity={0.35}
            />
            <stop 
              offset="95%" 
              stopColor={theme.colors.secondary_colors.neonBlue100} 
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        
        <CartesianGrid 
          stroke="transparent"
        />
        <XAxis 
          dataKey="areas" 
          tick={{ fill: theme.colors.primary_colors.blueGray }}
          axisLine={{ stroke: theme.colors.primary_colors.blueGray }}
        />
        <YAxis 
          tick={{ fill: theme.colors.primary_colors.blueGray }}
          axisLine={{ stroke: theme.colors.primary_colors.blueGray }}
        >
          <Label 
            value="Número de Membros" 
            angle={-90} 
            position="insideLeft" 
            style={{ 
              textAnchor: 'middle', 
              fill: theme.colors.primary_colors.blueGray 
            }}
            dx={-10}
            dy={10}
          />
        </YAxis>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: theme.colors.primary_colors.blue , 
            border: `1px solid ${theme.colors.primary_colors.gray200}`,
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
          labelStyle={{ color: theme.colors.primary_colors.blueGray  }}
        />
        <Area 
          type="monotone" 
          dataKey="Members" 
          stackId="1" 
          stroke={theme.colors.secondary_colors.neonBlue}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartDashboard;

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  Legend,
} from "recharts";

interface ChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title?: string;
  className?: string;
}

// Custom tooltip component
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
        <p className="font-medium" style={{ color }}>
          {name}: {value}%
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend component with improved text display
const CustomLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <ul className="flex flex-col gap-2 mt-2 text-sm">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2 whitespace-normal">
          <span 
            className="inline-block w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-800 dark:text-gray-200 break-words">
            {entry.value}: {entry.payload.value}%
          </span>
        </li>
      ))}
    </ul>
  );
};

export function Chart({ data, title, className }: ChartProps) {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={className}>
      {title && <h3 className="text-xl font-semibold mb-4 dark:text-white">{title}</h3>}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                // Ensure the full text is visible
                return (
                  <text
                    x={x}
                    y={y}
                    fill={data[index].color}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-xs font-medium"
                    style={{ textShadow: '0px 0px 3px rgba(0,0,0,0.5)' }}
                  >
                    {`${data[index].name}: ${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={<CustomLegend />}
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Modified version with title prop defaulting to undefined
Chart.displayName = "Chart";

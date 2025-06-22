import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const CategoryBreakdown = ({ transactions, type = 'expense' }) => {
  // Agrupar transacciones por categoría
  const categoryData = React.useMemo(() => {
    const filtered = transactions.filter(t => t.type === type);
    const grouped = filtered.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = 0;
      }
      acc[curr.category] += parseFloat(curr.realCost || 0);
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    })).sort((a, b) => b.value - a.value);
  }, [transactions, type]);

  if (categoryData.length === 0) {
    return (
      <Card className="p-4 h-full">
        <h3 className="text-lg font-semibold mb-4">
          {type === 'expense' ? 'Gastos por Categoría' : 'Ingresos por Categoría'}
        </h3>
        <p className="text-gray-500 text-center my-8">No hay datos disponibles</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">
        {type === 'expense' ? 'Gastos por Categoría' : 'Ingresos por Categoría'}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => 
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`€${value.toFixed(2)}`, 'Total']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/bankService';
import { Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis as LineXAxis, YAxis as LineYAxis, CartesianGrid as LineCartesianGrid, Tooltip as LineTooltip, Legend as LineLegend } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';

export default function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTransactions()
      .then(data => {
        setTransactions(data);
        const inc = data.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const exp = data.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        setTotals({ income: inc, expense: exp });
      })
      .catch(err => console.error(err));
  }, []);

  const filteredTransactions = transactions.filter(t => {
    if (categoryFilter && t.category !== categoryFilter) return false;
    if (providerFilter && t.provider !== providerFilter) return false;
    if (statusFilter && t.status !== statusFilter) return false;
    if (fromDate && t.date < fromDate) return false;
    if (toDate && t.date > toDate) return false;
    return true;
  });

  const data = [
    { name: 'Enero', income: 1000, expense: 500 },
    { name: 'Febrero', income: 1200, expense: 600 },
    { name: 'Marzo', income: 1500, expense: 700 },
    { name: 'Abril', income: 1800, expense: 800 },
    { name: 'Mayo', income: 2000, expense: 900 },
  ];

  const pieData = [
    { name: 'Gastos', value: totals.expense },
    { name: 'Ingresos', value: totals.income },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Finanzas</h1>
      {/* Resumen de Cuenta Conjunta */}
      <div className="flex gap-4">
        <div className="flex-1 bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-xl font-bold">€{totals.income.toFixed(2)}</p>
        </div>
        <div className="flex-1 bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Gastos</p>
          <p className="text-xl font-bold">€{totals.expense.toFixed(2)}</p>
        </div>
        <div className="flex-1 bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Saldo</p>
          <p className="text-xl font-bold">€{(totals.income - totals.expense).toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros y Tabla */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todas las categorías</option>
          </select>
          <select value={providerFilter} onChange={e => setProviderFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todos los proveedores</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
          </select>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border rounded px-2 py-1" />
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border rounded px-2 py-1" />
          <button className="bg-blue-600 text-white px-4 py-1 rounded">Filtrar</button>
          <button className="bg-gray-200 px-4 py-1 rounded">Limpiar</button>
        </div>
        <div className="overflow-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Ítem</th>
                <th className="p-2">Categoría</th>
                <th className="p-2">Proveedor</th>
                <th className="p-2">Coste Previsto</th>
                <th className="p-2">Coste Real</th>
                <th className="p-2">Fecha de Pago</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id} className="border-b">
                  <td className="p-2">{t.item}</td>
                  <td className="p-2">{t.category}</td>
                  <td className="p-2">{t.provider}</td>
                  <td className="p-2">€{t.estimatedCost.toFixed(2)}</td>
                  <td className="p-2">€{t.realCost.toFixed(2)}</td>
                  <td className="p-2">{t.paymentDate}</td>
                  <td className="p-2">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos */}
      <div className="flex gap-4 overflow-x-auto">
        <div className="w-1/3 h-48 bg-white rounded shadow">
          <BarChart width={400} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expense" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="w-1/3 h-48 bg-white rounded shadow">
          <LineChart width={400} height={200} data={data}>
            <LineCartesianGrid strokeDasharray="3 3" />
            <LineXAxis dataKey="name" />
            <LineYAxis />
            <LineTooltip />
            <LineLegend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="w-1/3 h-48 bg-white rounded shadow">
          <PieChart width={400} height={200}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Botones de acción */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg" onClick={() => setModalOpen(true)}>
        <Plus />
      </button>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Exportar CSV</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Agregar transacción</h2>
            <form>
              <div className="flex flex-wrap gap-2 mb-4">
                <input type="text" placeholder="Ítem" className="border rounded px-2 py-1" />
                <input type="text" placeholder="Categoría" className="border rounded px-2 py-1" />
                <input type="text" placeholder="Proveedor" className="border rounded px-2 py-1" />
                <input type="number" placeholder="Coste previsto" className="border rounded px-2 py-1" />
                <input type="number" placeholder="Coste real" className="border rounded px-2 py-1" />
                <input type="date" placeholder="Fecha de pago" className="border rounded px-2 py-1" />
                <select className="border rounded px-2 py-1">
                  <option value="">Estado</option>
                  <option value="pending">Pendiente</option>
                  <option value="paid">Pagado</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">Agregar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

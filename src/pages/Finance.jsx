import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/bankService';
import { Plus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';




export default function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [monthlyContrib, setMonthlyContrib] = useState(0);
  const [expectedIncome, setExpectedIncome] = useState(0);
  const paidTotal = transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.realCost, 0);
  const outstandingTotal = transactions.filter(t => t.status !== 'paid').reduce((s, t) => s + t.estimatedCost, 0);

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

  const projectedData = React.useMemo(() => {
    let balance = totals.income - totals.expense;
    return data.map(item => {
      balance += monthlyContrib + expectedIncome / data.length - item.expense + item.income;
      return { name: item.name, projected: parseFloat(balance.toFixed(2)) };
    });
  }, [data, totals, monthlyContrib, expectedIncome]);

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

      {/* Dashboard de Análisis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Evolución Mensual</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#82ca9d" />
              <Bar dataKey="expense" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Distribución Ingresos/Gastos</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#82ca9d'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Previsión de Saldo</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={projectedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projected" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Filtros y Tabla */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Contribución mensual</p>
          <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(e.target.value)} className="w-full mt-1 border rounded px-2 py-1" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Ingresos esperados</p>
          <input type="number" value={expectedIncome} onChange={e => setExpectedIncome(e.target.value)} className="w-full mt-1 border rounded px-2 py-1" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Monto pagado</p>
          <p className="text-xl font-bold">€{paidTotal.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Pendiente</p>
          <p className="text-xl font-bold">€{outstandingTotal.toFixed(2)}</p>
        </div>
      </div>
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

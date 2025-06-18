import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/bankService';
import { Plus } from 'lucide-react';

export default function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

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

  const [categoryFilter, setCategoryFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

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
              <tr className="border-b">
                <td className="p-2">Banquete</td>
                <td className="p-2">Catering</td>
                <td className="p-2">Catering S.L.</td>
                <td className="p-2">€2.000</td>
                <td className="p-2">€1.800</td>
                <td className="p-2">2025-06-01</td>
                <td className="p-2">Pagado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos */}
      <div className="flex gap-4 overflow-x-auto">
        <div className="w-1/3 h-48 bg-gray-200 rounded flex items-center justify-center">Gráfico de líneas</div>
        <div className="w-1/3 h-48 bg-gray-200 rounded flex items-center justify-center">Barras apiladas</div>
        <div className="w-1/3 h-48 bg-gray-200 rounded flex items-center justify-center">Gráfico circular</div>
      </div>

      {/* Botones de acción */}
      <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <Plus />
      </button>
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Exportar CSV</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Exportar PDF</button>
      </div>
    </div>
  );
}

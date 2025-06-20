import React, { useState, useEffect, useMemo } from 'react';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import { saveAs } from 'file-saver';
import { getTransactions } from '../services/bankService';
import { Plus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';




export default function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const initialTransaction = { item: '', category: '', provider: '', estimatedCost: '', realCost: '', paymentDate: '', status: '', type: '' };
  const [newTransaction, setNewTransaction] = useState(initialTransaction);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [modalError, setModalError] = useState(null);
const pageSize = 5;
const currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' });
const [toast, setToast] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setNewTransaction(initialTransaction);
  };
  const handleAddTransaction = e => {
    e.preventDefault();
      if (!newTransaction.item || !newTransaction.category || !newTransaction.provider || !newTransaction.realCost || !newTransaction.paymentDate || !newTransaction.status || !newTransaction.type) {
        setModalError('Por favor completa todos los campos');
        return;
      }
      setModalError(null);
    const newTx = {
      id: Date.now().toString(),
      item: newTransaction.item,
      category: newTransaction.category,
      provider: newTransaction.provider,
      estimatedCost: parseFloat(newTransaction.estimatedCost) || 0,
      realCost: parseFloat(newTransaction.realCost) || 0,
      paymentDate: newTransaction.paymentDate,
      status: newTransaction.status,
      type: newTransaction.type,
      amount: parseFloat(newTransaction.realCost) || 0,
    };
    const updated = [...transactions, newTx];
    setTransactions(updated);
    const inc = updated.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const exp = updated.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    setTotals({ income: inc, expense: exp });
    setModalOpen(false);
    setNewTransaction(initialTransaction);
  };
  const exportCsv = () => {
    const headers = ['Ítem','Categoría','Proveedor','Coste Previsto','Coste Real','Fecha de Pago','Estado','Tipo'];
    const rows = filteredTransactions.map(t => [
      t.item, t.category, t.provider,
      currencyFormatter.format(t.estimatedCost),
      currencyFormatter.format(t.realCost),
      t.paymentDate, t.status, t.type
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transacciones.csv');
  };

  const [monthlyContrib, setMonthlyContrib] = useState(0);
  const [expectedIncome, setExpectedIncome] = useState(0);
  const paidTotal = transactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.realCost, 0);
  const outstandingTotal = transactions.filter(t => t.status !== 'paid').reduce((s, t) => s + t.estimatedCost, 0);

  useEffect(() => {
    setLoading(true);
    getTransactions()
      .then(data => {
        setTransactions(data);
        const inc = data.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const exp = data.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        setTotals({ income: inc, expense: exp });
        setError(null);
      })
      .catch(err => { setError(err.message); setToast({ message: err.message, type: 'error' }); })
      .finally(() => setLoading(false));
  }, []);

  const filteredTransactions = transactions.filter(t => {
    if (categoryFilter && t.category !== categoryFilter) return false;
    if (providerFilter && t.provider !== providerFilter) return false;
    if (statusFilter && t.status !== statusFilter) return false;
    if (fromDate && t.paymentDate < fromDate) return false;
    if (toDate && t.paymentDate > toDate) return false;
    return true;
  });
const sortedTransactions = useMemo(() => {
    if (!sortConfig.key) return filteredTransactions;
    return [...filteredTransactions].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, sortConfig]);
  const totalPages = Math.ceil(sortedTransactions.length / pageSize);
const paginatedTransactions = sortedTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

  // Listas dinámicas para filtros
  const categoriesList = React.useMemo(
    () => Array.from(new Set(transactions.map(t => t.category))).sort(),
    [transactions]
  );
  const providersList = React.useMemo(
    () => Array.from(new Set(transactions.map(t => t.provider))).sort(),
    [transactions]
  );

  return (
    <div className="p-6 space-y-6">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-semibold">Finanzas</h1>
      {/* Resumen de Cuenta Conjunta */}
      <div className="flex gap-4">
        <Card className="flex-1 hover:shadow-lg transform hover:scale-105 transition-shadow transition-transform">
          <p className="text-sm text-gray-500">Ingresos</p>
          <p className="text-xl font-bold">€{totals.income.toFixed(2)}</p>
        </Card>
        <Card className="flex-1 hover:shadow-lg transform hover:scale-105 transition-shadow transition-transform">
          <p className="text-sm text-gray-500">Gastos</p>
          <p className="text-xl font-bold">€{totals.expense.toFixed(2)}</p>
        </Card>
        <Card className="flex-1 hover:shadow-lg transform hover:scale-105 transition-shadow transition-transform">
          <p className="text-sm text-gray-500">Saldo</p>
          <p className="text-xl font-bold">€{(totals.income - totals.expense).toFixed(2)}</p>
        </Card>
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
              <Bar dataKey="income" fill="#82ca9d" animationDuration={500} />
              <Bar dataKey="expense" fill="#8884d8" animationDuration={500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Distribución Ingresos/Gastos</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label animationDuration={500}>
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
              <Line type="monotone" dataKey="projected" stroke="#ff7300" animationDuration={500} />
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
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <select aria-label="Filtrar por categoría" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border rounded px-2 py-1 w-full">
            <option value="">Todas las categorías</option>
            {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select aria-label="Filtrar por proveedor" value={providerFilter} onChange={e => setProviderFilter(e.target.value)} className="border rounded px-2 py-1 w-full">
            <option value="">Todos los proveedores</option>
            {providersList.map(prov => <option key={prov} value={prov}>{prov}</option>)}
          </select>
          <select aria-label="Filtrar por estado" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
          </select>
          <input type="date" aria-label="Fecha desde" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border rounded px-2 py-1" />
          <input type="date" aria-label="Fecha hasta" value={toDate} onChange={e => setToDate(e.target.value)} className="border rounded px-2 py-1" />
          <Button className="px-4 py-1 transform hover:scale-105 transition-transform">Filtrar</Button>
          <Button variant="secondary" className="px-4 py-1 transform hover:scale-105 transition-transform">Limpiar</Button>
        </div>
        {loading && <Spinner />}
{error && <div role="alert" className="text-red-600 mb-4">{error}</div>}
<div className="overflow-auto relative">
          <table className="w-full table-auto" aria-label="Tabla de transacciones">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-left border-b">
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('item')}>Ítem {sortConfig.key === 'item' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('category')}>Categoría {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('provider')}>Proveedor {sortConfig.key === 'provider' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('estimatedCost')}>Coste Previsto {sortConfig.key === 'estimatedCost' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('realCost')}>Coste Real {sortConfig.key === 'realCost' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('paymentDate')}>Fecha de Pago {sortConfig.key === 'paymentDate' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
                <th scope="col" className="p-2 cursor-pointer select-none" onClick={() => handleSort('status')}>Estado {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map(t => (
                <tr key={t.id} className="border-b odd:bg-gray-50 hover:bg-gray-100 transition-colors">
                  <td className="p-2">{t.item}</td>
                  <td className="p-2">{t.category}</td>
                  <td className="p-2">{t.provider}</td>
                  <td className="p-2">{currencyFormatter.format(t.estimatedCost)}</td>
                  <td className="p-2">{currencyFormatter.format(t.realCost)}</td>
                  <td className="p-2">{t.paymentDate}</td>
                  <td className="p-2">{t.status}</td>
                   <td className="p-2">{t.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
              <div className="p-2">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={page => setCurrentPage(page)} />
              </div>
        </div>
      </Card>

      {/* Botones de acción */}
      <Button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50" onClick={() => setModalOpen(true)} aria-label="Agregar transacción">
        <Plus className="text-white" />
      </Button>
      <div className="flex gap-2">
        <Button variant="success" onClick={exportCsv} className="transform hover:scale-105 transition-transform">Exportar CSV</Button>
        <Button variant="danger" className="transform hover:scale-105 transition-transform">Exportar PDF</Button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <Card className="w-full max-w-lg mx-4 p-6">
            <h2 id="modal-title" className="text-xl font-bold mb-4">Agregar transacción</h2>
                {modalError && <div role="alert" className="text-red-600 mb-2">{modalError}</div>}
            <form onSubmit={handleAddTransaction} aria-labelledby="modal-title">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input name="item" value={newTransaction.item} onChange={handleInputChange} placeholder="Ítem" className="border rounded px-2 py-1 w-full" />
                <input name="category" value={newTransaction.category} onChange={handleInputChange} placeholder="Categoría" className="border rounded px-2 py-1 w-full" />
                <input name="provider" value={newTransaction.provider} onChange={handleInputChange} placeholder="Proveedor" className="border rounded px-2 py-1 w-full" />
                <input name="estimatedCost" value={newTransaction.estimatedCost} onChange={handleInputChange} type="number" placeholder="Coste previsto" className="border rounded px-2 py-1 w-full" />
                <input name="realCost" value={newTransaction.realCost} onChange={handleInputChange} type="number" placeholder="Coste real" className="border rounded px-2 py-1 w-full" />
                <input name="paymentDate" value={newTransaction.paymentDate} onChange={handleInputChange} type="date" placeholder="Fecha de pago" className="border rounded px-2 py-1 w-full" />
                <select name="type" value={newTransaction.type} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" aria-label="Tipo de transacción">
                    <option value="">Tipo</option>
                    <option value="income">Ingreso</option>
                    <option value="expense">Gasto</option>
                </select>
                <select name="status" value={newTransaction.status} onChange={handleInputChange} className="border rounded px-2 py-1 w-full" aria-label="Estado">
                  <option value="">Estado</option>
                  <option value="pending">Pendiente</option>
                  <option value="paid">Pagado</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

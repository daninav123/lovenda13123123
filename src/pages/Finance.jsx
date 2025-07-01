import React, { useState, useEffect, useMemo } from 'react';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import { saveAs } from 'file-saver';
import { getTransactions } from '../services/bankService';
import { Plus, Link2, Edit3, Settings, AlertCircle, Clock, CheckCircle, AlertTriangle, Download, Upload } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import { CategoryBreakdown } from '../components/finance/CategoryBreakdown';
import { BudgetAlerts } from '../components/finance/BudgetAlerts';
import { VendorPayments } from '../components/finance/VendorPayments';
import Modal from '../components/Modal';

// -------------------------- NUEVA PÁGINA FINANZAS --------------------------
function Finance() {
  const locationHash = typeof window !== 'undefined' ? window.location.hash : '';

  const [configOpen, setConfigOpen] = React.useState(false);
  // Estado para aportaciones y regalos
  const [personA, setPersonA] = React.useState(0);
  const [personB, setPersonB] = React.useState(0);
  const [giftPerGuest, setGiftPerGuest] = React.useState(0);
  const [guestCount, setGuestCount] = React.useState(0);
  const [monthlyContrib, setMonthlyContrib] = React.useState(0); // suma de A+B
  const [expectedIncome, setExpectedIncome] = React.useState(0);

  // Datos simulados (reemplazar por API/estado real)
  const balance = 12000;
  const [manualOpen, setManualOpen] = useState(false);

  // Abrir modal de nuevo movimiento si la URL contiene #nuevo
  React.useEffect(() => {
    if (locationHash === '#nuevo') {
      setManualOpen(true);
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);
  const [newMovement, setNewMovement] = useState({ concept: '', amount: 0, date: '', type: 'expense' });
  // Presupuesto total y categorías
  const [totalBudget, setTotalBudget] = useState(30000);
  const [categories, setCategories] = useState([
    { name: 'Catering', amount: 8000 },
    { name: 'Música', amount: 2000 },
    { name: 'Flores', amount: 1500 },
    { name: 'Luna de miel', amount: 5000 },
  ]);
  const emergencyAmount = Math.round(totalBudget * 0.1);

  const addCategory = () => {
    const name = prompt('Nombre de la categoría');
    if (name && !categories.find(c => c.name === name)) {
      setCategories([...categories, { name, amount: 0 }]);
    }
  };
  const updateCategory = (idx, value) => {
    const next = [...categories];
    next[idx].amount = Number(value);
    setCategories(next);
  };

  const upcomingExpenses = [
    { id: 1, name: 'Fotógrafo', amount: 800, date: '2025-07-10' },
    { id: 2, name: 'Florería', amount: 600, date: '2025-07-15' },
  ];
  const upcomingIncomes = [
    { id: 1, name: 'Regalo padres', amount: 2000, date: '2025-07-20' },
  ];
  const pendingExpenses = upcomingExpenses;
  const history = [
    { id: 1, name: 'Reserva finca', amount: 3000, date: '2025-06-01', type: 'expense' },
    { id: 2, name: 'Aportación Persona A', amount: 5000, date: '2025-05-30', type: 'income' },
  ];

  const fmt = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Finanzas</h1>
      <div className="flex flex-wrap gap-2 my-4">
        <Button leftIcon={<Link2 size={18} />} onClick={() => alert('Función de vincular banco próximamente')}>Vincular banco</Button>
        <Button leftIcon={<Edit3 size={18} />} onClick={() => setManualOpen(true)}>Añadir movimiento</Button>
        <Button leftIcon={<Settings size={18} />} onClick={() => setConfigOpen(true)}>Configuración</Button>
        
        
      </div>
      <Card className="flex-1 min-w-[260px] text-center">
        <h2 className="text-lg font-medium mb-2">Saldo disponible</h2>
        <p className="text-4xl font-bold text-green-600">{fmt.format(balance)}</p>
      </Card>

        
          <Card className="flex-1 min-w-[220px]">
            <h3 className="font-medium mb-2">Próximos gastos</h3>
            <ul className="text-sm space-y-1">
              {upcomingExpenses.map(e => (
                <li key={e.id} className="flex justify-between">
                  <span>{e.name}</span>
                  <span className="text-red-600">{fmt.format(e.amount)}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="flex-1 min-w-[220px]">
            <h3 className="font-medium mb-2">Próximos ingresos</h3>
            <ul className="text-sm space-y-1">
              {upcomingIncomes.map(i => (
                <li key={i.id} className="flex justify-between">
                  <span>{i.name}</span>
                  <span className="text-green-600">{fmt.format(i.amount)}</span>
                </li>
              ))}
            </ul>
          </Card>
        

        

        
      

      {/* Tabla gastos pendientes */}
      <Card>
        <h3 className="font-medium mb-2">Gastos pendientes</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Concepto</th>
              <th>Fecha</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {pendingExpenses.map(e => (
              <tr key={e.id} className="border-t">
                <td>{e.name}</td>
                <td>{e.date}</td>
                <td className="text-red-600">{fmt.format(e.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Planificación de presupuesto */}
      <Card className="space-y-4">
        <h3 className="font-medium text-lg">Planificación de presupuesto</h3>
        <div className="flex items-center space-x-2">
          <span>Presupuesto total:</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-32"
            value={totalBudget}
            onChange={e => setTotalBudget(Number(e.target.value))}
          />
        </div>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Categoría</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat.name} className="border-t">
                <td className="py-1">{cat.name}</td>
                <td className="py-1">
                  <input
                    type="number"
                    className="border rounded px-1 w-24"
                    value={cat.amount}
                    onChange={e => updateCategory(idx, e.target.value)}
                  />
                </td>
              </tr>
            ))}
            <tr className="border-t font-medium">
              <td className="py-1">Fondo de emergencia (10%)</td>
              <td className="py-1">{fmt.format(emergencyAmount)}</td>
            </tr>
          </tbody>
        </table>
        <Button variant="secondary" onClick={addCategory}>+ Añadir categoría</Button>
      </Card>

      {/* Historial */}
      <Card>
        <h3 className="font-medium mb-2">Histórico de gastos e ingresos</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Concepto</th>
              <th>Fecha</th>
              <th>Importe</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {history.map(r => (
              <tr key={r.id} className="border-t">
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td className={r.type === 'expense' ? 'text-red-600' : 'text-green-600'}>{fmt.format(r.amount)}</td>
                <td>{r.type === 'expense' ? 'Gasto' : 'Ingreso'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal configuración */}
      <Modal open={configOpen} onClose={() => setConfigOpen(false)} title="Configuración finanzas">
        <div className="space-y-3">
          <label className="block">
            Aportación Persona A
            <input type="number" className="border rounded px-2 py-1 w-full" value={personA} onChange={e=>setPersonA(+e.target.value||0)} placeholder="€" />
          </label>
          <label className="block">
            Aportación Persona B
            <input type="number" className="border rounded px-2 py-1 w-full" value={personB} onChange={e=>setPersonB(+e.target.value||0)} placeholder="€" />
          </label>
          <label className="block">
            Regalo estimado por invitado
            <input type="number" className="border rounded px-2 py-1 w-full" value={giftPerGuest} onChange={e=>setGiftPerGuest(+e.target.value||0)} placeholder="€" />
          </label>
          <label className="block">
            Número de invitados
            <input type="number" className="border rounded px-2 py-1 w-full" value={guestCount} onChange={e=>setGuestCount(+e.target.value||0)} placeholder="€" />
          </label>
          <div className="text-right">
            <Button onClick={() => setConfigOpen(false)}>Guardar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal movimiento manual */}
      <Modal open={manualOpen} onClose={() => setManualOpen(false)} title="Nuevo movimiento">
        <div className="space-y-3">
          <label className="block">
            Concepto
            <input type="text" className="border rounded px-2 py-1 w-full" value={newMovement.concept} onChange={e=>setNewMovement({...newMovement, concept:e.target.value})} />
          </label>
          <label className="block">
            Monto (€)
            <input type="number" className="border rounded px-2 py-1 w-full" value={newMovement.amount} onChange={e=>setNewMovement({...newMovement, amount:+e.target.value||0})} />
          </label>
          <label className="block">
            Fecha
            <input type="date" className="border rounded px-2 py-1 w-full" value={newMovement.date} onChange={e=>setNewMovement({...newMovement, date:e.target.value})} />
          </label>
          <label className="block">
            Tipo
            <select className="border rounded px-2 py-1 w-full" value={newMovement.type} onChange={e=>setNewMovement({...newMovement, type:e.target.value})}>
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
          </label>
          <div className="text-right space-x-2">
            <Button variant="outline" onClick={()=>setManualOpen(false)}>Cancelar</Button>
            <Button onClick={()=>{console.log('Movimiento guardado', newMovement); setManualOpen(false);}}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Finance;

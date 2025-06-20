// Servicio para obtener transacciones desde un backend que integra un agregador bancario
export async function getTransactions({ bankId, from, to } = {}) {
  if (!import.meta.env.VITE_BANK_API_BASE_URL || !import.meta.env.VITE_BANK_API_KEY) {
    throw new Error('Missing bank API configuration: revise VITE_BANK_API_BASE_URL y VITE_BANK_API_KEY');
  }
  const params = new URLSearchParams();
  if (bankId) params.append('bankId', bankId);
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  const url = `${import.meta.env.VITE_BANK_API_BASE_URL}/transactions?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_BANK_API_KEY}`
    }
  });
  if (!res.ok) throw new Error('Error fetching transactions');
  return res.json();
}

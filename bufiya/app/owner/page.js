'use client';
import { useStore } from '../context/StoreContext';

export default function Owner() {
  const { orders } = useStore();
  const total = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">Total Revenue</h2>
          <p className="text-4xl font-bold text-green-400">{total} SAR</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">Total Orders</h2>
          <p className="text-4xl font-bold">{orders.length}</p>
        </div>
      </div>
    </div>
  );
}
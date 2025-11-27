'use client';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';

export default function Manager() {
  const { menu, manageItem, seed } = useStore();
  const [form, setForm] = useState({ name: '', price: '', image: '🍽️' });

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Menu Manager</h1>
          <button onClick={seed} className="bg-gray-200 px-3 rounded text-sm">Load Default Data</button>
      </div>
      <div className="bg-gray-100 p-4 mb-6 rounded flex gap-2">
        <input placeholder="Name" className="p-2 rounded border" onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Price" type="number" className="p-2 rounded border w-24" onChange={e => setForm({...form, price: Number(e.target.value)})} />
        <button onClick={() => manageItem({...form, visible: true}, 'add')} className="bg-green-600 text-white px-4 rounded">Add</button>
      </div>
      {menu.map(m => (
        <div key={m.id} className="flex justify-between border-b py-2">
          <span>{m.image} {m.name} ({m.price} SAR)</span>
          <button onClick={() => manageItem(m, 'delete')} className="text-red-500">Delete</button>
        </div>
      ))}
    </div>
  );
}
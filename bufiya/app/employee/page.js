'use client';
import { useStore } from '../context/StoreContext';

export default function Employee() {
  const { orders, updateStatus } = useStore();
  const active = orders.filter(o => o.status !== 'Completed');

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4">Kitchen Queue</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {active.map(o => (
          <div key={o.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-600">
            <h3 className="font-bold text-lg">{o.customer}</h3>
            <p className="text-gray-600 mb-2">{o.items}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => updateStatus(o.id, 'Ready')} className="flex-1 bg-blue-100 py-1 rounded">Ready</button>
              <button onClick={() => updateStatus(o.id, 'Completed')} className="flex-1 bg-green-100 py-1 rounded">Done</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
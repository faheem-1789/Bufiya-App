'use client';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';

export default function Customer() {
  const { menu, cart, addToCart, placeOrder } = useStore();
  const [name, setName] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Order Food</h1>
      <div className="grid gap-4 mb-8">
        {menu.map(m => (
          <div key={m.id} className="bg-white p-4 rounded flex justify-between items-center shadow">
            <div><span className="text-2xl">{m.image}</span> <span className="font-bold">{m.name}</span></div>
            <div className="flex items-center gap-4">
               <span className="font-bold text-emerald-600">{m.price} SAR</span>
               <button onClick={() => addToCart(m)} className="bg-emerald-600 text-white px-3 py-1 rounded">Add</button>
            </div>
          </div>
        ))}
      </div>
      
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
          <div className="font-bold mb-2">Cart: {cart.length} items | Total: {cart.reduce((a,b)=>a+b.price,0)} SAR</div>
          <input placeholder="Your Name" className="border p-2 w-full mb-2 rounded" value={name} onChange={e=>setName(e.target.value)} />
          <button onClick={() => placeOrder({ customer: name, items: cart.map(i=>i.name).join(', '), total: cart.reduce((a,b)=>a+b.price,0) })} className="bg-emerald-600 text-white w-full py-3 rounded font-bold">Place Order (Cash)</button>
        </div>
      )}
    </div>
  );
}
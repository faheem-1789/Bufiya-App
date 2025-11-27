'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubMenu = onSnapshot(collection(db, "menu"), (snap) => setMenu(snap.docs.map(d => ({...d.data(), id: d.id}))));
    const unsubOrders = onSnapshot(query(collection(db, "orders"), orderBy("createdAt", "desc")), (snap) => setOrders(snap.docs.map(d => ({...d.data(), id: d.id}))));
    return () => { unsubMenu(); unsubOrders(); };
  }, []);

  const addToCart = (item) => setCart([...cart, { ...item, cartId: Math.random() }]);
  const clearCart = () => setCart([]);
  
  const placeOrder = async (details) => {
    await addDoc(collection(db, "orders"), { ...details, status: 'Pending', createdAt: serverTimestamp(), dateStr: new Date().toISOString().split('T')[0] });
    setCart([]);
  };

  const updateStatus = async (id, status) => await updateDoc(doc(db, "orders", id), { status });
  
  const manageItem = async (item, action) => {
    if(action === 'add') await addDoc(collection(db, "menu"), item);
    if(action === 'delete') await deleteDoc(doc(db, "menu", item.id));
  };

  const seed = async () => {
    if(menu.length > 0) return;
    await addDoc(collection(db, "menu"), { name: 'Shawarma', price: 8, image: '🌯', visible: true });
    await addDoc(collection(db, "menu"), { name: 'Juice', price: 12, image: '🍹', visible: true });
    alert("Database Seeded!");
  };

  return (
    <StoreContext.Provider value={{ menu, orders, cart, addToCart, clearCart, placeOrder, updateStatus, manageItem, seed }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
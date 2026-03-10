import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import * as inventoryApi from '../api/inventoryApi';

export interface InventoryItem {
  id: string;
  productId: string;
  warehouseId: string;
  availableQty: number;
  reservedQty: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  getInventoryItem: (id: string) => InventoryItem | undefined;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    inventoryApi.getInventory(token).then(res => setInventory(res.data)).catch(() => {});
  }, []);

  const addInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
    const token = localStorage.getItem('accessToken') || '';
    try {
      const res = await inventoryApi.createInventoryItem(item, token);
      setInventory(prev => [...prev, res.data]);
    } catch {}
  };

  const updateInventoryItem = async (id: string, updatedData: Partial<InventoryItem>) => {
    const token = localStorage.getItem('accessToken') || '';
    try {
      const res = await inventoryApi.updateInventoryItem(id, updatedData, token);
      setInventory(prev => prev.map(item => (item.id === id ? res.data : item)));
    } catch {}
  };

  const deleteInventoryItem = async (id: string) => {
    const token = localStorage.getItem('accessToken') || '';
    try {
      await inventoryApi.deleteInventoryItem(id, token);
      setInventory(prev => prev.filter(item => item.id !== id));
    } catch {}
  };

  const getInventoryItem = (id: string) => {
    return inventory.find(item => item.id === id);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem, getInventoryItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
}

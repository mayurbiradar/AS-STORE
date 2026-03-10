import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import * as productApi from '../api/productApi'
import * as userApi from '../api/userApi'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'customer' | 'admin'
  joinDate: string
  orders: number
}

export interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  stock: number
}

interface AdminContextType {
  users: User[]
  products: Product[]
  addUser: (user: Omit<User, 'id' | 'joinDate'>) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  changeUserRole: (id: string, role: 'customer' | 'admin') => void
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  getUser: (id: string) => User | undefined
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Sample data
const SAMPLE_USERS: User[] = [
  {
    id: 'user-1',
    firstName: 'Akshata',
    lastName: 'Sharma',
    email: 'akshata@example.com',
    phone: '+91-9876543210',
    role: 'customer',
    joinDate: '2026-01-15',
    orders: 3,
  },
  {
    id: 'user-2',
    firstName: 'Priya',
    lastName: 'Kumar',
    email: 'priya@example.com',
    phone: '+91-9123456789',
    role: 'customer',
    joinDate: '2026-02-20',
    orders: 1,
  },
  {
    id: 'user-3',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@akshatasjewelbox.com',
    phone: '+91-1234567890',
    role: 'admin',
    joinDate: '2025-12-01',
    orders: 0,
  },
]

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Diamond Elegance Necklace',
    price: 207500,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    rating: 4.8,
    stock: 15,
  },
  {
    id: 2,
    name: 'Sapphire Dream Ring',
    price: 157500,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    rating: 4.9,
    stock: 8,
  },
  {
    id: 3,
    name: 'Pearl Luxury Bracelet',
    price: 107500,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    rating: 4.7,
    stock: 12,
  },
  {
    id: 4,
    name: 'Emerald Statement Earrings',
    price: 132500,
    image: 'https://media.istockphoto.com/id/954391364/photo/two-golden-sapphire-earrings-with-small-diamonds.jpg?s=612x612&w=0&k=20&c=j4uJwr0yH3fiA8jxBxfnRqpZILXSSN0vyCqC22UYZb0=',
    rating: 4.8,
    stock: 10,
  },
]

export function AdminProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    if (token) {
      userApi.getUsers(token).then(res => setUsers(res.data)).catch(() => {})
    }
  }, [])
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    productApi.getProducts().then(res => setProducts(res.data)).catch(() => {})
  }, [])

  const addUser = async (user: Omit<User, 'id' | 'joinDate'>) => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      const res = await userApi.createUser(user, token)
      setUsers(prev => [...prev, res.data])
    } catch {}
  }

  const updateUser = async (id: string, updatedData: Partial<User>) => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      const res = await userApi.updateUser(id, updatedData, token)
      setUsers(prev => prev.map(user => (user.id === id ? res.data : user)))
    } catch {}
  }

  const deleteUser = async (id: string) => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      await userApi.deleteUser(id, token)
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch {}
  }

  const changeUserRole = async (id: string, role: 'customer' | 'admin') => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      await userApi.changeUserRole(id, role, token)
      setUsers(prev => prev.map(user => (user.id === id ? { ...user, role } : user)))
    } catch {}
  }

  const addProduct = async (product: any) => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      const res = await productApi.createProductWithImage(product, token)
      setProducts(prev => [...prev, res.data])
    } catch {}
  }

  const updateProduct = async (id: number, updatedData: Partial<Product>) => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      const res = await productApi.updateProduct(id, updatedData, token)
      setProducts(prev => prev.map(product => (product.id === id ? res.data : product)))
    } catch {}
  }

  const deleteProduct = async (id: number) => {
    const token = localStorage.getItem('accessToken') || ''
    try {
      await productApi.deleteProduct(id, token)
      setProducts(prev => prev.filter(product => product.id !== id))
    } catch {}
  }

  const getUser = (id: string) => {
    return users.find(user => user.id === id)
  }

  return (
    <AdminContext.Provider
      value={{
        users,
        products,
        addUser,
        updateUser,
        deleteUser,
        changeUserRole,
        addProduct,
        updateProduct,
        deleteProduct,
        getUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

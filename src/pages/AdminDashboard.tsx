import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { useCart } from '../context/CartContext'
// import axios from 'axios'

export default function AdminDashboard() {
  const { users, products, addProduct, deleteProduct, deleteUser } = useAdmin()
  const { orders } = useCart()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users' | 'orders'>('dashboard')
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', rating: 4.5, stock: 10 })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    try {
      await addProduct({
        name: newProduct.name,
        sku: `${newProduct.name}-${Date.now()}`,
        description: '',
        price: parseFloat(newProduct.price as string),
        rating: newProduct.rating,
        stock: newProduct.stock,
        active: true,
        imageFile: imageFile,
      })
      setNewProduct({ name: '', price: '', image: '', rating: 4.5, stock: 10 })
      setImageFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setShowAddProductForm(false)
    } catch {
      alert('Product creation failed')
    }
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-4 sm:p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-indigo-200 mt-1 text-sm sm:text-base">Manage products, users, and orders</p>
            </div>
            <Link
              to="/"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-indigo-900 font-bold rounded-lg hover:shadow-lg transition text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="bg-white shadow-lg sticky top-0 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex gap-0 sm:gap-1 min-w-max sm:min-w-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-bold border-b-4 transition text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-bold border-b-4 transition text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              📦 Products
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-bold border-b-4 transition text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'users'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 sm:px-6 py-3 sm:py-4 font-bold border-b-4 transition text-xs sm:text-base whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              📋 Orders
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div 
              onClick={() => setActiveTab('users')}
              className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-blue-600 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Total Users</p>
              <p className="text-2xl sm:text-4xl font-bold text-blue-600">{users.length}</p>
              <p className="text-gray-400 text-xs mt-1 sm:mt-2">{users.filter(u => u.role === 'customer').length} customers</p>
            </div>
            <div 
              onClick={() => setActiveTab('products')}
              className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-green-600 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Total Products</p>
              <p className="text-2xl sm:text-4xl font-bold text-green-600">{products.length}</p>
              <p className="text-gray-400 text-xs mt-1 sm:mt-2">{products.reduce((sum, p) => sum + p.stock, 0)} in stock</p>
            </div>
            <div 
              onClick={() => setActiveTab('orders')}
              className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-purple-600 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Total Orders</p>
              <p className="text-2xl sm:text-4xl font-bold text-purple-600">{orders.length}</p>
              <p className="text-gray-400 text-xs mt-1 sm:mt-2">{orders.filter(o => o.status === 'delivered').length} delivered</p>
            </div>
            <div 
              onClick={() => setActiveTab('orders')}
              className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-rose-600 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Total Revenue</p>
              <p className="text-2xl sm:text-4xl font-bold text-rose-600">
                ₹{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-IN')}
              </p>
              <p className="text-gray-400 text-xs mt-1 sm:mt-2">From {orders.length} orders</p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>
              <button
                onClick={() => setShowAddProductForm(!showAddProductForm)}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition"
              >
                {showAddProductForm ? '✕ Cancel' : '+ Add Product'}
              </button>
            </div>

            {/* Add Product Form */}
            {showAddProductForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="url"
                      placeholder="Image URL (optional)"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={e => setImageFile(e.target.files?.[0] || null)}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Rating (1-5)"
                      step="0.1"
                      min="1"
                      max="5"
                      value={newProduct.rating}
                      onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading Image...' : 'Add Product'}
                  </button>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="grid gap-6">
              {products.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/admin/product/${product.id}`)}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex gap-6 cursor-pointer border-l-4 border-indigo-600"
                >
                  <img src={product.image.startsWith('/images/') ? `http://localhost:8082${product.image}` : product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-lg font-bold text-indigo-600">₹{product.price.toLocaleString('en-IN')}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>⭐ {product.rating}</span>
                      <span>📦 {product.stock} in stock</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col h-fit">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/admin/product/${product.id}`)
                      }}
                      className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteProduct(product.id)
                      }}
                      className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold">Name</th>
                      <th className="px-6 py-3 text-left font-bold">Email</th>
                      <th className="px-6 py-3 text-left font-bold">Phone</th>
                      <th className="px-6 py-3 text-left font-bold">Role</th>
                      <th className="px-6 py-3 text-left font-bold">Orders</th>
                      <th className="px-6 py-3 text-left font-bold">Join Date</th>
                      <th className="px-6 py-3 text-left font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr 
                        key={user.id} 
                        onClick={() => navigate(`/admin/user/${user.id}`)}
                        className="border-t hover:bg-indigo-50 cursor-pointer transition"
                      >
                        <td className="px-6 py-4 font-medium text-indigo-700">{user.firstName} {user.lastName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-lg font-semibold text-white text-sm ${
                            (user.role && user.role.toLowerCase() === 'admin') ? 'bg-red-500' : 'bg-blue-500'
                          }`}>
                            {user.role
                              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                              : 'Customer'}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.orders}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 flex-col">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/admin/user/${user.id}`)
                              }}
                              className="px-3 py-1 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteUser(user.id)
                              }}
                              className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-xl text-gray-600">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div 
                    key={order.id} 
                    onClick={() => navigate(`/admin/order/${order.id}`)}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer border-l-4 border-indigo-600"
                  >
                    <div className="grid md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                      <div>
                        <p className="text-gray-600 text-sm">Order ID</p>
                        <p className="font-bold text-lg">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Date</p>
                        <p className="font-bold">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="font-bold text-indigo-600">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Status</p>
                        <select
                          onClick={(e) => e.stopPropagation()}
                          defaultValue={order.status}
                          className="px-3 py-1 border border-gray-300 rounded-lg bg-white font-bold capitalize"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold mb-2">Items:</p>
                      <div className="grid gap-2">
                        {order.items.map(item => (
                          <div key={item.id} className="text-sm text-gray-600">
                            {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

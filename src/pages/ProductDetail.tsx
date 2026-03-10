import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { products, updateProduct, deleteProduct } = useAdmin()
  
  const product = products.find(p => p.id === parseInt(productId!))
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<{
    name: string
    price: number
    image: string
    rating: number
    stock: number
  }>(product ? {
    name: product.name,
    price: product.price,
    image: product.image,
    rating: product.rating,
    stock: product.stock,
  } : {
    name: '',
    price: 0,
    image: '',
    rating: 0,
    stock: 0,
  })

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/admin')}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
          >
            Back to Admin
          </button>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    updateProduct(parseInt(productId!), {
      name: editData.name,
      price: editData.price,
      image: editData.image,
      rating: editData.rating,
      stock: editData.stock,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(parseInt(productId!))
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/admin')}
            className="text-indigo-200 hover:text-white transition mb-4"
          >
            ← Back to Admin
          </button>
          <h1 className="text-4xl font-bold">Product Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={(editData.image || product.image).startsWith('/images/') ? `http://localhost:8082${editData.image || product.image}` : (editData.image || product.image)}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                  <p className="text-indigo-600 text-2xl font-bold mt-2">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={editData.image}
                      onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Rating (1-5)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={editData.rating}
                        onChange={(e) => setEditData({ ...editData, rating: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Stock</label>
                      <input
                        type="number"
                        value={editData.stock}
                        onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Rating</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-yellow-500">⭐</span>
                        <span className="text-xl font-bold text-gray-800">{product.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Stock Available</p>
                      <p className={`text-xl font-bold ${product.stock > 5 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock} units
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
                >
                  🗑️ Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

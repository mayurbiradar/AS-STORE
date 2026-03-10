import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Orders() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            My Orders
          </h1>
          
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
            <p className="text-xl text-gray-600 mb-8">You haven't placed any orders. Start shopping now!</p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusIcons = {
    confirmed: '📋',
    shipped: '🚚',
    delivered: '✅',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm opacity-90">Order Number</p>
                    <p className="text-2xl font-bold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Order Date</p>
                    <p className="text-lg font-bold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Total Amount</p>
                    <p className="text-2xl font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl">{statusIcons[order.status]}</span>
                      <span className="font-bold capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-4">Items</h3>
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image.startsWith('/images/') ? `http://localhost:8082${item.image}` : item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-bold text-gray-800">{item.name}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-purple-600">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Order Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-bold text-gray-800">Order Confirmed</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                  {(order.status === 'shipped' || order.status === 'delivered') && (
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <div>
                        <p className="font-bold text-gray-800">Shipped</p>
                        <p className="text-sm text-gray-600">Estimated delivery in 3-5 days</p>
                      </div>
                    </div>
                  )}
                  {order.status === 'delivered' && (
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="font-bold text-gray-800">Delivered</p>
                        <p className="text-sm text-gray-600">Thank you for your purchase!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

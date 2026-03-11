import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { API_BASE_URL } from "../constants";

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, getCartTotal, clearCart, addOrder } = useCart()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build order payload matching backend
    const userId = localStorage.getItem('userId') || '';
    const subtotal = getCartTotal();
    const tax = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax;
    const orderItems = cart.map(item => ({
      productId: item.id,
      sku: `SKU-${Math.random().toString(36).substring(2, 10)}`,
      productName: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
      image: item.image && item.image.startsWith('http')
        ? item.image.replace(API_BASE_URL, '')
        : item.image || ''
    }));
    const orderPayload = {
      userId,
      status: 'CREATED',
      totalAmount,
      currency: 'INR',
      items: orderItems,
      subtotal,
      tax
    };
    (async () => {
      const orderResponse = await addOrder(orderPayload);
      clearCart();
      if (orderResponse) {
        navigate('/order-success', { state: { order: orderResponse } });
      } else {
        navigate('/order-success', { state: { orderId: 'ORD-UNKNOWN' } });
      }
    })();
  }

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-3 sm:px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 sm:mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Billing Address */}
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Billing Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm sm:text-base"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm sm:text-base"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 mb-4 text-sm sm:text-base"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 mb-4 text-sm sm:text-base"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 mb-4"
                  required
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:shadow-lg transition duration-200"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="pb-4 border-b border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-bold">×{item.quantity}</span>
                    </div>
                    <div className="text-right text-purple-600 font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-bold">₹{Math.round(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

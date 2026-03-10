import { useLocation, Link } from 'react-router-dom'

export default function OrderSuccess() {
  const location = useLocation()
  const orderId = location.state?.orderId || 'ORD-UNKNOWN'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-5xl font-bold text-green-600 mb-4">Order Confirmed! 🎉</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-8 mb-8 text-left">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Order Number</p>
              <p className="text-3xl font-bold text-gray-800">{orderId}</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Order Status</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <p className="font-bold text-gray-800">Order Confirmed</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">What's Next?</p>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    We'll verify your payment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Your order will be processed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Items will be shipped within 2-3 business days
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    You'll receive tracking information via email
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Confirmation Email */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-8 text-left">
            <p className="text-gray-700">
              <span className="font-bold">📧 Confirmation Email:</span> A detailed order confirmation has been sent to your email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-200"
            >
              View My Orders
            </Link>
            <Link
              to="/"
              className="px-8 py-4 border-2 border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">Need help? Contact us at</p>
          <p className="font-bold text-gray-800">support@akshatasjewelbox.com | +91-1234-567-890</p>
        </div>
      </div>
    </div>
  )
}

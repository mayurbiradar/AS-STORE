import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { getProducts } from '../api/productApi'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const { cart, addToCart, updateQuantity } = useCart()
  const { addToast } = useToast()
  const location = useLocation();

  // Removed products API call on homepage load

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (location.state && location.state.scrollToFeatured) {
      setTimeout(() => {
        const el = document.getElementById('featured-collections');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location]);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-16 sm:py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            Timeless Beauty{' '}
            <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-purple-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Discover our exquisite collection of handcrafted jewelry that celebrates your unique elegance
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <button className="px-6 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:shadow-2xl transform hover:scale-110 transition duration-200 text-sm sm:text-base lg:text-lg">
              Shop Now
            </button>
            <button className="px-6 sm:px-8 py-2 sm:py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-900 transition duration-200 text-sm sm:text-base lg:text-lg">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✨</div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-sm sm:text-base text-gray-600">Handpicked gemstones and authentic materials</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎁</div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">Perfect Gifts</h3>
              <p className="text-sm sm:text-base text-gray-600">Beautifully packaged for every occasion</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🛡️</div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">Lifetime Guarantee</h3>
              <p className="text-sm sm:text-base text-gray-600">Expert craftsmanship with full warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="featured-collections">
        {/* Products component will be rendered here */}
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              name: 'Sarah Johnson',
              comment: 'Absolutely stunning! The quality exceeded my expectations.',
              rating: 5,
            }, {
              name: 'Emma Davis',
              comment: 'Perfect for my engagement. Timeless and elegant!',
              rating: 5,
            }, {
              name: 'Lisa Anderson',
              comment: 'Customer service was exceptional. Highly recommended!',
              rating: 5,
            }].map((testimonial, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl border border-white border-opacity-20 hover:border-opacity-40 transition">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-300">⭐</span>
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-bold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Add Sparkle to Your Life?</h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our complete collection or get personalized styling advice from our experts
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:shadow-lg transition duration-200">
              Start Shopping
            </button>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            Get exclusive offers and be the first to know about new collections
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-2 sm:py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm sm:text-base"
            />
            <button className="px-6 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition duration-200 text-sm sm:text-base whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent mb-4">
              Akshata's Jewel Box
            </h3>
            <p className="text-purple-200">
              Premium jewelry crafted with elegance and authenticity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-purple-200">
                <li><Link to="/" className="hover:text-pink-300 transition">Home</Link></li>
                <li><Link to="/" className="hover:text-pink-300 transition" onClick={e => {
                  /* No onClick needed, use state for scroll */
                }} state={{ scrollToFeatured: true }}>Collection</Link></li>
                <li><Link to="/about" className="hover:text-pink-300 transition" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>About</Link></li>
                <li><Link to="/contact" className="hover:text-pink-300 transition" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-pink-300 transition">Track Order</a></li>
              <li><a href="#" className="hover:text-pink-300 transition">Returns</a></li>
              <li><a href="#" className="hover:text-pink-300 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-300 transition">Support</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                I
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                T
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-purple-200 text-sm">
            <p>&copy; {currentYear} Akshata's Jewel Box. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-pink-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-pink-300 transition">Terms & Conditions</a>
              <a href="#" className="hover:text-pink-300 transition">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

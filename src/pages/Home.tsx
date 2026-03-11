import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  // Carousel state
  const randomNames = [
    'Priya Sharma', 'Rohit Patil', 'Sneha Kulkarni', 'Amit Deshmukh', 'Meera Joshi', 'Vikas More',
    'Neha Singh', 'Suresh Pawar', 'Anjali Mehta', 'Kiran Chavan', 'Ritika Jain', 'Manoj Bhosale'
  ];
  const randomComments = [
    'The craftsmanship is amazing. I love my new necklace, it sparkles beautifully!',
    'Bought a ring for my wife. She absolutely loved it! Great quality and fast delivery.',
    'The earrings are gorgeous and lightweight. Will definitely buy again!',
    'Excellent customer service and beautiful designs. Highly recommended!',
    'The bracelet is stunning and fits perfectly. Thank you for the quick delivery!',
    'Beautiful packaging and amazing product. My mom loved her birthday gift!',
    'Fast shipping and the product exceeded my expectations!',
    'The pendant is elegant and matches my style perfectly.',
    'Amazing quality and affordable prices. Will recommend to friends.',
    'The ring is so pretty and fits just right. Love it!',
    'Customer support was very helpful and responsive.',
    'The jewelry is unique and gets lots of compliments.'
  ];
  const randomIcons = ['👩', '👨'];
  const randomRatings = [4, 5];
  const testimonials = Array.from({ length: 12 }, (_, i) => ({
    name: randomNames[i],
    city: 'Pune',
    comment: randomComments[i],
    rating: randomRatings[Math.floor(Math.random() * randomRatings.length)],
    icon: randomIcons[Math.floor(Math.random() * randomIcons.length)],
  }));
  const [activeIndex, setActiveIndex] = useState(0);

  // Show 4 reviews at a time
  const groupSize = 4;
  const totalGroups = Math.ceil(testimonials.length / groupSize);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalGroups);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalGroups]);

  const goToSlide = (idx) => setActiveIndex(idx);

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
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-5xl flex flex-col items-center">
              <div className="flex flex-row gap-8 transition-all duration-500 justify-center w-full">
                {testimonials.slice(activeIndex * groupSize, activeIndex * groupSize + groupSize).map((testimonial, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl border border-white border-opacity-20 hover:border-opacity-40 transition min-w-[380px] max-w-[400px] h-[260px] flex-1 flex flex-col justify-between relative">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-2 text-gray-900">{testimonial.icon}</span>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-300">⭐</span>
                        ))}
                      </div>
                      <p className="text-lg mb-4 italic text-gray-900 text-center">"{testimonial.comment}"</p>
                    </div>
                    <div className="absolute right-6 bottom-6 text-right">
                      <p className="font-bold text-gray-900">- {testimonial.name} <span className="text-sm text-purple-400">({testimonial.city})</span></p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                {Array.from({ length: totalGroups }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-5 h-5 mx-2 rounded-full border-2 border-purple-400 focus:outline-none transition ${activeIndex === idx ? 'bg-purple-400' : 'bg-purple-900'}`}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to testimonial group ${idx + 1}`}
                    style={{ boxShadow: activeIndex === idx ? '0 0 6px 2px #a78bfa' : 'none' }}
                  />
                ))}
              </div>
            </div>
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
              className="flex-1 min-w-[280px] sm:min-w-[340px] px-4 sm:px-8 py-2 sm:py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-sm sm:text-base"
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

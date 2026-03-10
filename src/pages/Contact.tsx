import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-purple-800">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        We love hearing from our customers! Whether you have a question, need assistance, or want to share your experience, our team is here to help.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Customer Support</h2>
        <p className="text-gray-700">Email: <a href="mailto:support@asjewelbox.com" className="text-purple-600 underline">support@asjewelbox.com</a></p>
        <p className="text-gray-700">Phone: <a href="tel:+18001234567" className="text-purple-600 underline">+1 800 123 4567</a></p>
        <p className="text-gray-700">Hours: Mon-Fri, 9am-6pm IST</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Visit Our Store</h2>
        <p className="text-gray-700">AS Jewel Box, 123 Gold Street, Mumbai, India</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Connect With Us</h2>
        <p className="text-gray-700">Follow us on <a href="https://instagram.com/asjewelbox" target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">Instagram</a> and <a href="https://facebook.com/asjewelbox" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Facebook</a> for the latest updates and offers.</p>
      </div>
    </div>
  );
}

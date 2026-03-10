import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function MyAccount() {
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'edit'>('profile');
  const [editData, setEditData] = useState(user || {});

  if (!user || !user.email) return <div className="p-8">Not logged in</div>;

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Optionally, update user info in backend here
    localStorage.setItem('user', JSON.stringify(editData));
    setActiveTab('profile');
    window.location.reload(); // To update context
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-3 sm:px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-6 py-4 text-left font-bold transition ${activeTab === 'profile' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-800 hover:bg-gray-50'}`}
              >
                👤 Profile
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`w-full px-6 py-4 text-left font-bold transition border-t border-gray-200 ${activeTab === 'edit' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-800 hover:bg-gray-50'}`}
              >
                ✏️ Edit Profile
              </button>
              <Link
                to="/orders"
                className="block w-full px-6 py-4 text-left font-bold text-gray-800 hover:bg-gray-50 transition border-t border-gray-200"
              >
                📦 My Orders
              </Link>
              <button
                onClick={logout}
                className="block w-full px-6 py-4 text-left font-bold text-red-600 hover:bg-red-50 transition border-t border-gray-200"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Profile Information</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">First Name</p>
                      <p className="text-lg font-bold text-gray-800">{user.firstName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Last Name</p>
                      <p className="text-lg font-bold text-gray-800">{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email</p>
                    <p className="text-lg font-bold text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Phone</p>
                    <p className="text-lg font-bold text-gray-800">{user.phone}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Address</h3>
                    <p className="text-gray-700 mb-2">{user.address}</p>
                    <p className="text-gray-700">{user.city}, {user.state} - {user.pincode}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('edit')}
                  className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  Edit Profile
                </button>
              </div>
            )}

            {activeTab === 'edit' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Edit Profile</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={editData.firstName || ''}
                      onChange={handleEditChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={editData.lastName || ''}
                      onChange={handleEditChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editData.email || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={editData.phone || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={editData.address || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={editData.city || ''}
                      onChange={handleEditChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={editData.state || ''}
                      onChange={handleEditChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={editData.pincode || ''}
                      onChange={handleEditChange}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSave}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditData(user);
                      setActiveTab('profile');
                    }}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

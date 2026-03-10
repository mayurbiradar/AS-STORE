export default function AdminDashboardLink() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.email || user.role !== 'admin') return null;
  return (
    <a href="/admin" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">Admin Dashboard</a>
  );
}

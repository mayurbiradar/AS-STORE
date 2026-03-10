import LogoutButton from './LogoutButton';

export default function UserMenu() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.email) return null;
  return (
    <div className="flex items-center gap-4">
      <span className="font-bold text-gray-700">{user.firstName} {user.lastName} ({user.role})</span>
      <LogoutButton />
    </div>
  );
}

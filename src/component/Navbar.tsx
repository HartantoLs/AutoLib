'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase';

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (data?.full_name) {
        setUserName(data.full_name);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard" className="text-xl font-bold text-purple-800 hover:text-purple-900 transition duration-300">
              <span className="text-indigo-800">Auto</span>Lib
            </Link>
          </div>

          {/* Navigation */}
          <div className=" hidden md:flex items-center space-x-8 text-md">
          <Link href="/books" className="nav-link p-2 rounded-md font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300">Jelajahi</Link>
            <Link href="/dashboard" className="nav-link p-2 rounded-md font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300">Dashboard</Link>
            <Link href="/transactions/active" className="nav-link p-2 rounded-md font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300">Transaksi</Link>
            <Link href="/transactions/history" className="nav-link p-2 rounded-md font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300">Riwayat</Link>
          </div>

          {/* Profile & Logout */}
          <div className="flex items-center space-x-2">
            <Link href="/profile" className="px-3 py-1 rounded-lg text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition text-sm font-medium">Profil</Link>
            <button
              onClick={handleLogout}
              className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-lg transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
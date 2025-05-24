'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useBorrowStore } from '../../../stores/useBorrowState';
import BookRating from '../../../component/BookRating';
import { createClient } from '../../../../lib/supabase';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  synopsis: string;
  categories: string[];
  cover_image_url: string;
  available_quantity: number;
  total_quantity: number;
}

export default function BookDetailPage() {
  const router = useRouter();
  const setBookId = useBorrowStore((state: any) => state.setBookId);
  const supabase = createClient();
   
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // states untuk tombol pinjam
  const [borrowing, setBorrowing] = useState(false);
  const [borrowError, setBorrowError] = useState<string | null>(null);
  const [borrowSuccess, setBorrowSuccess] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [canRate, setCanRate] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.book) setBook(data.book);
        else setError(data.error || 'Failed to fetch book details');
      })
      .catch(() => setError('An unexpected error occurred'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    async function checkRatingEligibility() {
      if (!id) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) return;

        // Check if user has borrowed and returned this book
        const { data: transactions } = await supabase
          .from('transactions')
          .select('status')
          .eq('book_id', id)
          .eq('user_id', session.user.id)
          .eq('status', 'finished')
          .limit(1);

          setCanRate(!!(transactions && transactions.length > 0));
      } catch (error) {
        console.error('Error checking rating eligibility:', error);
      }
    }

    checkRatingEligibility();
  }, [id]);
  
  const handleBorrow = () => {
    if (!book) return;
    setBookId(book.id);
    router.push('/borrowBooks');
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 font-sans">
      {/* Header/Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-purple-600 hover:text-purple-800 transition duration-300">
                  <span className="text-indigo-600">Auto</span>Lib
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm font-medium"
              >
                Profil
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/login');
                }}
                className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-lg transition duration-300 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative circles */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );

  if (error || !book) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 font-sans">
      {/* Header/Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-purple-600 hover:text-purple-800 transition duration-300">
                  <span className="text-indigo-600">Auto</span>Lib
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm font-medium"
              >
                Profil
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/login');
                }}
                className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-lg transition duration-300 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative circles */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-8 relative z-10 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error || 'Buku tidak ditemukan'}</p>
              </div>
            </div>
          </div>
          <div>
            <Link 
              href="/books" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 font-medium"
            >
              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Daftar Buku
            </Link>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 font-sans">
      {/* Header/Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-purple-600 hover:text-purple-800 transition duration-300">
                  <span className="text-indigo-600">Auto</span>Lib
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-medium transition duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/books"
                  className="border-b-2 border-indigo-600 text-indigo-800 px-3 py-2 text-sm font-medium transition duration-300"
                >
                  Buku
                </Link>
                <Link
                  href="/transactions/active"
                  className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-medium transition duration-300"
                >
                  Transaksi Aktif
                </Link>
                <Link
                  href="/transactions/history"
                  className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-medium transition duration-300"
                >
                  Riwayat
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm font-medium"
              >
                Profil
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/login');
                }}
                className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-3 py-1 rounded-lg transition duration-300 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Decorative circles */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link 
              href="/books" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 font-medium bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-indigo-100 hover:bg-white/70"
            >
              <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Daftar Buku
            </Link>
          </div>

          {/* Book Detail Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 overflow-hidden md:flex">
            {/* Cover Image */}
            <div className="md:w-1/3 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="relative h-96 md:h-full w-full">
                {book.cover_image_url ? (
                  <Image
                    src={book.cover_image_url}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indigo-300">
                    <div className="text-center">
                      <svg className="h-20 w-20 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-sm">Tidak Ada Gambar Sampul</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-indigo-800 mb-2">{book.title}</h1>
              <h2 className="text-xl text-indigo-600 mb-6">oleh {book.author}</h2>

              {/* Rating Section */}
              {canRate && (
                <div className="mb-6 p-4 bg-indigo-50/80 backdrop-blur-sm rounded-xl border border-indigo-100">
                  <h3 className="text-lg font-medium text-indigo-700 mb-2 flex items-center">
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Beri Penilaian
                  </h3>
                  <BookRating 
                    bookId={book.id} 
                    onRatingSubmit={(rating) => setUserRating(rating)}
                  />
                </div>
              )}

              {/* Categories */}
              {book.categories && book.categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-indigo-700 mb-2">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.categories.map(cat => (
                      <span
                        key={cat}
                        className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ISBN */}
              <div className="mb-6 p-4 bg-purple-50/80 backdrop-blur-sm rounded-xl border border-purple-100">
                <h3 className="text-sm font-medium text-purple-700 mb-1">ISBN</h3>
                <p className="text-purple-800 font-mono">{book.isbn}</p>
              </div>

              {/* Availability */}
              <div className="mb-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-100">
                <h3 className="text-sm font-medium text-blue-700 mb-1">Ketersediaan</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${book.available_quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <p className={`font-medium ${book.available_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {book.available_quantity} dari {book.total_quantity} exemplar tersedia
                  </p>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-indigo-700 mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Sinopsis
                </h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-indigo-100">
                  <p className="text-indigo-800 leading-relaxed whitespace-pre-line">{book.synopsis}</p>
                </div>
              </div>

              {/* Borrow Button */}
              <div className="flex gap-4">
                <button
                  onClick={handleBorrow}
                  disabled={book.available_quantity === 0 || borrowing}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold text-white transition duration-300 flex items-center justify-center ${
                    book.available_quantity > 0
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  {borrowing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {book.available_quantity > 0 ? 'Pinjam Buku' : 'Tidak Tersedia'}
                    </>
                  )}
                </button>
              </div>

              {/* Error/Success Messages */}
              {borrowError && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                  <p className="text-red-700 text-sm">{borrowError}</p>
                </div>
              )}
              {borrowSuccess && (
                <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-md">
                  <p className="text-green-700 text-sm">Permintaan peminjaman berhasil diajukan!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm py-4 border-t border-indigo-100 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-indigo-500">
            &copy; 2025 AutoLib. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Animation styles */}
      <style jsx global>{`
        html, body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          background: linear-gradient(to bottom right, #dbeafe, #f3e8ff, #e0e7ff);
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
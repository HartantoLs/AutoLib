'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { debounce } from 'lodash';
import { createClient } from '../../../lib/supabase';

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

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added hamburger menu state
  const router = useRouter();
  const supabase = createClient();
  
  // Function to fetch books
  const fetchBooks = async (page = 1, query = searchQuery, category = selectedCategory) => {
    setLoading(true);
    try {
      let url = `/api/books?page=${page}&limit=${pagination.limit}`;
      
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setBooks(data.books);
        setPagination(data.pagination);
      } else {
        console.error('Error fetching books:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/books/categories');
      const data = await response.json();
      
      if (response.ok) {
        setCategories(data.categories);
      } else {
        console.error('Error fetching categories:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };
  
  // Initialize
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);
  
  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
    fetchBooks(1, value, selectedCategory);
  }, 500);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };
  
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    fetchBooks(1, searchQuery, value);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    fetchBooks(page, searchQuery, selectedCategory);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 font-sans">
      {/* Header/Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-purple-800 hover:text-purple-900 transition duration-300">
                <span className="text-indigo-800">Auto</span>Lib
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-300"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-t border-indigo-100 z-50`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/books"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Jelajahi
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Dashboard
              </div>
            </Link>

            <Link
              href="/transactions/active"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Transaksi
              </div>
            </Link>

            <Link
              href="/transactions/history"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Riwayat
              </div>
            </Link>

            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profil
              </div>
            </Link>

            <div className="border-t border-indigo-100 pt-2">
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/login');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50 transition duration-300"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </div>
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
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Library Books</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-indigo-200 rounded-lg shadow-sm placeholder-indigo-300 text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm sm:text-sm"
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full sm:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <select
              className="w-full pl-10 pr-3 py-2 border border-indigo-200 rounded-lg shadow-sm placeholder-indigo-300 text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm appearance-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {/* Books Grid */}
        {!loading && books.length === 0 && (
          <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
            <p className="text-lg text-indigo-600">No books found. Try adjusting your search criteria.</p>
          </div>
        )}
        
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map(book => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <div className="border border-indigo-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-white/70 backdrop-blur-sm transform hover:scale-105">
                  <div className="relative h-64 w-full bg-indigo-50">
                    {book.cover_image_url ? (
                      <Image 
                        src={book.cover_image_url} 
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-300">
                        No Cover Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="font-semibold text-lg mb-1 line-clamp-2 text-indigo-700">{book.title}</h2>
                    <p className="text-purple-600 mb-2">{book.author}</p>
                    <div className="mt-auto flex flex-wrap gap-1">
                      {book.categories && book.categories.slice(0, 2).map(category => (
                        <span key={category} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                      {book.categories && book.categories.length > 2 && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          +{book.categories.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm">
                      <span className={`font-medium ${book.available_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {book.available_quantity > 0 ? `${book.available_quantity} available` : 'Not available'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 rounded-lg border border-indigo-200 bg-white/70 backdrop-blur-sm disabled:opacity-50 text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
              >
                Previous
              </button>
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first, last, current page, and pages around current
                  return page === 1 || 
                         page === pagination.totalPages || 
                         Math.abs(page - pagination.page) <= 1;
                })
                .map((page, index, array) => {
                  // Add ellipsis if there are gaps
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;
                  
                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-2 text-indigo-400">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-300 ${
                          pagination.page === page
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                            : 'border border-indigo-200 hover:bg-indigo-50 text-indigo-600 bg-white/70 backdrop-blur-sm'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 rounded-lg border border-indigo-200 bg-white/70 backdrop-blur-sm disabled:opacity-50 text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm py-4 border-t border-indigo-100 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-indigo-500">
            &copy; 2025 AutoLib. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Font fix & Animation*/}
      <style jsx global>{`
        html, body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          background: linear-gradient(to bottom right, #dbeafe, #f3e8ff, #e0e7ff);
        }
        /* Tambahkan styling untuk opsi dropdown */
        option {
          color: #3730a3; /* Indigo-800 */
          background-color: white;
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
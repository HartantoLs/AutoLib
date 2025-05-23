'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqData = [
    {
      id: 1,
      question: "Apa itu AutoLib?",
      answer: "AutoLib adalah sistem perpustakaan digital yang terintegrasi dengan smart locker berbasis teknologi RFID. Sistem ini memungkinkan pengguna untuk mendaftar, meminjam, mengembalikan, dan memperpanjang buku tanpa perlu interaksi langsung dengan pustakawan."
    },
    {
      id: 2,
      question: "Bagaimana cara kerja AutoLib?",
      answer: "Pengguna dapat:\n• Mendaftar akun melalui website atau mobile app\n• Memilih buku untuk dipinjam secara online\n• Mengambil atau mengembalikan buku melalui smart locker menggunakan kartu RFID\n• Melacak status buku secara real-time melalui dashboard pengguna"
    },
    {
      id: 3,
      question: "Apa manfaat utama dari sistem ini untuk pengguna?",
      answer: "• Akses layanan perpustakaan kapan saja dan di mana saja\n• Proses peminjaman dan pengembalian yang cepat dan otomatis\n• Rekomendasi buku yang relevan secara personal\n• Tampilan status dan histori peminjaman secara real-time"
    },
    {
      id: 4,
      question: "Apa keunggulan AutoLib untuk pengelola perpustakaan?",
      answer: "• Pengelolaan koleksi buku menjadi lebih efisien melalui database terintegrasi\n• Mudah dalam pelacakan ketersediaan dan sirkulasi buku\n• Tersedia dashboard real-time untuk memantau aktivitas pengguna dan statistik peminjaman\n• Mengurangi beban pustakawan dalam tugas operasional harian"
    },
    {
      id: 5,
      question: "Apakah sistem ini aman digunakan?",
      answer: "Ya. Penggunaan RFID menjamin keamanan dan akurasi dalam proses transaksi peminjaman dan pengembalian, serta memastikan bahwa hanya pengguna terdaftar yang dapat mengakses smart locker."
    },
    {
      id: 6,
      question: "Siapa saja yang dapat menggunakan AutoLib?",
      answer: "Sistem ini dapat digunakan oleh seluruh anggota perpustakaan yang telah mendaftar akun dan memiliki kartu RFID yang terhubung ke akun mereka."
    }
  ]

  const toggleFAQ = (id: any) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const formatAnswer = (answer: any) => {
    return answer.split('\n').map((line: any, index: any) => (
      <span key={index}>
        {line}
        {index < answer.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 font-sans">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-purple-600 hover:text-purple-800 transition duration-300">
                  <span className="text-indigo-800">Auto</span>Lib
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link 
                href="/" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </Link>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
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
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-800 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Decorative circles */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
              Temukan jawaban atas pertanyaan yang sering diajukan tentang AutoLib. Jika pertanyaan Anda tidak ada di sini, jangan ragu untuk menghubungi tim kami.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
                <svg className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pertanyaan Umum
              </h2>

              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div key={faq.id} className="border border-indigo-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300 flex justify-between items-center"
                    >
                      <span className="text-lg font-medium text-indigo-800">{faq.question}</span>
                      <svg
                        className={`h-5 w-5 text-indigo-600 transform transition-transform duration-300 ${
                          openFAQ === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`px-6 bg-white transition-all duration-300 overflow-hidden ${
                        openFAQ === faq.id ? 'py-4 opacity-100' : 'py-0 opacity-0 max-h-0'
                      }`}
                    >
                      <div className="text-indigo-700 leading-relaxed">
                        {formatAnswer(faq.answer)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Help Section */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-indigo-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Masih Ada Pertanyaan?</h3>
              <p className="text-indigo-600 mb-6">
                Jika Anda tidak menemukan jawaban yang Anda cari, tim support kami siap membantu Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Hubungi Kami
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 py-3 border border-indigo-300 text-base font-medium rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Mulai Bergabung
                </Link>
              </div>
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

      {/* Animations */}
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
  )
}
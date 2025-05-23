'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                Home
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
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">About AutoLib</h1>
            <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
              Sistem Perpustakaan Digital Berbasis Smart Locker untuk Optimasi Layanan Perpustakaan Modern
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
              <svg className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Tentang AutoLib
            </h2>
            <p className="text-indigo-700 leading-relaxed text-lg mb-6">
              AutoLib merupakan sistem perpustakaan digital berbasis <strong>smart locker</strong> yang mengintegrasikan teknologi informasi untuk mengotomatisasi proses layanan perpustakaan. Sistem ini meliputi pendaftaran anggota perpustakaan, peminjaman buku, pengembalian buku, perpanjangan buku, dan pelacakan status buku.
            </p>
            <p className="text-indigo-700 leading-relaxed text-lg">
              Solusi ini menggabungkan platform digital berbasis <strong>website</strong> dan <strong>mobile app</strong> dengan smart locker berteknologi RFID untuk memberikan akses layanan perpustakaan sepanjang waktu tanpa memerlukan interaksi secara langsung dengan pustakawan. Dengan mengimplementasikan sistem ini, diharapkan mampu meningkatkan efisiensi layanan perpustakaan, memperluas akses masyarakat terhadap sumber daya literasi, dan mengoptimalkan pengelolaan koleksi buku perpustakaan melalui pemanfaatan teknologi modern.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-800">Efisiensi & Efektivitas</h3>
              </div>
              <p className="text-indigo-600">
                Mengotomatisasi proses pendaftaran anggota, peminjaman, pengembalian, perpanjangan, dan pelacakan status buku untuk meningkatkan efisiensi layanan perpustakaan.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-800">Fleksibilitas Waktu</h3>
              </div>
              <p className="text-indigo-600">
                Akses layanan perpustakaan 24/7 tanpa terbatas jam operasional. Peminjaman, pengembalian, dan perpanjangan buku kapan saja sesuai kebutuhan Anda.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-800">Database Terintegrasi</h3>
              </div>
              <p className="text-indigo-600">
                Sistem database terintegrasi untuk pengelolaan koleksi buku yang efisien, memudahkan pelacakan status ketersediaan dan pencarian buku secara real-time.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-800">Pengalaman Personal</h3>
              </div>
              <p className="text-indigo-600">
                Fitur rekomendasi buku yang dipersonalisasi dan dashboard real-time untuk memantau statistik peminjaman, memberikan pengalaman pengguna yang optimal.
              </p>
            </div>
          </div>

          {/* Goals Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
              <svg className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Tujuan AutoLib
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm mr-4 mt-1">1</div>
                <p className="text-indigo-700">
                  <strong>Efisiensi Proses:</strong> Mengefisiensikan dan mengefektifkan proses pendaftaran anggota perpustakaan, peminjaman buku, pengembalian buku, perpanjangan buku, dan pelacakan status buku.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm mr-4 mt-1">2</div>
                <p className="text-indigo-700">
                  <strong>Fleksibilitas Waktu:</strong> Membuat waktu peminjaman, pengembalian, dan perpanjangan buku menjadi lebih fleksibel karena tidak terbatas pada jam operasional perpustakaan.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm mr-4 mt-1">3</div>
                <p className="text-indigo-700">
                  <strong>Pengelolaan Koleksi:</strong> Mengefisiensikan pengelolaan dan pengelompokan koleksi buku dengan sistem database terintegrasi sehingga memudahkan pelacakan status ketersediaan dan peminjaman buku serta pencarian buku.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm mr-4 mt-1">4</div>
                <p className="text-indigo-700">
                  <strong>Personalisasi:</strong> Mempersonalisasikan pengalaman pengguna pada platform peminjaman buku perpustakaan dengan menyediakan rekomendasi buku kepada pengguna.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm mr-4 mt-1">5</div>
                <p className="text-indigo-700">
                  <strong>Dashboard Real-time:</strong> Memudahkan pemantauan dan pengelolaan sumber daya perpustakaan melalui penggunaan dashboard real-time yang menampilkan informasi seperti jumlah buku yang sedang dipinjam, rata-rata statistik durasi peminjaman buku, jumlah pengguna smart locker, dan lain-lain.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
              <svg className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Teknologi di Balik AutoLib
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-800 mb-2">Teknologi RFID</h3>
                <p className="text-sm text-indigo-600">Radio Frequency Identification untuk akses aman dan otentikasi cepat tanpa kontak</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-800 mb-2">Smart Locker</h3>
                <p className="text-sm text-indigo-600">Sistem penyimpanan otomatis dengan pelacakan inventori real-time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-800 mb-2">Platform Digital</h3>
                <p className="text-sm text-indigo-600">Website dan mobile app terintegrasi untuk pengelolaan perpustakaan seamless</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Tim Pengembang</h2>
            <div className="text-center">
              <p className="text-indigo-600 leading-relaxed max-w-3xl mx-auto">
                AutoLib dikembangkan oleh sebuah tim yang terdiri dari 5 orang mahasiswa STI'22 yang mengambil mata kuliah II3240 Rekayasa Sistem dan Teknologi Informasi. Tim kami menggabungkan keahlian dalam pengembangan sistem informasi, teknologi RFID, dan manajemen perpustakaan untuk menciptakan solusi inovatif yang dapat meningkatkan kualitas layanan perpustakaan di era digital.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => router.push('/contact')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  Hubungi Tim
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
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
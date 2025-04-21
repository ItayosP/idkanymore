'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

// Renamed from Navbar
export default function Header() { 
  const pathname = usePathname();
  const { data: session, status } = useSession(); // Get session status and data

  const isActive = (path: string) => pathname === path;

  return (
    // Added sticky positioning and z-index
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Brand and Core Links */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
              פסיכומטרי
            </Link>
            
            {/* Links shown only when authenticated */}
            <div className="hidden sm:flex items-center space-x-4">
              {status === 'authenticated' && (
                  <>
                    <Link 
                      href="/dashboard" 
                      className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/dashboard') ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                      }`}
                    >
                      לוח בקרה
                    </Link>
                    <Link 
                      href="/tests"
                      className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/tests') ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                      }`}
                    >
                      מבחנים
                    </Link>
                  </>
              )}
            </div>
          </div>
          
          {/* Right side: Auth Links / User Menu */}
          <div className="flex items-center space-x-4">
            {status === 'loading' && (
              <span className="text-gray-500 dark:text-gray-400 text-sm">טוען...</span>
            )}
            {status === 'unauthenticated' && (
              <>
                <Link 
                  href="/api/auth/signin" 
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                >
                  התחברות
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                >
                  הרשמה
                </Link>
              </>
            )}
            {status === 'authenticated' && (
              <>
                 {/* Profile Link with Image */}
                <Link 
                  href="/profile" 
                  className={`flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded-md text-sm font-medium ${
                    isActive('/profile') ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                   {session.user?.image && (
                     <img src={session.user.image} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
                   )}
                   <span className="hidden sm:inline">פרופיל</span> 
                   <span className="sm:hidden">{session.user?.name?.split(' ')[0] || 'פרופיל'}</span>
                 </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })} // Sign out and redirect to home
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap"
                >
                  התנתקות
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
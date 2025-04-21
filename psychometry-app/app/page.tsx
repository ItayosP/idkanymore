'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
}

export default function HomePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              {userData ? `שלום, ${userData.name}!` : 'ברוכים הבאים'}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {userData ? 'מוכן להתחיל לתרגל?' : 'התחל את המסע שלך להצלחה בפסיכומטרי'}
            </p>
            {userData ? (
              <div className="flex justify-center space-x-4">
                <Link
                  href="/tests"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  התחל תרגול
                </Link>
                <Link
                  href="/profile"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  צפה בהתקדמות
                </Link>
              </div>
            ) : (
              <div className="flex justify-center space-x-4">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  התחברות
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  הרשמה
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              תרגול מותאם
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              תרגול מותאם אישית בהתאם לרמת הידע שלך, עם שאלות ברמות קושי שונות
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              מעקב אחר התקדמות
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              מעקב אחר ההתקדמות שלך לאורך זמן, עם ניתוח מפורט של החוזקות והחולשות
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              הכנה מקיפה
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              תרגול בכל תחומי המבחן: חשיבה מילולית, חשיבה כמותית ואנגלית
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      {userData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            גישה מהירה למבחנים
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/tests/verbal" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  חשיבה מילולית
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  תרגול בהבנת הנקרא, השלמת משפטים ואנלוגיות
                </p>
              </div>
            </Link>
            <Link href="/tests/quantitative" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🔢</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  חשיבה כמותית
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  תרגול באלגברה, גיאומטריה ובעיות מילוליות
                </p>
              </div>
            </Link>
            <Link href="/tests/english" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  אנגלית
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  תרגול בהבנת הנקרא, השלמת משפטים ומילים נרדפות
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Call to Action Section for Non-Logged In Users */}
      {!userData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              מוכן להתחיל?
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              התחבר כדי לגשת לכל המבחנים ולעקוב אחר ההתקדמות שלך
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

